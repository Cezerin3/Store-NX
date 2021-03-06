import AjaxClient from "./ajaxClient"
import AjaxAccount from "./api/ajaxAccount"
import AjaxCart from "./api/ajaxCart"
import AjaxCookieBanner from "./api/ajaxCookieBanner"
import AjaxForgotPassword from "./api/ajaxForgotPassword"
import AjaxLogin from "./api/ajaxLogin"
import AjaxPaymentFormSettings from "./api/ajaxPaymentFormSettings"
import AjaxPaymentMethods from "./api/ajaxPaymentMethods"
import AjaxRegister from "./api/ajaxRegister"
import AjaxResetPassword from "./api/ajaxResetPassword"
import AjaxShippingMethods from "./api/ajaxShippingMethods"
import AppSettings from "./api/apps/settings"
import CheckoutFields from "./api/checkoutFields"
import Countries from "./api/countries"
import Currencies from "./api/currencies"
import CustomerGroups from "./api/customerGroups"
import Customers from "./api/customers"
import Files from "./api/files"
import OrderDiscounts from "./api/orders/discounts"
import OrderItems from "./api/orders/items"
import Orders from "./api/orders/orders"
import OrderStatuses from "./api/orders/statuses"
import OrderTransactions from "./api/orders/transactions"
import Pages from "./api/pages"
import PaymentGateways from "./api/paymentGateways"
import PaymentMethods from "./api/paymentMethods"
import ProductCategories from "./api/productCategories"
import ProductImages from "./api/products/images"
import ProductOptions from "./api/products/options"
import ProductOptionValues from "./api/products/optionValues"
import Products from "./api/products/products"
import ProductVariants from "./api/products/variants"
import Redirects from "./api/redirects"
import Settings from "./api/settings"
import ShippingMethods from "./api/shippingMethods"
import Sitemap from "./api/sitemap"
import Status from "./api/status"
import Text from "./api/text"
import ThemeAssets from "./api/theme/assets"
import ThemePlaceholders from "./api/theme/placeholders"
import ThemeSettings from "./api/theme/settings"
import Theme from "./api/theme/theme"
import Tokens from "./api/tokens"
import Webhooks from "./api/webhooks"
import ApiClient from "./apiClient"
import WebStoreAccount from "./webstore/account"
import WebStoreServiceActions from "./webstore/serviceActions"
import WebStoreServiceLogs from "./webstore/serviceLogs"
import WebStoreServices from "./webstore/services"
import WebStoreServiceSettings from "./webstore/serviceSettings"
import WebStoreClient from "./webstoreClient"

class Client {
  apiBaseUrl: any
  apiToken: any
  ajaxBaseUrl: any
  webstoreToken: any
  products: any | Products
  productCategories: ProductCategories
  customers: Customers
  orders: any | Orders
  orderStatuses: OrderStatuses
  shippingMethods: ShippingMethods
  paymentMethods: PaymentMethods
  paymentGateways: PaymentGateways
  customerGroups: CustomerGroups
  sitemap: Sitemap
  theme: any | Theme
  countries: Countries
  currencies: Currencies
  text: Text
  settings: any | Settings
  checkoutFields: CheckoutFields
  pages: Pages
  tokens: Tokens
  redirects: Redirects
  webhooks: Webhooks
  files: Files
  apps: any
  ajax: any
  webstore: any
  status: Status
  constructor(
    options: {
      apiBaseUrl?: string
      apiToken?: string
      ajaxBaseUrl?: string
      webstoreToken?
    } = {}
  ) {
    this.apiBaseUrl = options.apiBaseUrl || "/api/v1"
    this.apiToken = options.apiToken
    this.ajaxBaseUrl = options.ajaxBaseUrl || "/ajax"
    this.webstoreToken = options.webstoreToken

    const apiClient = new ApiClient({
      baseUrl: this.apiBaseUrl,
      token: this.apiToken,
    })
    const ajaxClient = new AjaxClient({ baseUrl: this.ajaxBaseUrl })
    const webstoreClient = new WebStoreClient({ token: this.webstoreToken })

    this.products = new Products(apiClient)
    this.products.options = new ProductOptions(apiClient)
    this.products.options.values = new ProductOptionValues(apiClient)
    this.products.variants = new ProductVariants(apiClient)
    this.products.images = new ProductImages(apiClient)
    this.productCategories = new ProductCategories(apiClient)
    this.customers = new Customers(apiClient)
    this.orders = new Orders(apiClient)
    this.orders.discounts = new OrderDiscounts(apiClient)
    this.orders.transactions = new OrderTransactions(apiClient)
    this.orders.items = new OrderItems(apiClient)
    this.orderStatuses = new OrderStatuses(apiClient)
    this.shippingMethods = new ShippingMethods(apiClient)
    this.paymentMethods = new PaymentMethods(apiClient)
    this.paymentGateways = new PaymentGateways(apiClient)
    this.customerGroups = new CustomerGroups(apiClient)
    this.sitemap = new Sitemap(apiClient)
    this.theme = new Theme(apiClient)
    this.theme.settings = new ThemeSettings(apiClient)
    this.theme.assets = new ThemeAssets(apiClient)
    this.theme.placeholders = new ThemePlaceholders(apiClient)
    this.countries = new Countries(apiClient)
    this.currencies = new Currencies(apiClient)
    this.text = new Text(apiClient)
    this.settings = new Settings(apiClient)
    this.checkoutFields = new CheckoutFields(apiClient)
    this.pages = new Pages(apiClient)
    this.tokens = new Tokens(apiClient)
    this.redirects = new Redirects(apiClient)
    this.webhooks = new Webhooks(apiClient)
    this.status = new Status(apiClient)
    this.files = new Files(apiClient)
    this.apps = {}
    this.apps.settings = new AppSettings(apiClient)

    this.ajax = {}
    this.ajax.products = new Products(ajaxClient)
    this.ajax.sitemap = new Sitemap(ajaxClient)
    this.ajax.cart = new AjaxCart(ajaxClient)
    this.ajax.login = new AjaxLogin(ajaxClient)
    this.ajax.register = new AjaxRegister(ajaxClient)
    this.ajax.account = new AjaxAccount(ajaxClient)
    this.ajax.forgotPassword = new AjaxForgotPassword(ajaxClient)
    this.ajax.resetPassword = new AjaxResetPassword(ajaxClient)
    this.ajax.cookieBanner = new AjaxCookieBanner(ajaxClient)
    this.ajax.countries = new Countries(ajaxClient)
    this.ajax.currencies = new Currencies(ajaxClient)
    this.ajax.shippingMethods = new AjaxShippingMethods(ajaxClient)
    this.ajax.paymentMethods = new AjaxPaymentMethods(ajaxClient)
    this.ajax.paymentFormSettings = new AjaxPaymentFormSettings(ajaxClient)
    this.ajax.pages = new Pages(ajaxClient)

    this.webstore = {}
    this.webstore.account = new WebStoreAccount(webstoreClient)
    this.webstore.services = new WebStoreServices(webstoreClient)
    this.webstore.services.settings = new WebStoreServiceSettings(
      webstoreClient
    )
    this.webstore.services.actions = new WebStoreServiceActions(webstoreClient)
    this.webstore.services.logs = new WebStoreServiceLogs(webstoreClient)
  }

  static authorize = (baseUrl, email) => ApiClient.authorize(baseUrl, email)

  static authorizeInWebStore = (email, adminUrl): any =>
    WebStoreClient.authorize(email, adminUrl)
}

export default Client
