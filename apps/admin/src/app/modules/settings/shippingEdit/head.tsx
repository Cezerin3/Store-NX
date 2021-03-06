import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { deleteShippingMethod } from "../reducer"
import Buttons from "./components/headButtons"

const mapStateToProps = (state, ownProps) => {
  return {
    shippingMethod: state.settings.shippingMethodEdit,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDelete: id => {
      dispatch(deleteShippingMethod(id))
      ownProps.history.push("/settings/shipping")
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buttons))
