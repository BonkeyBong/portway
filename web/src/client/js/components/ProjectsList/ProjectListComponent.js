import React, { useState, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'

import useClickOutside from 'Hooks/useClickOutside'
import ProjectsListItem from './ProjectsListItem'
import './ProjectList.scss'

function ProjectsListComponent({ projects }) {
  const [activeProjectId, setActiveProjectId] = useState(null)

  const nodeRef = useRef()
  const collapseCallback = useCallback(() => {
    setActiveProjectId(null)
  }, [])
  useClickOutside(nodeRef, collapseCallback)

  function projectToggleHandler(itemRef) {
    if (itemRef === null) {
      setActiveProjectId(null)
      return false
    }
    setActiveProjectId(itemRef.current.getAttribute('data-projectid'))
  }

  const projectList = Object.keys(projects).map((projectId) => {
    return <ProjectsListItem
      activeProjectId={activeProjectId}
      animate={true}
      callback={projectToggleHandler}
      key={projectId}
      projectId={projectId}
      project={projects[projectId]} />
  })

  return (
    <ol className="project-list" ref={nodeRef}>{projectList}</ol>
  )
}

ProjectsListComponent.propTypes = {
  projects: PropTypes.object.isRequired
}

export default ProjectsListComponent
