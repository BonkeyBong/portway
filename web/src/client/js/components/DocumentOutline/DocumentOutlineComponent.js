import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import DocumentOutlineItem from './DocumentOutlineItem'
import './_DocumentOutline.scss'

const DocumentOutlineComponent = ({
  dragEndHandler,
  dragEnterHandler,
  dragLeaveHandler,
  dragStartHandler,
  dropHandler,
  fields,
  fieldsUpdating,
  fieldDestroyHandler,
  fieldRenameHandler,
  toggleDocumentModeHandler
}) => {
  const outlineRef = useRef()
  useEffect(() => {
    const outlineCopy = outlineRef.current
    if (outlineCopy) {
      outlineCopy.classList.add('document-outline--active')
    }
    return () => {
      outlineCopy.classList.remove('document-outline--active')
    }
  })
  return (
    <div className="document-outline" ref={outlineRef}>
      <header className="document-outline__header">
        <h2 className="document-outline__title">Document outline</h2>
        <p className="document-outline__description note">Drag and drop to reorder your document, or remove fields altogether</p>
      </header>
      <ol className="document-outline__list">
        {fields.map((field, index) => {
          return (
            <DocumentOutlineItem
              dragEndHandler={dragEndHandler}
              dragEnterHandler={dragEnterHandler}
              dragLeaveHandler={dragLeaveHandler}
              dragStartHandler={dragStartHandler}
              dropHandler={dropHandler}
              field={field}
              index={index}
              isUpdating={fieldsUpdating[field.id]}
              key={field.id}
              onDestroy={() => { fieldDestroyHandler(field.id, field.type) }}
              onRename={fieldRenameHandler}
            />
          )
        })}
      </ol>
      <div className="document-outline__button">
        <button className="btn" onClick={toggleDocumentModeHandler}>Save changes</button>
      </div>
    </div>
  )
}

DocumentOutlineComponent.propTypes = {
  dragEndHandler: PropTypes.func.isRequired,
  dragEnterHandler: PropTypes.func.isRequired,
  dragLeaveHandler: PropTypes.func.isRequired,
  dragStartHandler: PropTypes.func.isRequired,
  dropHandler: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired,
  fieldsUpdating: PropTypes.object,
  fieldDestroyHandler: PropTypes.func.isRequired,
  fieldRenameHandler: PropTypes.func.isRequired,
  toggleDocumentModeHandler: PropTypes.func.isRequired,
}

export default DocumentOutlineComponent
