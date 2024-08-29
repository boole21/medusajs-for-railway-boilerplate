import { Region } from "@medusajs/medusa"
import { Button, Heading } from "@medusajs/ui"
import Banner from "@modules/home/components/banner"
// import HomeCategories from "@modules/home/components/categories"
// import HomeFeatured from "@modules/home/components/featured"
import { ProductCollectionWithPreviews } from "types/global"

const Hero = ({
  region,
}: // product_categories,
{
  region: Region
  // product_categories: ProductCollectionWithPreviews[]
}) => {
  return (
    <>
      <Banner />
      {/* <HomeCategories /> */}
      {/* <HomeFeatured region={region} product_categories={product_categories} /> */}
    </>
  )
}

export default Hero
