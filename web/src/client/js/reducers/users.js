import { ActionTypes } from '../actions'

const initialState = {
  usersById: {},
  loading: {
    list: null,
    byId: {}
  }
}

export const users = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_USERS: {
      return { ...state, loading: { ...state.loading, list: true } }
    }
    case ActionTypes.RECEIVE_USERS: {
      const usersById = action.data.reduce((usersById, user) => {
        usersById[user.id] = user
        return usersById
      }, {})
      return { ...state, usersById, loading: { ...state.loading, list: false } }
    }
    case ActionTypes.REQUEST_USER: {
      const loadingById = { ...state.loading.byId, [action.userId]: true }
      return {
        ...state,
        loading: { ...state.loading, byId: loadingById }
      }
    }
    case ActionTypes.RECEIVE_USER: {
      const id = action.data.id
      const usersById = { ...state.usersById, [id]: action.data }
      const loadingById = { ...state.loading.byId, [id]: false }
      return { ...state, usersById, loading: { ...state.loading, byId: loadingById } }
    }
    case ActionTypes.RECEIVE_CREATED_USER: {
      const id = action.data.id
      const byId = { ...state.loading.byId, [id]: false }
      const usersById = { ...state.usersById, [id]: action.data }
      return { ...state, usersById, loading: { ...state.loading, byId } }
    }
    case ActionTypes.INITIATE_USER_UPDATE: {
      const id = action.userId
      const byId = { ...state.loading.byId, [id]: true }
      return { ...state, loading: { ...state.loading, byId: byId, list: true } }
    }
    case ActionTypes.RECEIVE_UPDATED_USER: {
      const id = action.data.id
      const usersById = { ...state.usersById, [id]: action.data }
      const byId = { ...state.loading.byId, [id]: false }
      return { ...state, usersById, loading: { ...state.loading, byId: byId, list: false } }
    }
    case ActionTypes.RECEIVE_UPDATED_ROLE: {
      const { userId, orgRoleId } = action
      const userObj = { ...state.usersById[userId], orgRoleId }
      const byId = { ...state.loading.byId, [userId]: false }
      //userObj.orgRoleId = orgRoleId
      return {
        ...state,
        usersById: { ...state.usersById, [userId]: userObj },
        loading: { ...state.loading, byId: byId, list: false }
      }
    }
    default: {
      return state
    }
  }
}
