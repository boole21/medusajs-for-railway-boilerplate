import { ProductOption } from "@medusajs/medusa"
import { clx } from "@medusajs/ui"
import React from "react"

import { onlyUnique } from "@lib/util/only-unique"

type OptionSelectProps = {
  option: ProductOption
  current: string
  updateOption: (option: Record<string, string>) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = option.values.map((v) => v.value).filter(onlyUnique)

  return (
    <div
      className={clx("flex", {
        details__color: title === "Color",
        details__size: title === "Size",
      })}
    >
      <span className="details__color-title">{title}</span>

      <ul
        className={clx({
          color__list: title === "Color",
          size__list: title === "Size",
        })}
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          return (
            <li key={v}>
              <button
                onClick={() => updateOption({ [option.id]: v })}
                className={clx({
                  "border-ui-border-interactive size__link size-active":
                    v === current,
                  "hover:shadow-elevation-card-rest transition-shadow ease-in-out duration-150 size__link":
                    v !== current,
                })}
                disabled={disabled}
                data-testid="option-button"
              >
                {v}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default OptionSelect
