import { ActionTypes } from '../actions'
import { QUERY_PARAMS } from 'Shared/constants'

const initialState = {
  sortBy: 'createdAt',
  sortMethod: QUERY_PARAMS.DESCENDING,
  projectsById: {},
  projectIdsByPage: { 1: [] },
  totalPages: null,
  loading: {
    byPage: {},
    byId: {}
  }
}

export const projects = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_PROJECTS: {
      return { ...state, loading: { ...state.loading, list: true } }
    }
    case ActionTypes.RECEIVE_PROJECTS: {
      const projectsById = action.data.reduce((projectsById, project) => {
        projectsById[project.id] = project
        return projectsById
      }, {})

      const projectIds = action.data.map(project => project.id)
      const loadingByPage = { ...state.loading.byPage, [action.page]: false }

      const loadingById = action.data.reduce((loadingById, project) => {
        loadingById[project.id] = false
        return loadingById
      }, {})

      return {
        ...state,
        projectsById: { ...state.projectsById, ...projectsById },
        loading: {
          ...state.loading,
          byPage: loadingByPage,
          byId: { ...state.loading.byId, ...loadingById }
        },
        projectIdsByPage: { ...state.projectIdsByPage, [action.page]: projectIds },
        totalPages: action.totalPages
      }
    }

    case ActionTypes.REQUEST_PROJECT: {
      const loadingById = { ...state.loading.byId, [action.id]: false }
      return {
        ...state,
        currentProjectId: action.id,
        loading: { ...state.loading, byId: loadingById }
      }
    }
    case ActionTypes.RECEIVE_PROJECT: {
      const id = action.data.id
      const projectsById = { ...state.projectsById, [id]: action.data }
      const loadingById = { ...state.loading.byId, [id]: false }
      return { ...state, projectsById, loading: { ...state.loading, byId: loadingById } }
    }
    case ActionTypes.RECEIVE_PROJECT_ERROR: {
      const id = action.projectId
      const loadingById = { ...state.loading.byId, [id]: false }
      return { ...state, loading: { ...state.loading, byId: loadingById } }
    }
    case ActionTypes.CREATE_PROJECT: {
      return { ...state, loading: { ...state.loading, list: true } }
    }
    case ActionTypes.RECEIVE_CREATED_PROJECT: {
      const id = action.data.id
      const projectsById = { ...state.projectsById, [id]: action.data }
      return { ...state, projectsById, loading: { ...state.loading, list: false } }
    }
    case ActionTypes.INITIATE_PROJECT_UPDATE: {
      const id = action.id
      const loadingById = { ...state.loading.byId, [id]: true }
      return { ...state, loading: { ...state.loading, byId: loadingById } }
    }
    case ActionTypes.RECEIVE_UPDATED_PROJECT: {
      const id = action.data.id
      const projectsById = { ...state.projectsById, [id]: action.data }
      const loadingById = { ...state.loading.byId, [id]: false }
      return { ...state, projectsById, loading: { ...state.loading, byId: loadingById } }
    }
    case ActionTypes.INITIATE_PROJECT_REMOVE: {
      return { ...state, loading: { ...state.loading, list: true } }
    }
    case ActionTypes.REMOVE_PROJECT: {
      const id = action.id
      const projectIdsByPage = { ...state.projectIdsByPage }
      const totalPages = state.totalPages
      let n = 1
      console.log(n, totalPages)
      // Find the project ID among the pages loaded and remove it
      while (n <= totalPages) {
        const pageArray = projectIdsByPage[n]
        const idIndex = pageArray.indexOf(id)
        console.log(pageArray, idIndex)
        if (idIndex !== -1) {
          console.log('Remove', pageArray[idIndex])
          pageArray.splice(idIndex, 1)
          break
        }
        n++
      }
      console.log(projectIdsByPage)
      // eslint-disable-next-line no-unused-vars
      const { [id]: __, ...projectsById } = state.projectsById
      return { ...state, projectsById, projectIdsByPage, loading: { ...state.loading, list: false } }
    }
    case ActionTypes.SORT_PROJECTS: {
      if (action.sortBy !== state.sortBy || action.sortMethod !== state.sortMethod) {
        return {
          ...state,
          projectIdsByPage: {},
          totalPages: null,
          sortBy: action.sortBy,
          sortMethod: action.sortMethod,
          loading: { ...state.loading, byPage: {} }
        }
      }
      return state
    }
    default:
      return state
  }
}
