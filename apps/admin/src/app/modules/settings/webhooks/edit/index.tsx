import { connect } from "react-redux"
import {
  createWebhook,
  fetchWebhook,
  receiveWebhook,
  updateWebhook,
} from "../../reducer"
import Form from "./components/form"

const mapStateToProps = (state, ownProps) => {
  const { webhookId } = ownProps.match.params
  return {
    webhookId: webhookId,
    initialValues: state.settings.webhookEdit,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoad: () => {
      const { webhookId } = ownProps.match.params
      if (webhookId) {
        dispatch(fetchWebhook(webhookId))
      } else {
        dispatch(receiveWebhook({ enabled: true }))
      }
    },
    onSubmit: webhook => {
      if (webhook.id) {
        dispatch(updateWebhook(webhook))
      } else {
        dispatch(createWebhook(webhook))
        ownProps.history.push("/settings/webhooks")
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
