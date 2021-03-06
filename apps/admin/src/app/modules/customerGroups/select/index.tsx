import { connect } from "react-redux"
import List from "../components/list"
import { fetchGroupsIfNeeded } from "../reducer"

const mapStateToProps = state => {
  return {
    items: state.customerGroups.items,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      dispatch(fetchGroupsIfNeeded())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
