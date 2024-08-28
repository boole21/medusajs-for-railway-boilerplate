import { Product } from "@medusajs/medusa"
import { Metadata } from "next"

import {
  getCategoriesList,
  getCollectionsList,
  getProductsList,
  getRegion,
} from "@lib/data"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { ProductCollectionWithPreviews } from "types/global"
import { cache } from "react"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}
const getCategoriesWithProducts = cache(
  async (
    countryCode: string
  ): Promise<ProductCollectionWithPreviews[] | null> => {
    const { product_categories } = await getCategoriesList(0, 3)
    if (!product_categories) {
      return null
    }

    const categoryIds = product_categories.map((category) => category.id)
    console.log(categoryIds)

    await Promise.all(
      categoryIds.map((id) =>
        getProductsList({
          queryParams: { category_id: [id], limit: 8 },
          countryCode,
        })
      )
    ).then((responses) =>
      responses.forEach(({ response, queryParams }) => {
        let category

        if (product_categories) {
          category = product_categories.find(
            (category) => category.id === queryParams?.category_id?.[0]
          )
        }

        if (!category) {
          return
        }
        category.products = response.products as unknown as Product[]
      })
    )
    return product_categories as unknown as ProductCollectionWithPreviews[]
  }
)
// getCategoriesWithProducts("us")

const getCollectionsWithProducts = cache(
  async (
    countryCode: string
  ): Promise<ProductCollectionWithPreviews[] | null> => {
    const { collections } = await getCollectionsList(0, 3)

    if (!collections) {
      return null
    }

    const collectionIds = collections.map((collection) => collection.id)
    console.log(collectionIds)

    await Promise.all(
      collectionIds.map((id) =>
        getProductsList({
          queryParams: { collection_id: [id] },
          countryCode,
        })
      )
    ).then((responses) =>
      responses.forEach(({ response, queryParams }) => {
        let collection

        if (collections) {
          collection = collections.find(
            (collection) => collection.id === queryParams?.collection_id?.[0]
          )
        }

        if (!collection) {
          return
        }

        collection.products = response.products as unknown as Product[]
      })
    )

    console.log(collections)
    return collections as unknown as ProductCollectionWithPreviews[]
  }
)

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  console.log(collections)
  const product_categories = await getCategoriesWithProducts(countryCode)
  console.log(product_categories)

  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <main className="main">
      <Hero region={region} product_categories={product_categories} />
      {/* <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div> */}
    </main>
  )
}
