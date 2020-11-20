function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key]
          }
        }
      }
      return target
    }
  return _extends.apply(this, arguments)
}

import React from "react"

const TextareaField = field =>
  /*#__PURE__*/ React.createElement(
    "div",
    {
      className: field.className,
    },
    /*#__PURE__*/ React.createElement(
      "label",
      {
        htmlFor: field.id,
      },
      field.label,
      field.meta.touched &&
        field.meta.error &&
        /*#__PURE__*/ React.createElement(
          "span",
          {
            className: "error",
          },
          field.meta.error
        )
    ),
    /*#__PURE__*/ React.createElement(
      "textarea",
      _extends({}, field.input, {
        placeholder: field.placeholder,
        rows: field.rows,
        id: field.id,
        className: field.meta.touched && field.meta.error ? "invalid" : "",
      })
    )
  )

export default TextareaField
