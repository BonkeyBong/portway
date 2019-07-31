import { ActionTypes } from '../actions'

const initialState = {
  confirmation: {
    confirming: false,
    message: '',
    cancelAction: null,
    confirmedAction: null,
    confirmedLabel: ''
  },
  document: {
    isFullScreen: false,
  },
  documents: {
    creating: false,
    isPublishing: false,
  },
  fields: {
    creating: false,
    type: -1
  },
  tokens: {
    creating: false
  },
  users: {
    creating: false,
    inviting: false
  },
  billing: {
    isSubmitting: false,
    isStripeOpen: false
  }
}

export const ui = (state = initialState, action) => {
  switch (action.type) {
    // Document and field creation
    // -------------------------------------------------------------------------
    case ActionTypes.UI_DOCUMENT_CREATE: {
      return { ...state, documents: { ...state.documents, creating: action.value } }
    }
    case ActionTypes.INITIATE_FIELD_CREATE: {
      // Tell everyone we're creating a field, and what type
      return { ...state, fields: { ...state.fields, creating: true, type: action.fieldType } }
    }
    case ActionTypes.RECEIVE_CREATED_FIELD: {
      // Reset fields when a field is created
      return { ...state, fields: initialState.fields }
    }
    case ActionTypes.RECEIVE_CREATED_DOCUMENT: {
      return { ...state, documents: { ...state.documents, creating: false } }
    }

    // Document full screen
    // -------------------------------------------------------------------------
    case ActionTypes.UI_DOCUMENT_FULL_SCREEN: {
      if (action.value) {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen()
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        }
      }
      return {
        ...state,
        document: {
          ...state.document,
          isFullScreen: action.value
        }
      }
    }

    // Document publishng
    // -------------------------------------------------------------------------
    case ActionTypes.INITIATE_DOCUMENT_PUBLISH: {
      return {
        ...state,
        documents: {
          ...state.documents,
          isPublishing: true
        }
      }
    }
    case ActionTypes.RECEIVE_PUBLISHED_DOCUMENT: {
      return {
        ...state,
        documents: {
          ...state.documents,
          isPublishing: false
        }
      }
    }

    // Confirmation dialog
    // -------------------------------------------------------------------------
    case ActionTypes.UI_INITIATE_CONFIRMATION: {
      return {
        ...state,
        confirmation: {
          ...state.confirmation,
          confirming: true,
          message: action.message,
          cancelAction: action.cancelAction,
          confirmedAction: action.confirmedAction,
          confirmedLabel: action.confirmedLabel
        }
      }
    }
    case ActionTypes.UI_COMPLETE_CONFIRMATION: {
      const confirmation = initialState.confirmation
      return {
        ...state,
        confirmation
      }
    }
    case ActionTypes.UI_CANCEL_CONFIRMATION: {
      return {
        ...state,
        confirmation: {
          ...state.confirmation,
          confirming: false
        }
      }
    }

    // Users
    // -------------------------------------------------------------------------
    case ActionTypes.UI_CREATE_USER_MODE: {
      return {
        ...state,
        users: {
          ...state.users,
          creating: action.value
        }
      }
    }

    case ActionTypes.RECEIVE_CREATED_USER: {
      return {
        ...state,
        users: {
          ...state.users,
          creating: false
        }
      }
    }

    // Reinviting user
    case ActionTypes.INITIATE_USER_REINVITE: {
      return { ...state, users: { ...state.users, inviting: true } }
    }

    case ActionTypes.RECEIVE_REINVITED_USER: {
      return { ...state, users: { ...state.users, inviting: false } }
    }

    // Project tokens
    // -------------------------------------------------------------------------
    case ActionTypes.UI_CREATE_TOKEN_MODE: {
      return {
        ...state,
        tokens: {
          ...state.tokens,
          creating: action.value
        }
      }
    }
    case ActionTypes.RECEIVE_CREATED_PROJECT_TOKEN: {
      return {
        ...state,
        tokens: {
          ...state.tokens,
          creating: false
        }
      }
    }

    // Billing / Stripe form
    // -------------------------------------------------------------------------
    // Disable the form for submission once submitting the form
    case ActionTypes.INITIATE_ORGANIZATION_BILLING_UPDATE: {
      return {
        ...state,
        billing: {
          ...state.billing,
          isSubmitting: true
        }
      }
    }
    // Close the Stripe form when we receive a successful round trip
    case ActionTypes.RECEIVE_UPDATED_ORGANIZATION_BILLING: {
      return {
        ...state,
        billing: {
          ...state.billing,
          isStripeOpen: false
        }
      }
    }
    // Toggle the Stripe form open and closed
    case ActionTypes.UI_TOGGLE_STRIPE_FORM: {
      return {
        ...state,
        billing: {
          ...state.billing,
          isStripeOpen: action.value
        }
      }
    }

    default:
      return { ...state }
  }
}
