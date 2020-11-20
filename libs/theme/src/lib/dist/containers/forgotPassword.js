import React from "react"
import ForgotPassword from "../components/forgotPassword/index"

const ForgotPasswordContainer = props =>
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
          /*#__PURE__*/ React.createElement(ForgotPassword, props)
        )
      )
    )
  )

export default ForgotPasswordContainer
