import React from "react"

import UnderlineLink from "@modules/common/components/interactive-link"

import AccountNav from "../components/account-nav"
import { Customer } from "@medusajs/medusa"
import { clx } from "@medusajs/ui"

interface AccountLayoutProps {
  customer: Omit<Customer, "password_hash"> | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <section className="accounts section--lg" data-testid="account-page">
      <div
        className={clx("accounts__container container ", { grid: customer })}
      >
        <div className="">{customer && <AccountNav customer={customer} />}</div>
        <div className="tabs__content">{children}</div>
      </div>
    </section>
  )
}

export default AccountLayout
