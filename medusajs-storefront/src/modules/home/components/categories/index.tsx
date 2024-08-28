import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { medusaClient } from "@lib/config"
import category1 from "@modules/assets/img/dog.jpg"
import category2 from "@modules/assets/img/dog.jpg"
// import category3 from "@modules/assets/img/category-3.jpg"
// import category4 from "@modules/assets/img/category-4.jpg"
// import category5 from "@modules/assets/img/category-5.jpg"
// import category6 from "@modules/assets/img/category-6.jpg"
// import category7 from "@modules/assets/img/category-7.jpg"
// import category8 from "@modules/assets/img/category-8.jpg"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function HomeCategories() {
  let { product_categories } = await medusaClient.productCategories.list({
    limit: 2,
  })
  let category = [
    category1,
    category2,
    // category3,
    // category4,
    // category5,
    // category6,
    // category7,
    // category8,
  ]

  return (
    <section className="categories container section">
      <div className="categories__container swiper">
        <div className="swiper-wrapper">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <div className="section__header relative flex  items-center justify-between">
              <h3 className="section__title">
                <span>Popular</span> Categories
              </h3>
              <div className="swiper-buttons">
                <div className="swiper-button-next absolute right-5">
                  <CarouselPrevious />
                </div>
                <div className="swiper-button-prev">
                  <CarouselNext className="absolute right-0" />
                </div>
              </div>
            </div>
            <CarouselContent>
              {product_categories.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/3 lg:basis-1/5 category__container swiper-slide"
                >
                  <Card className="category__item">
                    <CardContent className="p-0">
                      <LocalizedClientLink
                        className="swiper-slide"
                        href={`/categories/${item.handle}`}
                        data-testid="category-link"
                      >
                        <Image
                          src={category[index]}
                          alt=""
                          className="category__img"
                        />

                        <h3 className="category__title">{item.name}</h3>
                      </LocalizedClientLink>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
