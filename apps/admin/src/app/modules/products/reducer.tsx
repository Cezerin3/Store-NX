import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import moment from "moment"
import { api } from "../../lib"

const getFilter = (state, offset = 0) => {
  const searchTerm = state.products.filter.search
  const sortOrder = searchTerm && searchTerm.length > 0 ? "search" : "name"

  console.log(searchTerm)

  let filter: any = {
    limit: 50,
    fields:
      "id,name,category_id,category_ids,category_name,sku,images,enabled,discontinued,stock_status,stock_quantity,price,on_sale,regular_price,url",
    search: searchTerm,
    offset: offset,
    sort: sortOrder,
  }

  if (
    state.productCategories.selectedId !== null &&
    state.productCategories.selectedId !== "all"
  ) {
    filter.category_id = state.productCategories.selectedId
  }

  if (state.products.filter.stockStatus !== null) {
    filter.stock_status = state.products.filter.stockStatus
  }

  if (state.products.filter.enabled !== null) {
    filter.enabled = state.products.filter.enabled
  }

  if (state.products.filter.discontinued !== null) {
    filter.discontinued = state.products.filter.discontinued
  }

  if (state.products.filter.onSale !== null) {
    filter.on_sale = state.products.filter.onSale
  }

  return filter
}

export const importProducts = createAsyncThunk(
  "products/importProducts",
  async (args: any, { dispatch }) => {
    history => {}
  }
)

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (args, { dispatch, getState }) => {
    const state: any = getState()
    if (state.products.loadingItems) {
      // do nothing
    } else {
      dispatch(requestProducts())
      dispatch(deselectAllProduct())

      let filter = getFilter(state)

      return api.products
        .list(filter)
        .then(({ status, json }) => {
          dispatch(receiveProducts(json))
        })
        .catch(error => {
          dispatch(receiveProductsError(error))
        })
    }
  }
)

export const fetchMoreProducts = createAsyncThunk(
  "products/fetchMoreProducts",
  async (args, { dispatch, getState }) => {
    const state: any = getState()
    if (!state.products.loadingItems) {
      dispatch(requestMoreProducts())

      const offset = state.products.items.length
      let filter = getFilter(state, offset)

      return api.products
        .list(filter)
        .then(({ status, json }) => {
          dispatch(receiveProductsMore(json))
        })
        .catch(error => {
          dispatch(receiveProductsError(error))
        })
    }
  }
)

export const deleteCurrentProduct = createAsyncThunk(
  "products/deleteCurrentProduct",
  async (args, { getState }) => {
    const state: any = getState()
    let product = state.products.editProduct
    if (product && product.id) {
      return api.products
        .delete(product.id)
        .then(() => {})
        .catch(err => {
          console.log(err)
        })
    }
  }
)

export const deleteProducts = createAsyncThunk(
  "products/deleteProducts",
  async (args, { dispatch, getState }) => {
    const state: any = getState()
    try {
      await state.products.selected.map(productId =>
        api.products.delete(productId)
      )

      dispatch(deleteProductsSuccess())
      dispatch(deselectAllProduct())
      dispatch(fetchProducts())
    } catch (error) {
      console.error(error)
    }
  }
)

export const setCategory = createAsyncThunk(
  "products/setCategory",
  async ({ category_id }: any, { dispatch, getState }) => {
    const state: any = getState()
    let promises = state.products.selected.map(productId =>
      api.products.update(productId, { category_id: category_id })
    )

    return Promise.all(promises)
      .then(values => {
        dispatch(setCategorySuccess())
        dispatch(deselectAllProduct())
        dispatch(fetchProducts())
      })
      .catch(err => {
        console.log(err)
      })
  }
)

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ data }: any, { dispatch }) => {
    dispatch(requestUpdateProduct())

    return api.products
      .update(data.id, data)
      .then(({ status, json }) => {
        const product = fixProductData(json)
        dispatch(receiveUpdateProduct(product))
      })
      .catch(error => {
        dispatch(errorUpdateProduct(error))
      })
  }
)

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async ({ history }: any, { dispatch, getState }) => {
    const state: any = getState()

    const productDraft = {
      enabled: false,
      category_id: state.productCategories.selectedId,
    }

    try {
      const { json } = await api.products.create(productDraft)
      dispatch(successCreateProduct(json.id))
      history.push("/admin/product/" + json.id)
    } catch (error) {
      console.error(error)
    }
  }
)

const fixProductData = product => {
  const saleFrom = moment(product.date_sale_from)
  const saleTo = moment(product.date_sale_to)
  const stockExpected = moment(product.date_stock_expected)

  product.date_sale_from = saleFrom.isValid() ? saleFrom.toDate() : null
  product.date_sale_to = saleTo.isValid() ? saleTo.toDate() : null
  product.date_stock_expected = stockExpected.isValid()
    ? stockExpected.toDate()
    : null

  return product
}

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async ({ id }: any, { dispatch }) => {
    dispatch(requestProduct())

    return api.products
      .retrieve(id)
      .then(({ status, json }) => {
        const product = fixProductData(json)
        dispatch(receiveProduct(product))
      })
      .catch(error => {
        dispatch(receiveProductError(error))
      })
  }
)

export const fetchImages = createAsyncThunk(
  "products/fetchImages",
  async ({ productId }: any, { dispatch }) => {
    return api.products.images
      .list(productId)
      .then(({ status, json }) => {
        dispatch(receiveImages(json))
      })
      .catch(error => {})
  }
)

export const fetchOptions = createAsyncThunk(
  "products/fetchOptions",
  async ({ productId }: any, { dispatch }) => {
    return api.products.options
      .list(productId)
      .then(({ status, json }) => {
        dispatch(receiveOptions(json))
      })
      .catch(error => {})
  }
)

export const fetchVariants = createAsyncThunk(
  "products/fetchVariants",
  async ({ productId }: any, { dispatch }) => {
    return api.products.variants
      .list(productId)
      .then(({ status, json }) => {
        dispatch(receiveVariants(json))
      })
      .catch(error => {})
  }
)

export const createVariant = createAsyncThunk(
  "products/createVariant",
  async ({ productId }: any, { dispatch, getState }) => {
    const state: any = getState()
    const { regular_price, stock_quantity, weight } = state.products.editProduct
    const variant = {
      price: regular_price,
      stock_quantity: stock_quantity,
      weight: weight,
    }

    return api.products.variants
      .create(productId, variant)
      .then(({ status, json }) => {
        dispatch(receiveVariants(json))
      })
      .catch(error => {})
  }
)

export const updateVariant = createAsyncThunk(
  "products/updateVariant",
  async ({ productId, variantId, variant }: any, { dispatch }) => {
    try {
      const { json } = api.products.variants.update(
        productId,
        variantId,
        variant
      )
      dispatch(receiveVariants(json))
    } catch (error) {
      console.error(error)
    }
  }
)

export const setVariantOption = createAsyncThunk(
  "products/setVariantOption",
  async ({ productId, variantId, optionId, valueId }: any, { dispatch }) => {
    const option = { option_id: optionId, value_id: valueId }
    try {
      const { json } = await api.products.variants.setOption(
        productId,
        variantId,
        option
      )
      dispatch(receiveVariants(json))
    } catch (error) {
      console.error(error)
    }
  }
)

export const createOptionValue = createAsyncThunk(
  "products/createOptionValue",
  async ({ productId, optionId, valueName }: any, { dispatch }) => {
    return api.products.options.values
      .create(productId, optionId, { name: valueName })
      .then(({ status, json }) => {
        dispatch(fetchOptions(productId))
      })
      .catch(error => {})
  }
)

export const createOption = createAsyncThunk(
  "products/createOption",
  async ({ productId, option }: any, { dispatch }) => {
    try {
      const { json } = await api.products.options.create(productId, option)
      dispatch(receiveOptions(json))
    } catch (error) {
      console.error(error)
    }
  }
)

export const updateOptionValue = createAsyncThunk(
  "products/updateOptionValue",
  async ({ productId, optionId, valueId, valueName }: any, { dispatch }) => {
    return api.products.options.values
      .update(productId, optionId, valueId, { name: valueName })
      .then(({ status, json }) => {
        dispatch(fetchOptions(productId))
      })
      .catch(error => {})
  }
)

export const updateOption = createAsyncThunk(
  "products/updateOption",
  async ({ productId, optionId, option }: any, { dispatch }) => {
    return api.products.options
      .update(productId, optionId, option)
      .then(({ status, json }) => {
        dispatch(receiveOptions(json))
      })
      .catch(error => {})
  }
)

export const deleteOptionValue = createAsyncThunk(
  "products/deleteOptionValue",
  async ({ productId, optionId, valueId }: any, { dispatch }) => {
    return api.products.options.values
      .delete(productId, optionId, valueId)
      .then(({ status, json }) => {
        dispatch(fetchOptions(productId))
      })
      .catch(error => {})
  }
)

export const deleteOption = createAsyncThunk(
  "products/deleteOption",
  async ({ productId, optionId }: any, { dispatch }) => {
    return api.products.options
      .delete(productId, optionId)
      .then(({ status, json }) => {
        dispatch(receiveOptions(json))
      })
      .catch(error => {})
  }
)

export const deleteVariant = createAsyncThunk(
  "products/deleteVariant",
  async ({ productId, variantId }: any, { dispatch }) => {
    return api.products.variants
      .delete(productId, variantId)
      .then(({ status, json }) => {
        dispatch(receiveVariants(json))
      })
      .catch(error => {})
  }
)

export const deleteImage = createAsyncThunk(
  "products/deleteImage",
  async ({ productId, imageId }: any, { dispatch }) => {
    return api.products.images
      .delete(productId, imageId)
      .then(({ status, json }) => {
        dispatch(fetchImages(productId))
      })
      .catch(error => {})
  }
)

export const updateImage = createAsyncThunk(
  "products/updateImage",
  async ({ productId, image }: any, { dispatch }) => {
    return api.products.images
      .update(productId, image.id, image)
      .then(() => {
        dispatch(fetchImages(productId))
      })
      .catch(error => {})
  }
)

export const updateImages = createAsyncThunk(
  "products/updateImages",
  async ({ productId, images }: any, { dispatch }) => {
    let promises = images.map(image =>
      api.products.images.update(productId, image.id, image)
    )

    return Promise.all(promises)
      .then(() => {
        dispatch(fetchImages(productId))
      })
      .catch(error => {})
  }
)

export const uploadImages = createAsyncThunk(
  "products/uploadImages",
  async ({ productId, form }: any, { dispatch }) => {
    dispatch(imagesUploadStart())
    return api.products.images
      .upload(productId, form)
      .then(() => {
        dispatch(imagesUploadEnd())
        dispatch(fetchImages(productId))
      })
      .catch(error => {
        dispatch(imagesUploadEnd())
      })
  }
)

const productSlice = createSlice({
  name: "products",
  initialState: {
    editProductImages: null,
    editProductOptions: null,
    editProductVariants: null,
    editProduct: null,
    items: [],
    selected: [],
    hasMore: false,
    totalCount: 0,

    isUpdating: false,
    loadingItems: false,
    uploadingImages: false,

    errorFetchEdit: null,
    errorLoadingItems: null,
    errorUpdate: null,

    filter: {
      search: "",
      enabled: null,
      discontinued: false,
      onSale: null,
      stockStatus: null,
    },
  },
  reducers: {
    requestProduct(state) {
      return Object.assign({}, state, {})
    },
    receiveProduct(state, action: PayloadAction<any>) {
      state.editProduct = action.payload
    },
    cancelProductEdit(state) {
      state.isUpdating = false
      state.editProduct = null
      state.editProductImages = null
      state.editProductOptions = null
      state.editProductVariants = null
    },
    receiveProductError(state, action: PayloadAction<any>) {
      state.errorFetchEdit = action.payload
    },
    requestProducts(state) {
      state.loadingItems = true
    },
    receiveProducts(
      state,
      action: PayloadAction<{ has_more; total_count; data }>
    ) {
      state.loadingItems = false
      state.hasMore = action.payload.has_more
      state.totalCount = action.payload.total_count
      state.items = action.payload.data
    },
    receiveProductsError(state, action: PayloadAction<any>) {
      state.errorLoadingItems = action.payload
    },
    selectProduct(state, action: PayloadAction<any>) {
      state.selected = [...state.selected, action.payload]
    },
    deselectProduct(state, action: PayloadAction<any>) {
      state.selected = state.selected.filter(id => id !== action.payload)
    },
    deselectAllProduct(state) {
      state.selected = []
    },
    selectAllProduct(state) {
      const selected = state.items.map(item => item.id)
      state.selected = selected
    },
    setFilter(state, action: PayloadAction<any>) {
      const newFilter = Object.assign({}, state.filter, action.payload)
      state.filter = newFilter
    },
    requestMoreProducts(state) {
      state.loadingItems = true
    },
    receiveProductsMore(
      state,
      action: PayloadAction<{ has_more; total_count; data }>
    ) {
      state.loadingItems = false
      state.hasMore = action.payload.has_more
      state.totalCount = action.payload.total_count
      state.items = [...state.items, ...action.payload.data]
    },
    requestUpdateProduct(state) {
      state.isUpdating = true
    },
    receiveVariants(state, action: PayloadAction<any>) {
      state.editProductVariants = action.payload
    },
    receiveOptions(state, action: PayloadAction<any>) {
      state.editProductOptions = action.payload
    },
    receiveImages(state, action: PayloadAction<any>) {
      state.editProductImages = action.payload
    },
    errorUpdateProduct(state, action: PayloadAction<any>) {},
    receiveUpdateProduct(state, action: PayloadAction<any>) {
      state.isUpdating = false
      state.editProduct = action.payload
    },
    imagesUploadStart(state) {
      state.uploadingImages = true
    },
    imagesUploadEnd(state) {
      state.uploadingImages = false
    },
    setCategorySuccess() {},
    deleteProductsSuccess() {},
    successCreateProduct(state, action: PayloadAction<any>) {},
  },
  extraReducers: builder => {
    builder.addCase(importProducts.pending, () => {}),
      builder.addCase(fetchProducts.pending, () => {}),
      builder.addCase(fetchMoreProducts.pending, () => {}),
      builder.addCase(deleteCurrentProduct.pending, () => {}),
      builder.addCase(deleteProducts.pending, () => {}),
      builder.addCase(setCategory.pending, () => {}),
      builder.addCase(updateProduct.pending, () => {}),
      builder.addCase(createProduct.pending, () => {}),
      builder.addCase(fetchProduct.pending, () => {}),
      builder.addCase(fetchImages.pending, () => {}),
      builder.addCase(fetchOptions.pending, () => {}),
      builder.addCase(fetchVariants.pending, () => {}),
      builder.addCase(createVariant.pending, () => {}),
      builder.addCase(updateVariant.pending, () => {}),
      builder.addCase(setVariantOption.pending, () => {}),
      builder.addCase(createOptionValue.pending, () => {}),
      builder.addCase(createOption.pending, () => {}),
      builder.addCase(updateOptionValue.pending, () => {}),
      builder.addCase(updateOption.pending, () => {}),
      builder.addCase(deleteOptionValue.pending, () => {}),
      builder.addCase(deleteOption.pending, () => {}),
      builder.addCase(deleteVariant.pending, () => {}),
      builder.addCase(deleteImage.pending, () => {}),
      builder.addCase(updateImage.pending, () => {}),
      builder.addCase(updateImages.pending, () => {}),
      builder.addCase(uploadImages.pending, () => {})
  },
})

export const {
  requestProduct,
  receiveProduct,
  cancelProductEdit,
  receiveProductError,
  requestProducts,
  receiveProducts,
  receiveProductsError,
  selectProduct,
  deselectProduct,
  deselectAllProduct,
  selectAllProduct,
  setFilter,
  requestMoreProducts,
  receiveProductsMore,
  requestUpdateProduct,
  receiveVariants,
  receiveOptions,
  receiveImages,
  errorUpdateProduct,
  receiveUpdateProduct,
  imagesUploadStart,
  imagesUploadEnd,
  setCategorySuccess,
  deleteProductsSuccess,
  successCreateProduct,
} = productSlice.actions

export default productSlice.reducer
