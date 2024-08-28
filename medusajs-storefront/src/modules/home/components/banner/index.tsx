import { Button, Heading, Text } from "@medusajs/ui"
import Image from "next/image"
import homeImg from "@modules/assets/img/home-img.png"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Banner = () => {
  return (
    <section className="home section--lg">
      <div className="home__container container grid">
        <div className="home__content">
          <span className="home__subtitle">Hot promotions</span>
          <Heading level="h1" className="home__title">
            Fashion Trending <span>Great Collections</span>
          </Heading>
          <Text className="home__description">
            Save more with coupons & up to 20% off
          </Text>
          <LocalizedClientLink className="btn" href={`/store`}>
            Shop Now
          </LocalizedClientLink>
        </div>
        <Image src={homeImg} alt="" className="home__img" />
      </div>
    </section>
  )
}

export default Banner
