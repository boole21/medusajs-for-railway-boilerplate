import { useState } from "react"
import TabBtns from "./tab-btns"
import TabItems from "./tab-items"

export default function HomeFeatured() {
  return (
    <section className="products section container">
      <TabBtns />
      <TabItems />
    </section>
  )
}
