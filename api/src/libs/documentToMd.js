import { FIELD_TYPES, FIELD_TYPE_MODELS } from "../constants/fieldTypes"
import url from "url"

const documentToMd = function(document) {
  const frontMatter = getDocumentFrontmatter(document)
  const content = getDocumentContent(document)
  return frontMatter + content
}

const getDocumentFrontmatter = function(document) {
  const fieldFrontmatter = document.fields.reduce((cur, field) => {
    if (field.type === FIELD_TYPES.TEXT) return cur
    return cur + `${field.name}: ${getFieldValueByType(field, document.id)}\n`
  }, '')

  return `---\ntitle: ${document.name}` +
  `\n${fieldFrontmatter}` +
  `---\n`
}

const getDocumentContent = function(document) {
  return document.fields.reduce((cur, field) => {
    if (field.type === FIELD_TYPES.TEXT) {
      const fieldValue = field.value ? field.value : ''
      return cur + `${fieldValue}\n\n`
    }
    return cur
  }, '')
}

const getFieldValueByType = function(field, documentId) {
  switch (field.type) {
    case FIELD_TYPES.IMAGE:
    case FIELD_TYPES.FILE:
      const parsedUrl = url.parse(field.value)
      const filename = parsedUrl.path.split('/')[4]
      return `./${documentId}/${filename}`
    case FIELD_TYPES.DATE:
      return field.value.toISOString()
    default:
      return field.value
  }
}

export default documentToMd
