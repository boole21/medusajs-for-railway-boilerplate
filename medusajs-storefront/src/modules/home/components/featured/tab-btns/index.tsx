"use client"
import { useState } from "react"

export default function TabBtns({
  activeTab,
  onGetMsg,
}: {
  activeTab: string
  onGetMsg: Function
}) {
  const [tabList, setTabList] = useState([
    {
      id: 1,
      value: "Featured",
    },
    { id: 2, value: "Popular" },
    { id: 3, value: "New added" },
  ])
  return (
    <div className="tab__btns">
      {tabList.map((tab) => (
        <span
          key={tab.id}
          className={`tab__btn ${tab.value === activeTab ? "active-tab" : ""}`}
          data-target={`#${tab.value}`}
          onClick={() => onGetMsg(tab.value)}
        >
          {tab.value}
        </span>
      ))}
    </div>
  )
}
