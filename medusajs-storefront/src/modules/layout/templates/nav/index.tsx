import { Suspense } from "react"

import { listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Link from "next/link"
import Image from "next/image"
import logo from "@modules/assets/img/logo.svg"
import search from "@modules/assets/img/search.png"

export default async function Nav() {
  const regions = await listRegions().then((regions) => regions)
  const SideMenuItems = {
    Home: "/",
    Store: "/store",
    Search: "/search",
    Account: "/account",
    Cart: "/cart",
  }

  return (
    <header className="header">
      <div className="header__top">
        <div className="header__container container">
          <div className="header__contact">
            <span>(+01) - 2345 - 6789</span>
            <span> Our location </span>
          </div>
          <p className="header__alert-news">
            Super Value Deals - Save more with coupons
          </p>

          <LocalizedClientLink
            href={"/account"}
            className="header__top-action"
            data-testid={`header__top-action`}
          >
            Log In/ Sign Up
          </LocalizedClientLink>
        </div>
      </div>

      <nav className="nav container">
        <LocalizedClientLink
          href="/"
          className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
          data-testid="nav-store-link"
        >
          <Image src={logo} alt="" className="nav__logo-img" />
        </LocalizedClientLink>

        <div className="flex w-full justify-end">
          {/* <Link href="" className="header__action-btn">
            <i
              className="icon-[lucide--heart] text-2xl"
              role="img"
              aria-hidden="true"
            ></i>{" "}
            <span className="count">3</span>
          </Link> */}
          <div className="nav__menu" id="nav-menu">
            <div className="nav__menu-top">
              <Link href="index.html" className="nav__logo">
                <Image src={logo} alt="" className="nav__logo-img" />
              </Link>
            </div>
            <div className="hidden lg:flex">
              <ul className="nav__list">
                {Object.entries(SideMenuItems).map(([name, href]) => {
                  return (
                    <li className="nav__item" key={name}>
                      <LocalizedClientLink
                        href={href}
                        className="nav__link"
                        data-testid={`${name.toLowerCase()}-link`}
                      >
                        {name}
                      </LocalizedClientLink>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <Suspense
            fallback={
              <LocalizedClientLink
                className="hover:text-ui-fg-base flex gap-2 header__action-btn"
                href="/cart"
                data-testid="nav-cart-link"
              >
                <i
                  className="icon-[bi--bag] text-2xl"
                  role="img"
                  aria-hidden="true"
                ></i>
                <span className="count">0</span>
                {/* Cart (0) */}
              </LocalizedClientLink>
            }
          >
            <CartButton />
          </Suspense>
          <SideMenu menu={SideMenuItems} regions={regions} />
        </div>
      </nav>
    </header>
  )
}
