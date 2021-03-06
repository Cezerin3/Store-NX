import { connect } from "react-redux"
import { deleteFile, fetchFiles, uploadFiles } from "../reducer"
import Form from "./components/form"

const mapStateToProps = state => {
  return {
    files: state.files.files,
    uploading: state.files.uploading,
    settings: state.settings.settings,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      dispatch(fetchFiles())
    },
    onDelete: fileName => {
      dispatch(deleteFile(fileName))
    },
    onUpload: form => {
      dispatch(uploadFiles(form))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
