import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Constants from 'Shared/constants'
import { groupBy } from 'Shared/utilities'
import { uiConfirm } from 'Actions/ui'
import { deleteDocument, publishDocument, updateDocument } from 'Actions/document'
import { createField } from 'Actions/field'
import useDataService from 'Hooks/useDataService'
import currentResource from 'Libs/currentResource'

import DocumentComponent from './DocumentComponent'

const DocumentContainer = ({
  createField, deleteDocument, fields, history, loading, location, match, publishDocument, ui, updateDocument, uiConfirm }) => {
  const { data: document } = useDataService(currentResource('document', location.pathname), [
    location.pathname
  ])

  /**
   * If we're creating a document, render nothing
   */
  if (ui.documents.creating || match.params.documentId === 'new') {
    return null
  }

  /**
   * If there is no document and we are not creating: true, then we render
   * a helpful message
   */
  if (typeof match.params.documentId === 'undefined') {
    return <div className="document__no-document">No document</div>
  }

  /**
   * If we have fields, break them up by type for field names
   */
  let fieldsByType

  if (fields) {
    fieldsByType = groupBy(fields, 'type')
  } else {
    fieldsByType = {}
  }

  function fieldCreationHandler(fieldType) {
    const typeFieldsInDocument = fieldsByType[fieldType]
    const value = typeFieldsInDocument ? typeFieldsInDocument.length : 0
    const newName = Constants.FIELD_LABELS[fieldType] + (value + 1)
    createField(document.id, fieldType, {
      name: newName,
      type: fieldType
    })
  }

  /**
   * Otherwise we render the document, and update its values onChange
   */
  function nameChangeHandler(e) {
    if (e.target.value !== document.name) {
      updateDocument(document.projectId, document.id, {
        name: e.target.value
      })
    }
  }
  function publishDocumentHandler() {
    publishDocument(document.id)
  }
  function removeDocumentHandler() {
    const message = (
      <span> Delete the document <span className="highlight">{document.name}</span> and all of its fields?</span>
    )
    const confirmedLabel = `Yes, delete this document`
    const confirmedAction = () => { deleteDocument(document.projectId, document.id, history) }
    uiConfirm({ message, confirmedAction, confirmedLabel })
  }

  return <DocumentComponent
    document={document}
    fieldCreationHandler={fieldCreationHandler}
    isPublishing={ui.documents.isPublishing}
    nameChangeHandler={nameChangeHandler}
    publishDocumentHandler={publishDocumentHandler}
    removeDocumentHandler={removeDocumentHandler} />
}

DocumentContainer.propTypes = {
  createField: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  fields: PropTypes.object,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  publishDocument: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
  updateDocument: PropTypes.func.isRequired,
  uiConfirm: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    loading: state.documents.loading,
    fields: state.documentFields[state.documents.currentDocumentId]
  }
}

const mapDispatchToProps = {
  createField,
  deleteDocument,
  publishDocument,
  updateDocument,
  uiConfirm
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DocumentContainer)
)
