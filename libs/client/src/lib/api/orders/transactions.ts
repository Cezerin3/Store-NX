class OrderTransactions {
  client: any
  constructor(client) {
    this.client = client
  }

  create(orderId: string, data) {
    return this.client.post(`/orders/${orderId}/transactions`, data)
  }

  update(orderId: string, transactionId: string, data) {
    return this.client.put(
      `/orders/${orderId}/transactions/${transactionId}`,
      data
    )
  }

  delete(orderId: string, transactionId: string) {
    return this.client.delete(
      `/orders/${orderId}/transactions/${transactionId}`
    )
  }
}

export default OrderTransactions
