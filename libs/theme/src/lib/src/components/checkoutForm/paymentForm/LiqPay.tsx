import React, { useEffect } from "react"

let scriptAdded = false
const PayPalButton = props => {
  const addScript = () => {
    if (scriptAdded) {
      executeScript()
      return
    }

    const scriptUrl = "https://static.liqpay.ua/libjs/checkout.js"
    const container = document.body || document.head
    const script = document.createElement("script")
    script.src = scriptUrl
    script.onload = () => {
      executeScript()
    }
    container.appendChild(script)
    scriptAdded = true
  }

  const executeScript = () => {
    const { formSettings, shopSettings, onPayment } = props

    let LiqPayCheckout: any
    LiqPayCheckout.init({
      data: formSettings.data,
      signature: formSettings.signature,
      language: formSettings.language,
      embedTo: "#liqpay_checkout",
      mode: "embed",
    })
      .on("liqpay.callback", data => {
        if (data.status === "success") {
          onPayment()
        }
      })
      .on("liqpay.ready", data => {
        // ready
      })
      .on("liqpay.close", data => {
        // close
      })
  }

  useEffect(() => {
    addScript()
  }, [])

  useEffect(() => {
    executeScript()
  })

  const { formSettings, shopSettings, onPayment } = props

  return <div id="liqpay_checkout" />
}

export default PayPalButton
