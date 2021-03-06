import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { deleteCurrentProduct } from "../reducer"
import Buttons from "./components/buttons"

const mapStateToProps = (state, ownProps) => {
  return {
    product: state.products.editProduct,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDelete: () => {
      dispatch(deleteCurrentProduct())
      ownProps.history.push("/products")
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buttons))
