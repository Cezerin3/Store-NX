import React from "react"
import Account from "../components/account/index"

const AccountContainer = props =>
  /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    /*#__PURE__*/ React.createElement(
      "section",
      {
        className: "section",
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "container",
        },
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "content",
          },
          /*#__PURE__*/ React.createElement(Account, props)
        )
      )
    )
  )

export default AccountContainer
