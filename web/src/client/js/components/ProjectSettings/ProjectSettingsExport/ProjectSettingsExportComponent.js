import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { PATH_PROJECT } from 'Shared/constants'
import { ArrowIcon } from 'Components/Icons'

import Spinner from 'Components/Spinner/SpinnerComponent'

function documentLanguage(numberOfDocuments) {
  if (numberOfDocuments === 0) {
    return <p className="small">No documents to export</p>
  }
  return <p className="small">This export includes <b>{numberOfDocuments} documents</b></p>
}

const ProjectSettingsExportComponent = ({ loading, numberOfDocuments, project }) => {
  return (
    <section>
      <Link to={`${PATH_PROJECT}/${project.id}`} className="link link--back">
        <ArrowIcon direction="left" /> Back to project
      </Link>
      <h2>Export your project</h2>
      <p>Back up or move your data out of Portway with the click of a button.</p>
      <button className="btn" disabled={numberOfDocuments === 0}>
        {loading && <Spinner />}
        {!loading && <>Download {project.name}.zip</>}
      </button>
      {documentLanguage(numberOfDocuments)}
    </section>
  )
}

ProjectSettingsExportComponent.propTypes = {
  loading: PropTypes.bool,
  numberOfDocuments: PropTypes.number,
  project: PropTypes.object.isRequired,
}

export default ProjectSettingsExportComponent
