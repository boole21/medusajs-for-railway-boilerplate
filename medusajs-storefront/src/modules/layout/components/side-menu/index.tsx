"use client"

import { Popover, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Region } from "@medusajs/medusa"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import Link from "next/link"
import Image from "next/image"
import logo from "@modules/assets/img/logo.svg"
import search from "@modules/assets/img/search.png"

const SideMenu = ({ regions, menu }: { regions: Region[] | null }) => {
  const toggleState = useToggleState()
  const SideMenuItems = menu

  return (
    <>
      {/* <Link href="" className="header__action-btn">
          <i
            className="icon-[lucide--heart] text-2xl"
            role="img"
            aria-hidden="true"
          ></i>{" "}
          <span className="count">3</span>
        </Link>
        <Link href="cart.html" className="header__action-btn">
          <i
            className="icon-[bi--bag] text-2xl"
            role="img"
            aria-hidden="true"
          ></i>
          <span className="count">3</span>
        </Link> */}

      <Popover>
        {({ open, close }) => (
          <>
            <div className="relative h-full flex lg:hidden">
              <Popover.Button
                data-testid="nav-menu-button"
                className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
              >
                <span
                  className="icon-[solar--hamburger-menu-line-duotone] text-3xl"
                  role="img"
                  aria-hidden="true"
                ></span>
              </Popover.Button>
            </div>

            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100 backdrop-blur-2xl"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 backdrop-blur-2xl"
              leaveTo="opacity-0"
            >
              <Popover.Panel className="fixed nav__panel w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min max-w-400 h-100  right-0 inset-y-0 text-sm  bg-gray-50 shadow-md ">
                <div className="flex flex-col gap-y-6 py-8 px-5 ">
                  <div className="flex justify-between w-100 mb-6">
                    <Link href="index.html" className="nav__logo">
                      <Image src={logo} alt="" className="nav__logo-img" />
                    </Link>
                    <div id="xmark">
                      <button data-testid="close-menu-button" onClick={close}>
                        <XMark />
                      </button>
                    </div>
                  </div>

                  <div className="header__search">
                    <input
                      type="text"
                      placeholder="Search for items..."
                      className="form__input"
                    />
                    <button className="search__btn">
                      <Image src={search} alt="" />
                    </button>
                  </div>
                  <div data-testid="nav-menu-popup">
                    <ul className="flex flex-col order-1 items-start gap-y-6">
                      {Object.entries(SideMenuItems).map(([name, href]) => {
                        return (
                          <li className="nav__item" key={name}>
                            <LocalizedClientLink
                              href={href}
                              className="nav__link"
                              onClick={close}
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
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  )
}

export default SideMenu
