import { clx, Text } from "@medusajs/ui"

import { ProductPreviewType } from "types/global"

import { retrievePricedProductById } from "@lib/data"
import { getProductPrice } from "@lib/util/get-product-price"
import { Region } from "@medusajs/medusa"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import Image from "next/image"

export default async function ProductPreview({
  productPreview,
  isFeatured,
  region,
}: {
  productPreview: ProductPreviewType
  isFeatured?: boolean
  region: Region
}) {
  const pricedProduct = await retrievePricedProductById({
    id: productPreview.id,
    regionId: region.id,
  }).then((product) => product)

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
    region,
  })
  console.log(productPreview)

  return (
    // <LocalizedClientLink
    //   href={`/products/${productPreview.handle}`}
    //   className="group"
    // >
    //   <div data-testid="product-wrapper">
    //     <Thumbnail
    //       thumbnail={productPreview.thumbnail}
    //       size="full"
    //       isFeatured={isFeatured}
    //     />
    //     <div className="flex txt-compact-medium mt-4 justify-between">
    //       <Text className="text-ui-fg-subtle" data-testid="product-title">
    //         {productPreview.title}
    //       </Text>
    //       <div className="flex items-center gap-x-2">
    //         {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
    //       </div>
    //     </div>
    //   </div>
    // </LocalizedClientLink>
    // )
    <div className="product__item">
      <div className="product__banner">
        <LocalizedClientLink
          href={`/products/${productPreview.handle}`}
          className="product__images"
        >
          {productPreview.images?.map(
            (image, i) =>
              i < 2 && (
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
          )}
        </LocalizedClientLink>
        <div className="product__actions">
          <a href="#" className="action__btn" aria-label="Quick View">
            <i className="icon-[ph--eye]" role="img" aria-hidden="true"></i>
          </a>
          <a href="#" className="action__btn" aria-label="Add to Wishlist">
            <i className="icon-[ph--heart]" role="img" aria-hidden="true"></i>
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
          {productPreview.tags?.length == 0
            ? "sale"
            : productPreview.tags[0].value}
        </div>
      </div>
      <div className="product__content">
        {/* <span className="product__category">
          {productPreview?.collection?.title}
        </span> */}
        <a href="details.html">
          <h3 className="product__title">{productPreview.title}</h3>
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
            {productPreview.price?.calculated_price}
          </span>
          <span className="old__price">
            {productPreview.price?.original_price}
          </span>
        </div>

        <a href="#" className="action__btn cart__btn" aria-label="Add To Cart">
          <i
            className="icon-[mdi--bag-personal-plus-outline]"
            role="img"
            aria-hidden="true"
          ></i>
        </a>
      </div>
    </div>
  )
}
