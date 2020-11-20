import React from "react"
import Login from "../components/login/index"

const LoginContainer = props =>
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
          /*#__PURE__*/ React.createElement(Login, props)
        )
      )
    )
  )

export default LoginContainer
