import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Constants from 'Shared/constants'
import { groupBy } from 'Shared/utilities'
import { uiConfirm } from 'Actions/ui'
import { updateDocument, deleteDocument } from 'Actions/document'
import { createField } from 'Actions/field'
import useDataService from 'Hooks/useDataService'
import dataMapper from 'Libs/dataMapper'
import currentResource from 'Libs/currentResource'

import DocumentComponent from './DocumentComponent'

const DocumentContainer = ({
  createField, deleteDocument, history, loading, location, match, ui, updateDocument, uiConfirm }) => {
  const { data: document } = useDataService(currentResource('document', location.pathname), [
    location.pathname
  ])
  const { data: fields } = useDataService(dataMapper.fields.list(match.params.documentId), [match.params.documentId])

  /**
   * If we're creating a document, render nothing
   */
  if (ui.documents.creating) {
    return null
  }

  /**
   * If there is no document and we are not creating: true, then we render
   * a helpful message
   */
  if (typeof match.params.documentId === 'undefined') {
    return <div>No document</div>
  }

  /**
   * If we have fields, break them up by type for field names
   */
  let fieldsByType
  if (fields) {
    fieldsByType = groupBy(fields, 'type')
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
    nameChangeHandler={nameChangeHandler}
    removeDocumentHandler={removeDocumentHandler} />
}

DocumentContainer.propTypes = {
  createField: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  updateDocument: PropTypes.func.isRequired,
  uiConfirm: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    loading: state.documents.loading
  }
}

const mapDispatchToProps = {
  createField,
  deleteDocument,
  updateDocument,
  uiConfirm
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DocumentContainer)
)
