"use client"
import { useState } from "react"
import TabBtns from "./tab-btns"
import TabItems from "./tab-items"
import { Region } from "@medusajs/medusa"
import { ProductCollectionWithPreviews } from "types/global"
export default function HomeFeatured({
  region,
  product_categories,
}: {
  region: Region
  product_categories: ProductCollectionWithPreviews[] | null
}) {
  const [activeTab, setActiveTab] = useState("Featured")

  const getMsg = (msg: string) => {
    setActiveTab(msg)
  }
  console.log(product_categories)

  return (
    <section className="products section container">
      <TabBtns onGetMsg={getMsg} activeTab={activeTab} />
      <TabItems
        activeTab={activeTab}
        region={region}
        product_categories={product_categories}
      />
    </section>
  )
}
