"use client"

import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Button } from "@medusajs/ui"

import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

import { useIntersection } from "@lib/hooks/use-in-view"
import { addToCart } from "@modules/cart/actions"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/option-select"

import MobileActions from "../mobile-actions"
import ProductPrice from "../product-price"

import toast, { Toaster } from "react-hot-toast"

type ProductActionsProps = {
  product: PricedProduct
  region: Region
  disabled?: boolean
}

export type PriceType = {
  calculated_price: string
  original_price?: string
  price_type?: "sale" | "default"
  percentage_diff?: string
}

export default function ProductActions({
  product,
  region,
  disabled,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string>>({})
  const [isAdding, setIsAdding] = useState(false)

  const countryCode = useParams().countryCode as string

  const variants = product.variants

  // initialize the option state
  useEffect(() => {
    const optionObj: Record<string, string> = {}

    for (const option of product.options || []) {
      Object.assign(optionObj, { [option.id]: undefined })
    }

    setOptions(optionObj)
  }, [product])

  // memoized record of the product's variants
  const variantRecord = useMemo(() => {
    const map: Record<string, Record<string, string>> = {}

    for (const variant of variants) {
      if (!variant.options || !variant.id) continue

      const temp: Record<string, string> = {}

      for (const option of variant.options) {
        temp[option.option_id] = option.value
      }

      map[variant.id] = temp
    }

    return map
  }, [variants])

  // memoized function to check if the current options are a valid variant
  const variant = useMemo(() => {
    let variantId: string | undefined = undefined

    for (const key of Object.keys(variantRecord)) {
      if (isEqual(variantRecord[key], options)) {
        variantId = key
      }
    }

    return variants.find((v) => v.id === variantId)
  }, [options, variantRecord, variants])

  // if product only has one variant, then select it
  useEffect(() => {
    if (variants.length === 1 && variants[0].id) {
      setOptions(variantRecord[variants[0].id])
    }
  }, [variants, variantRecord])

  // update the options when a variant is selected
  const updateOptions = (update: Record<string, string>) => {
    console.log("options", options)
    console.log("update", update)
    setOptions({ ...options, ...update })
  }

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (variant && !variant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (variant && variant.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (variant?.inventory_quantity && variant.inventory_quantity > 0) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [variant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!variant?.id) return null

    setIsAdding(true)

    await addToCart({
      variantId: variant.id,
      quantity: 1,
      countryCode,
    })
    toast.success("Product added to cart")

    setIsAdding(false)
  }

  return (
    <>
      <Toaster />

      <div className="details__group">
        <h3 className="details__title">{product.title}</h3>
        <p className="details__brand">
          Brands: <span>{product.collection?.title}</span>
        </p>

        <ProductPrice product={product} variant={variant} region={region} />
        <p className="short__description">{product.description}</p>

        <ul className="product__list">
          <li className="list__item flex">
            <i className="fi-rs-crown"></i> 1 Year AL Jazeera Brand Warranty
          </li>
          <li className="list__item flex">
            <i className="fi-rs-refresh"></i> 30 Day Return Policy
          </li>

          <li className="list__item flex">
            <i className="fi-rs-credit-card"></i> Cash on Delivery available
          </li>
        </ul>

        <div className="flex flex-col gap-y-2" ref={actionsRef}>
          <div>
            {product.variants.length > 1 && (
              <div className="flex flex-col gap-y-4">
                {(product.options || []).map((option) => {
                  return (
                    <div key={option.id}>
                      <OptionSelect
                        option={option}
                        current={options[option.id]}
                        updateOption={updateOptions}
                        title={option.title}
                        data-testid="product-options"
                        disabled={!!disabled || isAdding}
                      />
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div className="details__action">
            <Button
              onClick={handleAddToCart}
              disabled={!inStock || !variant || !!disabled || isAdding}
              variant="primary"
              className=" btn px-0 py-0 shadow-buttons-none hover:bg-ui-button-transparent"
              isLoading={isAdding}
              data-testid="add-product-button"
            >
              {!variant
                ? "Select variant"
                : !inStock
                ? "Out of stock"
                : "Add to cart"}
            </Button>
            <a href="#" className="details__action-btn">
              <span className="icon-[ant-design--heart-outlined]"></span>
            </a>
          </div>
          <MobileActions
            product={product}
            variant={variant}
            region={region}
            options={options}
            updateOptions={updateOptions}
            inStock={inStock}
            handleAddToCart={handleAddToCart}
            isAdding={isAdding}
            show={!inView}
            optionsDisabled={!!disabled || isAdding}
          />
        </div>

        <ul className="details__meta">
          <li className="meta__list flex">
            {variant?.sku && <span>SKU:</span>}
            {variant?.sku}
          </li>
          <li className="meta__list flex">
            <span>Tags:</span> {product.tags?.map((tag) => tag.value).join(",")}
          </li>
          <li className="meta__list flex">
            {variant?.inventory_quantity && <span>Availability:</span>}
            {variant?.inventory_quantity ?? 0} Items In Stock
          </li>
        </ul>
      </div>
    </>
  )
}
