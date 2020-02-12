import BusinessProject from '../businesstime/project'
import BusinessDocument from '../businesstime/document'
import BusinessField from '../businesstime/field'
import { copyContent, convertCDNUrlToS3Key, getKeyForDocumentAsset } from '../integrators/s3'
import { getProject, getProjectDocuments, getDocumentWithFields } from '../integrators/portway'
import { INTRO_PROJECT_ID } from '../constants/intro'
import PROJECT_ACCESS_LEVELS from '../constants/projectAccessLevels'
import { FIELD_TYPES } from '../constants/fieldTypes'

const READ_KEY = process.env.PORTWAY_INTRO_PROJECT_READ_KEY
const fieldPropsToCopy = ['type', 'value', 'order']

const copyIntroProjectToOrg = async (orgId) => {
  const project = getProject(INTRO_PROJECT_ID, READ_KEY)

  const newProject = await BusinessProject.create({
    orgId,
    name: project.name,
    accessLevel: PROJECT_ACCESS_LEVELS.READ
  })

  const docs = await getProjectDocuments(INTRO_PROJECT_ID, READ_KEY)

  Promise.all(docs.map(async (doc) => {
    const docWithFields = await getDocumentWithFields(doc.id, READ_KEY)
    const newDoc = await BusinessDocument.createForProject(newProject.id, {
      name: docWithFields.name,
      orgId
    })
    return Promise.all(docWithFields.fields.map(async (field) => {
      const body = fieldPropsToCopy.reduce((body, fieldProp) => {
        body[fieldProp] = field[fieldProp]
        return body
      }, {})
      if (body.type === FIELD_TYPES.IMAGE) {
        const key = convertCDNUrlToS3Key(field.value)
        const keyParts = key.split('/')
        const name = keyParts[keyParts.length - 1]
        // published assets are formatted as date-name, so remove date
        // processing is safe as split with no found character returns the full string
        const nameParts = name.split('-')
        const nameNoDate = nameParts[nameParts.length - 1]
        const newKey = getKeyForDocumentAsset(nameNoDate, newDoc.id, orgId)
        body.value = await copyContent(key, newKey)
      }
      return BusinessField.createForDocument(newDoc.id, body)
    }))
  }))

  console.log('docs')
}

export default {
  copyIntroProjectToOrg
}