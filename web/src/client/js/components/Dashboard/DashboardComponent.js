import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import { ORGANIZATION_ROLE_IDS, ORGANIZATION_SETTINGS, PATH_PROJECT_CREATE } from 'Shared/constants'
import { AddIcon } from 'Components/Icons'
import { currentUserId } from 'Libs/currentIds'

import OrgPermission from 'Components/Permission/OrgPermission'
import DashboardProjectsEmptyState from './DashboardProjectsEmptyState'
import ProjectListComponent from 'Components/ProjectsList/ProjectListComponent'
import { ToggleButton } from 'Components/Buttons'

import './_Dashboard.scss'

const DashboardComponent = ({ deleteHandler, loading, projects, specialProject, showTeams }) => {
  const [showMyProjects, toggleMyProjects] = useState(false)
  const history = useHistory()
  const objectKeys = Object.keys(projects)
  const hasProjects = objectKeys.length > 0
  const { myProjects, notMyProjects } = objectKeys.reduce((cur, key) => {
    if (projects[key].createdBy === currentUserId) {
      cur.myProjects[key] = projects[key]
    } else {
      cur.notMyProjects[key] = projects[key]
    }
    return cur
  }, { myProjects: {}, notMyProjects: {} })
  const notMyProjectsLength = Object.keys(notMyProjects).length

  return (
    <div className="dashboard">
      <div className="dashboard__projects">
        <div className="dashboard__toolbar">
          <OrgPermission
            acceptedRoleIds={[ORGANIZATION_ROLE_IDS.OWNER, ORGANIZATION_ROLE_IDS.ADMIN]}
            acceptedSettings={[ORGANIZATION_SETTINGS.ALLOW_USER_PROJECT_CREATION]}>
            <button
              aria-label="Create a new project"
              className="btn btn--blank btn--with-circular-icon"
              onClick={() => history.push({ pathname: PATH_PROJECT_CREATE })}
            >
              <AddIcon width="12" height="12" />
              <span className="label">New project</span>
            </button>
          </OrgPermission>
          <ToggleButton
            checked={showMyProjects}
            label="Filter projects"
            onClick={(checked) => { toggleMyProjects(checked) }}
            options={['All', 'Mine only']}
          />
        </div>
        {!loading && (hasProjects || specialProject) &&
          <>
            <ProjectListComponent
              history={history}
              deleteHandler={deleteHandler}
              projects={showMyProjects ? myProjects : projects}
              showTeams={showTeams}
              specialProject={specialProject}
            />
            {showMyProjects && notMyProjectsLength > 0 &&
            <div className="dashboard__footer">
              <button
                className="btn btn--like-a-link"
                onClick={() => { toggleMyProjects(false) }}
              >
                Hiding {notMyProjectsLength} {notMyProjectsLength > 1 ? 'projects' : 'project'}...
              </button>
            </div>
            }
          </>
        }
        {!loading && !hasProjects && !specialProject &&
          <DashboardProjectsEmptyState />
        }
      </div>
      <div className="dashboard__sidebar">
      </div>
    </div>
  )
}

DashboardComponent.propTypes = {
  deleteHandler: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  projects: PropTypes.object.isRequired,
  showTeams: PropTypes.bool.isRequired,
  specialProject: PropTypes.object,
}

export default DashboardComponent
