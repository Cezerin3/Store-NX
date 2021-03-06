import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { deleteCurrentCustomer } from "../reducer"
import Buttons from "./components/buttons"

const mapStateToProps = (state, ownProps) => {
  return {
    customer: state.customers.editCustomer,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDelete: () => {
      dispatch(deleteCurrentCustomer())
      ownProps.history.push("/customers")
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buttons))
