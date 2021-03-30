
import FieldCoordinator from './field'
import BusinessDocument from '../businesstime/document'
import BusinessField from '../businesstime/field'
import BusinessDocumentVersion from '../businesstime/documentversion'
import { slugify } from '../libs/utils'

const addProjectDocument = async (projectId, body) => {
  body.slug = slugify(body.name)
  return await BusinessDocument.createForProject(projectId, body)
}

/**
 * Removes a document and all associated resources
 *
 * @param {Integer} docId
 * @param {Integer} projectId
 * @param {Integer} orgId
 * @param {Object} options optional options
 *
 * options = {
 *   // Whether to set updatedAt on the parent project and document
 *   markUpdated: true/false
 * }
 */
const deleteDocument = async (docId, projectId, orgId, options = {
  markUpdated: true
}) => {

  const fieldOptions = {
    deletePublished: true,
    markUpdated: options.markUpdated
  }

  // Delete document fields
  const fields = await BusinessField.findAllForDocument(docId, orgId)
  for (const field of fields) {
    await FieldCoordinator.removeDocumentField(field.id, docId, orgId, fieldOptions)
  }
  // Delete document versions
  await BusinessDocumentVersion.deleteAllForDocument(docId, orgId)
  // Delete document
  await BusinessDocument.deleteByIdForProject(docId, projectId, orgId, options)
}

const deleteAllForProject = async (projectId, orgId) => {
  // Do not update parent resource (project, document) with updatedAt since we're deleting the project
  const options = { markUpdated: false }

  const docs = await BusinessDocument.findAllForProject(projectId, orgId)
  await Promise.all(docs.map((doc) => {
    return documentCoordinator.deleteDocument(doc.id, projectId, orgId, options)
  }))
}

const duplicateDocument = async (documentId, projectId, orgId) => {
  // duplicate the document
  const dupDoc = await BusinessDocument.duplicateById(documentId, orgId)
  console.log(dupDoc)
  // fetch the fields
  const fields = await BusinessField.findAllDraftForDocument(documentId, orgId)
  // loop through fields and create the duplicates
  // await Promise.all(fields.map((field) => {
  //   return BusinessField.duplicateById(field.id, dupDoc.id, orgId)
  // }))

  return BusinessDocument.findByIdWithFields(dupDoc.id, orgId)
}

const documentCoordinator = {
  addProjectDocument,
  deleteDocument,
  deleteAllForProject,
  duplicateDocument
}

export default documentCoordinator