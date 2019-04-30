import Joi from 'joi'
import { validateParams } from '../libs/middleware/payloadValidation'
import BusinessProjectUser from '../businesstime/projectuser'
import RESOURCE_TYPES from '../constants/resourceTypes'
import ACTIONS from '../constants/actions'
import perms from '../libs/middleware/reqPermissionsMiddleware'

const readPerm = (req, res, next) => {
  const { userId } = req.params

  // only allow users to see their own project assignments for now
  if (userId === req.requestorInfo.requestorId) {
    return perms((req) => {
      return {
        resourceType: RESOURCE_TYPES.USER,
        action: ACTIONS.READ_MY
      }
    })(req, res, next)
  }

  res.status(403).send('Invalid Permissions')
}

const paramSchema = Joi.compile({
  userId: Joi.number().required()
})

const userProjectRolesController = function(router) {
  // all routes are nested at users/:userId/projectroles and receive req.params.userId
  router.get(
    '/',
    validateParams(paramSchema),
    readPerm,
    getUserProjectAssignments
  )
}

const getUserProjectAssignments = async function(req, res) {
  const { userId } = req.params
  const { orgId } = req.requestorInfo

  try {
    const userProjectRoles = await BusinessProjectUser.findAllProjectAssignmentsForUser(userId, orgId)
    res.status(200).json(userProjectRoles)
  } catch (e) {
    console.error(e.stack)
    res.status(e.code || 500).json({ error: 'Cannot fetch user project assignments' })
  }
}

export default userProjectRolesController