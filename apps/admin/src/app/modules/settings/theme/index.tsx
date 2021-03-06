import { connect } from "react-redux"
import {
  exportReceive,
  exportRequest,
  installReceive,
  installRequest,
} from "../reducer"
import Form from "./components/form"

const mapStateToProps = state => {
  return {
    exportInProcess: state.settings.exportInProcess,
    installInProcess: state.settings.installInProcess,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    exportRequest: () => {
      dispatch(exportRequest())
    },
    exportReceive: () => {
      dispatch(exportReceive())
    },
    installRequest: () => {
      dispatch(installRequest())
    },
    installReceive: () => {
      dispatch(installReceive())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
