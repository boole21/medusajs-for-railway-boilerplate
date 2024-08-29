"use client"
import { medusaClient } from "@lib/config"
import { retrievePricedProductById, getRegion } from "@lib/data"
import { getProductPrice } from "@lib/util/get-product-price"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Product } from "@medusajs/product"
import { clx } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import { getProductsByCategoryHandle, getProductsList } from "@lib/data"
import { Region } from "@medusajs/medusa"
import { ProductCollectionWithPreviews } from "types/global"
import { useState } from "react"
export default function TabItems({
  activeTab,
  region,
  product_categories,
}: {
  activeTab: string
  region: Region
  product_categories: ProductCollectionWithPreviews[] | null
}) {
  console.log(product_categories)
  product_categories = product_categories.filter(
    (cate) => cate.name === activeTab
  )

  console.log(product_categories[0].products)
  // const getCates = async () => {
  //   const featuredPromise = medusaClient.products.list({
  //     category_id: ["pcat_01J4N6NNA19VJFMZC203NVXB4D"],
  //     limit: 8,
  //   })
  //   const popularPromise = medusaClient.products.list({
  //     category_id: ["pcat_01J4N6P39FY8HGMXNFMVVVCVBA"],
  //     limit: 8,
  //   })
  //   const newPromise = medusaClient.products.list({
  //     category_id: ["pcat_01J4N6PREKVGD3XDXCAMJ99Y9K"],
  //     limit: 8,
  //   })
  //   return Promise.all([featuredPromise])
  // }

  // const cates = await getCates()

  // console.log(cates)

  // console.log("cate", cates[0].products[0])

  // const product1 = cates[0].products[0]

  // console.log(product1)

  // const pricedProduct = await retrievePricedProductById({
  //   id: "prod_01J4QFR71H81QNSFF6M4QGP5NP",
  //   regionId: region.id,
  // })

  // if (!pricedProduct) {
  //   return null
  // }

  // console.log(getProductPrice({ product: pricedProduct, region }))

  // const getCheapestPrice = async (myProduct: PricedProduct) => {
  //   const pricedProduct = await retrievePricedProductById({
  //     id: myProduct.id,
  //     regionId: region.id,
  //   })

  //   if (!pricedProduct) {
  //     return null
  //   }

  //   const { cheapestPrice } = getProductPrice({
  //     product: pricedProduct,
  //     region,
  //   })
  //   return cheapestPrice
  // }
  return (
    <div className="tab__items">
      <div className="products__container grid">
        {product_categories[0]?.products.map((product, num) => (
          <div className="product__item" key={num}>
            <div className="product__banner">
              <LocalizedClientLink
                href={`/products/${product.handle}`}
                className="product__images"
              >
                {/* {product.images?.map(
                  (image, i) =>
                    i <= 1 && (
                      <Image
                        key={i}
                        src={image.url}
                        alt=""
                        width={500}
                        height={500}
                        className={clx("product__img", {
                          detail: i === 0,
                          hover: i === 1,
                        })}
                      />
                    )
                )} */}
                <Image
                  src={product.thumbnail}
                  alt=""
                  width={500}
                  height={500}
                  className={clx("product__img")}
                />
              </LocalizedClientLink>
              <div className="product__actions">
                <a href="#" className="action__btn" aria-label="Quick View">
                  <i
                    className="icon-[ph--eye]"
                    role="img"
                    aria-hidden="true"
                  ></i>
                </a>
                <a
                  href="#"
                  className="action__btn"
                  aria-label="Add to Wishlist"
                >
                  <i
                    className="icon-[ph--heart]"
                    role="img"
                    aria-hidden="true"
                  ></i>
                </a>

                <a href="#" className="action__btn" aria-label="Compare">
                  <span
                    className="icon-[material-symbols--shuffle]"
                    role="img"
                    aria-hidden="true"
                  ></span>
                </a>
              </div>

              <div className="product__badge light-pink">
                {/* {product.tags?.length == 0 ? "sale" : product?.tags[0]?.value} */}
                sale
              </div>
            </div>
            <div className="product__content">
              <span className="product__category">
                {product?.collection?.title}
              </span>
              <a href="details.html">
                <h3 className="product__title">{product.title}</h3>
              </a>
              <div className="product__rating">
                <i className="fi fi-rs-star"></i>
                <i className="fi fi-rs-star"></i>
                <i className="fi fi-rs-star"></i>
                <i className="fi fi-rs-star"></i>
                <i className="fi fi-rs-star"></i>
              </div>
              <div className="product__price flex">
                <span className="new__price">
                  {product.price?.calculated_price}
                </span>
                <span className="old__price">
                  {product.price?.original_price}
                </span>
              </div>

              <a
                href="#"
                className="action__btn cart__btn"
                aria-label="Add To Cart"
              >
                <i
                  className="icon-[mdi--bag-personal-plus-outline]"
                  role="img"
                  aria-hidden="true"
                ></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
