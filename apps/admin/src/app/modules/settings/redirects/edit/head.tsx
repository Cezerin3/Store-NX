import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { deleteRedirect } from "../../reducer"
import Buttons from "./components/headButtons"

const mapStateToProps = (state, ownProps) => ({
  redirect: state.settings.redirectEdit,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDelete: redirectId => {
    dispatch(deleteRedirect(redirectId))
    ownProps.history.push("/settings/redirects")
  },
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buttons))
