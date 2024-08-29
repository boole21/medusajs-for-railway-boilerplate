import { Region } from "@medusajs/medusa"
import { Button, Heading } from "@medusajs/ui"
import Banner from "@modules/home/components/banner"
import HomeFeatured from "@modules/home/components/featured"
import { ProductCollectionWithPreviews } from "types/global"

const Hero = ({
  region,
  product_categories,
}: {
  region: Region
  product_categories: ProductCollectionWithPreviews[] | null
}) => {
  return (
    <>
      {/* <Banner /> */}
      <HomeFeatured region={region} product_categories={product_categories} />
    </>
  )
}

export default Hero
