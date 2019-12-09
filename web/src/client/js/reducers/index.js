import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'

import { documentFields } from './documentFields'
import { documents } from './documents'
import { forms } from './forms'
import { notifications } from './notifications'
import { organizations } from './organizations'
import { projectAssignments } from './projectAssignments'
import { projects } from './projects'
import { projectTokens } from './projectTokens'
import { projectUsers } from './projectUsers'
import { search } from './search'
import { ui } from './ui'
import { userAssignments } from './userAssignments'
import { userProjects } from './userProjects'
import { users } from './users'
import { validation } from './validation'

const rootReducer = combineReducers({
  documentFields,
  documents,
  forms,
  notifications,
  organizations,
  projectAssignments,
  projects,
  projectTokens,
  projectUsers,
  search,
  ui,
  userAssignments,
  userProjects,
  users,
  validation,
})

const middlewares = [thunk]
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)))

export default store
