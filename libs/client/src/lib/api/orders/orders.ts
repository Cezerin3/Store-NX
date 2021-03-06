class Orders {
  client: any
  resourceUrl: string
  constructor(client) {
    this.client = client
    this.resourceUrl = "/orders"
  }

  list(filter) {
    return this.client.get(this.resourceUrl, filter)
  }

  retrieve(orderId: string, filter) {
    return this.client.get(`${this.resourceUrl}/${orderId}`, filter)
  }

  create(data) {
    return this.client.post(this.resourceUrl, data)
  }

  update(orderId: string, data) {
    return this.client.put(`${this.resourceUrl}/${orderId}`, data)
  }

  delete(orderId: string) {
    return this.client.delete(`${this.resourceUrl}/${orderId}`)
  }

  recalculate(orderId: string) {
    return this.client.put(`${this.resourceUrl}/${orderId}/recalculate`)
  }

  checkout(orderId: string) {
    return this.client.put(`${this.resourceUrl}/${orderId}/checkout`)
  }

  cancel(orderId: string) {
    return this.client.put(`${this.resourceUrl}/${orderId}/cancel`)
  }

  close(orderId: string) {
    return this.client.put(`${this.resourceUrl}/${orderId}/close`)
  }

  updateBillingAddress(orderId: string, address) {
    return this.client.put(
      `${this.resourceUrl}/${orderId}/billing_address`,
      address
    )
  }

  updateShippingAddress(orderId: string, address) {
    return this.client.put(
      `${this.resourceUrl}/${orderId}/shipping_address`,
      address
    )
  }

  getPaymentFormSettings(orderId: string) {
    return this.client.get(
      `${this.resourceUrl}/${orderId}/payment_form_settings`
    )
  }
}

export default Orders
