import { UI } from './index'

/**
 * Document and Field system
 */
export const uiDocumentCreate = (value) => {
  return async (dispatch) => {
    dispatch(UI.documentCreate(value))
  }
}
export const uiFieldModeChange = (mode) => {
  return async (dispatch) => {
    dispatch(UI.fieldModeSet(mode))
  }
}
export const uiFieldCreate = (fieldType) => {
  return async (dispatch) => {
    dispatch(UI.fieldCreate(fieldType))
  }
}

/**
 * Confirmation system
 */
export const uiConfirm = ({ message, cancelAction, confirmedAction, confirmedLabel }) => {
  return async (dispatch) => {
    dispatch(UI.initiateConfirm(message, cancelAction, confirmedAction, confirmedLabel))
  }
}
export const uiConfirmCancel = () => {
  return async (dispatch) => {
    dispatch(UI.cancelConfirm())
  }
}
export const uiConfirmComplete = () => {
  return async (dispatch) => {
    dispatch(UI.completeConfirm())
  }
}
