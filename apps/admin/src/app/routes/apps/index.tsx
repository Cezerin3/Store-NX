import React from "react"
import { Route, Switch } from "react-router-dom"
import Account from "../../modules/apps/account"
import AppDetails from "../../modules/apps/appDetails"
import ServiceDetails from "../../modules/apps/serviceDetails"
import Services from "../../modules/apps/services"
import Login from "../apps/login"
import NotFound from "../notFound"

const AppsRoute = () => (
  <Switch>
    <Route path="/apps" exact component={Services} />
    <Route path="/apps/service/:serviceId" exect component={ServiceDetails} />
    <Route path="/apps/app/:appKey" exect component={AppDetails} />
    <Route path="/apps/login" exact component={Login} />
    <Route path="/apps/account" exact component={Account} />
    <Route component={NotFound} />
  </Switch>
)

export default AppsRoute
