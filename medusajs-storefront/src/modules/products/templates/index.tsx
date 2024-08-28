import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import Image from "next/image"

type ProductTemplateProps = {
  product: PricedProduct
  region: Region
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }
  console.log(product)

  return (
    <>
      <section className="breadcrumb">
        <ul className="breadcrumb__list flex container">
          <li>
            <a href="/" className="breadcrumb__link">
              Home
            </a>
          </li>
          <li>
            <span className="breadcrumb__link">{`>`}</span>
          </li>
          <li>
            <span className="breadcrumb__link">
              {product.collection?.title}
            </span>
          </li>
        </ul>
      </section>

      <section className="details section--lg">
        <div className="details__container container grid">
          <div className="details__group">
            <Image
              src={product.thumbnail}
              width="800"
              height="800"
              alt=""
              className="details__img"
            />

            <div className="details__small-images grid">
              {product?.images.map((image, index) => (
                <Image
                  key={index}
                  src={image.url}
                  width="800"
                  height="800"
                  alt=""
                  className="details__small-img"
                />
              ))}
            </div>
          </div>

          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
              />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
        </div>
      </section>

      <section className="details__tab container">
        <div className="detail__tabs">
          <span className="detail__tab active-tab" data-target="#info">
            Additional Info
          </span>
        </div>

        <div className="details__tabs-content">
          <div className="details__tab-content active-tab" content id="info">
            <ProductTabs product={product} />
          </div>
        </div>
      </section>

      <div
        className="content-container my-16 small:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
