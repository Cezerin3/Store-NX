import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import {
  addOrderItem,
  cancelOrder,
  closeOrder,
  deleteCurrentOrder,
  updateOrder,
} from "../reducer"
import Buttons from "./components/buttons"

const mapStateToProps = (state, ownProps) => {
  return {
    settings: state.settings.settings,
    order: state.orders.editOrder,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDelete: () => {
      dispatch(deleteCurrentOrder())
      ownProps.history.push("/orders")
    },
    setCancelled: orderId => {
      dispatch(cancelOrder(orderId))
    },
    holdOrder: orderId => {
      dispatch(updateOrder({ id: orderId, hold: true }))
    },
    resumeOrder: orderId => {
      dispatch(updateOrder({ id: orderId, hold: false }))
    },
    setClosed: orderId => {
      dispatch(closeOrder(orderId))
    },
    addItem: (orderId, productId) => {
      dispatch(addOrderItem(orderId, productId))
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buttons))
