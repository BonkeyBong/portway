import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'

import { documents } from './documents'
import { documentFields } from './documentFields'
import { formErrors } from './formErrors'
import { notifications } from './notifications'
import { projects } from './projects'
import { projectAssignments } from './projectAssignments'
import { projectTokens } from './projectTokens'
import { ui } from './ui'
import { users } from './users'
import { userAssignments } from './userAssignments'

const rootReducer = combineReducers({
  documents,
  documentFields,
  formErrors,
  notifications,
  projects,
  projectAssignments,
  projectTokens,
  ui,
  users,
  userAssignments,
})

const middlewares = [thunk]
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)))

export default store
