import React from "react"
import { themeSettings, text } from "../../lib/settings"
import CustomProducts from "../products/custom"

const RelatedProducts = props => {
  const { ids, settings, addCartItem, limit } = props

  if (ids && ids.length > 0) {
    let title =
      themeSettings.related_products_title &&
      themeSettings.related_products_title.length > 0
        ? themeSettings.related_products_title
        : text.relatedProducts
    return /*#__PURE__*/ React.createElement(
      "section",
      {
        className: "section section-product-related",
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "container",
        },
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "title is-4 has-text-centered",
          },
          title
        ),
        /*#__PURE__*/ React.createElement(CustomProducts, {
          ids: ids,
          sort: null,
          limit: limit,
          isCentered: true,
          settings: settings,
          addCartItem: addCartItem,
        })
      )
    )
  } else {
    return null
  }
}

export default RelatedProducts
