import { getDb } from '../db/dbConnector'
import ono from 'ono'
import GLOBAL_PUBLIC_FIELDS from '../constants/globalPublicFields'

const MODEL_NAME = 'User'
const PUBLIC_FIELDS = [...GLOBAL_PUBLIC_FIELDS, 'firstName', 'lastName', 'email', 'orgId']

async function findByEmail(email) {
  const db = getDb()
  const user = await db.model(MODEL_NAME).findOne({ where: { email } })
  return user && user.get({ plain: true })
}

async function updateByEmail(email, body) {
  const db = getDb()
  const user = await db.model(MODEL_NAME).findOne({ where: { email } })
  if (!user) throw ono({ code: 404 }, `Cannot update, user not found with email: ${email}`)
  const updatedUser = await user.update(body)
  return updatedUser && updatedUser.get({ plain: true })
}

// TODO convert to find all users within organization
async function findAllSanitized(orgId) {
  const db = getDb()
  return await db.model(MODEL_NAME).findAll({
    attributes: PUBLIC_FIELDS,
    where: { orgId },
    raw: true
  })
}

async function findSanitizedById(id, orgId) {
  const db = getDb()
  return await db.model(MODEL_NAME).findOne({ attributes: PUBLIC_FIELDS, where: { id, orgId }, raw: true })
}

export default {
  findByEmail,
  findAllSanitized,
  findSanitizedById,
  updateByEmail
}
