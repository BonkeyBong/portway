import React from 'react'
import DocumentsListContainer from 'Components/DocumentsList/DocumentsListContainer'
import DocumentContainer from 'Components/Document/DocumentContainer'

const Project = () => {
  return (
    <main className="project">
      <div className="project__documents">
        <div className="project__documents-list-container">
          <DocumentsListContainer />
        </div>
        <div className="project__documents-document-container">
          <DocumentContainer />
        </div>
      </div>
    </main>
  )
}

export default Project
