import { Metadata } from "next"

import OrderOverview from "@modules/account/components/order-overview"
import { listCustomerOrders } from "@lib/data"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Orders",
  description: "Overview of your previous orders.",
}

export default async function Orders() {
  const orders = await listCustomerOrders()

  if (!orders) {
    notFound()
  }

  return (
    <div className="w-full tab__content" data-testid="orders-page-wrapper">
      <div className="tab__header">
        <h1 className="text-2xl-semi">Orders</h1>
      </div>
      <div className="tab__body">
        <div className="mb-8 flex flex-col gap-y-4">
          <p className="text-base-regular">
            View your previous orders and their status. You can also create
            returns or exchanges for your orders if needed.
          </p>
        </div>
        <div>
          <OrderOverview orders={orders} />
        </div>
      </div>
    </div>
  )
}
