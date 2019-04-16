import { ActionTypes } from '../actions'

const initialState = {
  // nested at { [documentId]: { [fieldId]: {} } }
  documentFieldsById: {},
  loading: {
    byId: {},
    byDocument: {}
  }
}

export const documentFields = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_FIELDS: {
      const { documentId } = action
      const byDocument = { ...state.loading.byDocument, [documentId]: true }
      return { ...state, loading: { ...state.loading, byDocument } }
    }
    case ActionTypes.RECEIVE_FIELDS: {
      const documentId = action.documentId
      const byDocument = { ...state.loading.byDocument, [documentId]: false }
      const documentFieldsObject = action.data.reduce((object, doc) => {
        object[doc.id] = doc
        return object
      }, {})
      const documentFieldsById = { ...state.documentFieldsById, [documentId]: documentFieldsObject }
      return { ...state, documentFieldsById, loading: { ...state.loading, byDocument } }
    }
    case ActionTypes.RECEIVE_CREATED_FIELD: {
      const { id, docId } = action.data
      const documentFields = state.documentFieldsById[docId] || {}
      const documentFieldsById = {
        ...state.documentFieldsById,
        [docId]: { ...documentFields, [id]: action.data }
      }
      return { ...state, documentFieldsById }
    }
    case ActionTypes.INITIATE_FIELD_UPDATE: {
      const { fieldId } = action
      const loadingById = { ...state.loading.byId, [fieldId]: true }
      return { ...state, loading: { ...state.loading, byId: loadingById } }
    }
    case ActionTypes.RECEIVE_UPDATED_FIELD: {
      const { id, docId } = action.data
      const documentFields = state.documentFieldsById[docId] || {}
      const documentFieldsById = {
        ...state.documentFieldsById,
        [docId]: { ...documentFields, [id]: action.data }
      }
      const loadingById = { ...state.loading.byId, [id]: false }
      return { ...state, documentFieldsById, loading: { ...state.loading, byId: loadingById } }
    }
    case ActionTypes.INITIATE_FIELD_REMOVE: {
      const { id } = action
      const loadingById = { ...state.loading.byId, [id]: true }
      return { ...state, loading: { ...state.loading, byId: loadingById } }
    }
    case ActionTypes.REMOVE_FIELD: {
      const { id, docId } = action
      const { documentFields } = state.documentFieldsById[docId] || {}
      // eslint-disable-next-line no-unused-vars
      const { [id]: __, ...restDocumentFields } = documentFields
      const loadingById = { ...state.loading.byId, [id]: false }
      return { ...state, restDocumentFields, loading: { ...state.loading, byId: loadingById } }
    }
    default:
      return state
  }
}
