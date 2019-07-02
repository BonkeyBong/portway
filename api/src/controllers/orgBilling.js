import Joi from 'joi'
import ono from 'ono'

import billingCoordinator from '../coordinators/billing'
import BusinessOrganization from '../businesstime/organization'
import { validateBody, validateParams } from '../libs/middleware/payloadValidation'
import perms from '../libs/middleware/reqPermissionsMiddleware'
import RESOURCE_TYPES from '../constants/resourceTypes'
import ACTIONS from '../constants/actions'

const bodySchema = Joi.compile({
  token: Joi.string().required()
})

const paramSchema = Joi.compile({
  orgId: Joi.number().required()
})

const readPerm = perms((req) => {
  return {
    resourceType: RESOURCE_TYPES.ORG_BILLING,
    action: ACTIONS.READ_MY
  }
})

const conditionalReadPerm = (req, res, next) => {
  const { orgId } = req.params

  // make sure requestor is reading their own organization
  if (orgId !== req.requestorInfo.orgId) {
    return next(ono({ code: 404 }, 'Cannot fetch billing, requestor does not belong to the target organization '))
  }

  return perms((req) => {
    return {
      resourceType: RESOURCE_TYPES.ORGANIZATION,
      action: ACTIONS.READ_MY_BILLING
    }
  })(req, res, next)
}

const conditionalUpdatePerm = async (req, res, next) => {
  const { orgId } = req.params

  // make sure requestor is updating their own organization
  if (orgId !== req.requestorInfo.orgId) {
    return next(ono({ code: 404 }, 'Cannot update billing, requestor does not belong to the target organization '))
  }

  // look up the organization and make sure the ruquestor is the current owner
  const org = await BusinessOrganization.findSanitizedById(orgId)

  if (org.ownerId !== req.requestorInfo.requestorId) {
    return next(ono({ code: 404 }, 'Cannot update billing, requestor is not the current organization owner'))
  }

  return perms((req) => {
    return {
      resourceType: RESOURCE_TYPES.ORGANIZATION,
      action: ACTIONS.UPDATE_MY_BILLING
    }
  })(req, res, next)
}

const orgBillingController = function(router) {
  // all routes are nested at organizations/:orgId and receive req.params.orgId
  router.get('/',
    getOrgBilling
  )
  router.put('/',
    validateParams(paramSchema),
    validateBody(bodySchema),
    conditionalUpdatePerm,
    updateOrgBilling
  )
}

const getOrgBilling = async function(req, res, next) {
  const { orgId } = req.params

  try {
    const billing = await billingCoordinator.getOrgBilling(orgId)
    res.status(200).send(billing)
  } catch (e) {
    next(e)
  }
}

const updateOrgBilling = async function(req, res, next) {
  const { token } = req.body
  const { orgId } = req.params

  try {
    const billing = await billingCoordinator.updateOrgBilling(token, orgId)
    res.status(200).send({ data: billing })
  } catch (e) {
    next(e)
  }
}

export default orgBillingController
