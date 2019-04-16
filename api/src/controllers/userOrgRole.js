import Joi from 'joi'
import { validateBody, validateParams } from '../libs/middleware/payloadValidation'
import BusinessUser from '../businesstime/user'
import RESOURCE_TYPES from '../constants/resourceTypes'
import ACTIONS from '../constants/actions'
import perms from '../libs/middleware/reqPermissionsMiddleware'

const checkUpdatePerms = perms((req) => {
  return {
    resourceType: RESOURCE_TYPES.USER,
    action: ACTIONS.UPDATE_ORG_ROLE
  }
})

const bodySchema = Joi.compile({
  orgRoleId: Joi.number().required()
})

const paramSchema = Joi.compile({
  userId: Joi.number().required()
})

const userOrgRoleController = function(router) {
  // all routes are nested at users/:userId/orgrole and receive req.params.userId
  router.put(
    '/',
    checkUpdatePerms,
    validateParams(paramSchema),
    validateBody(bodySchema),
    updateUserOrgRole
  )
}

const updateUserOrgRole = async function(req, res) {
  const { orgRoleId } = req.body
  const { userId } = req.params
  const { orgId } = req.requestorInfo

  try {
    await BusinessUser.updateOrgRole(userId, orgRoleId, orgId)
    res.status(204).json()
  } catch (e) {
    console.error(e.stack)
    res.status(e.code || 500).json({ error: 'Cannot update user organization role' })
  }
}

export default userOrgRoleController
