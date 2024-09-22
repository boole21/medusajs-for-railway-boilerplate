import { Text, clx } from "@medusajs/ui"

import { getCategoriesList, getCollectionsList } from "@lib/data"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
// import MedusaCTA from "@modules/layout/components/medusa-cta"
import Image from "next/image"
import logo from "@modules/assets/img/logo.svg"
import facebook from "@modules/assets/img/icon-facebook.svg"
import twitter from "@modules/assets/img/icon-twitter.svg"
import instagram from "@modules/assets/img/icon-instagram.svg"
import pinterest from "@modules/assets/img/icon-pinterest.svg"
import youtube from "@modules/assets/img/icon-youtube.svg"
import paymentMethod from "@modules/assets/img/payment-method.png"

export default async function Footer() {
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 6)

  return (
    <footer className="footer container">
      <div className="footer__container grid">
        <div className="footer__content">
          <LocalizedClientLink
            href="/"
            className="footer__logo-img txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
          >
            <Image src={logo} alt="" className="nav__logo-img" />
          </LocalizedClientLink>

          <h4 className="footer__subtitle">Contact</h4>

          <Text className="footer__description">
            <span>Address:</span> 562 Wellington Road, Street 32,San Francisco
          </Text>
          <Text className="footer__description">
            <span>Phone:</span> +01 2222 365 /(+91) 01 2345 6789
          </Text>
          <Text className="footer__description">
            <span>Hours:</span> 10:00 - 18:00, Mon - Sat
          </Text>
          <Text className="footer__description">
            <span>Email:</span> pennycostz@gmail.com
          </Text>

          <div className="footer__social">
            <h4 className="footer__subtitle">Follow Me</h4>

            <div className="footer__social-links flex">
              <LocalizedClientLink
                href="/"
                className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
              >
                <Image src={facebook} alt="" className="footer__social-icon" />
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/"
                className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
              >
                <Image src={twitter} alt="" className="footer__social-icon" />
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/"
                className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
              >
                <Image src={instagram} alt="" className="footer__social-icon" />
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/"
                className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
              >
                <Image src={pinterest} alt="" className="footer__social-icon" />
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/"
                className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
              >
                <Image src={youtube} alt="" className="footer__social-icon" />
              </LocalizedClientLink>
            </div>
          </div>
        </div>

        <div className="footer__content">
          <h3 className="footer__title">Address</h3>

          <ul className="footer__links">
            <li>
              <LocalizedClientLink className="footer__link" href={`/`}>
                About Us
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink className="footer__link" href={`/`}>
                Delivery Information
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink className="footer__link" href={`/`}>
                Privacy Policy
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink className="footer__link" href={`/`}>
                Terms & Conditions
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink className="footer__link" href={`/`}>
                Contact Us
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink className="footer__link" href={`/`}>
                Support Center
              </LocalizedClientLink>
            </li>
          </ul>
        </div>

        <div className="footer__content">
          <h3 className="footer__title">My Account</h3>

          <ul className="footer__links">
            <li>
              <LocalizedClientLink className="footer__link" href={`/`}>
                Sign In
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink className="footer__link" href={`/`}>
                View Cart
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink className="footer__link" href={`/`}>
                My Wishlist
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink className="footer__link" href={`/`}>
                Track My Order
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink className="footer__link" href={`/`}>
                Help
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink className="footer__link" href={`/`}>
                Order
              </LocalizedClientLink>
            </li>
          </ul>
        </div>

        <div className="footer__content">
          <h3 className="footer__title">Secured Payment Gateways</h3>

          <Image src={paymentMethod} alt="" className="payment__img" />
        </div>
      </div>

      <div className="footer__bottom">
        <Text className="copyright">
          &copy; {new Date().getFullYear()} Medusa Store. All rights reserved.
        </Text>
      </div>
    </footer>
  )
}
