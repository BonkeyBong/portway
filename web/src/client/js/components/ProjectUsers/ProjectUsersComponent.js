import React from 'react'
import PropTypes from 'prop-types'

import ProjectUsersCollapsedItem from './ProjectUsersCollapsedItem'

import './_ProjectUsers.scss'

const ProjectUsersComponent = ({ collapsed, users }) => {
  const userColors = ['#51a37d', '#3f8a67', '#dcede5', '#f8963a', '#6ba5f2', '#6095da', '#d2e0f2']
  const collapsedUsers = users.slice(0, 2)
  const collapsedDiff = users.length - collapsedUsers.length

  function getUserColor() {
    // 7 is userColors
    return userColors[Math.floor(Math.random() * Math.floor(7))]
  }

  // Show 3 users at first
  function renderCollapsedUsers() {
    return collapsedUsers.map((user, index) => {
      return <ProjectUsersCollapsedItem color={getUserColor()} user={user} key={`${user.id}-${index}`} />
    })
  }

  return (
    <div className="project-users">
      {collapsed &&
      <ul className="project-users__collapsed-list">
        {renderCollapsedUsers()}
        {collapsedDiff > 0 &&
        <li className="project-users__collapsed-item" title={`${collapsedDiff} more...`}>...</li>
        }
      </ul>
      }
    </div>
  )
}

ProjectUsersComponent.propTypes = {
  collapsed: PropTypes.bool,
  users: PropTypes.array.isRequired
}

ProjectUsersComponent.defaultProps = {
  users: []
}

export default ProjectUsersComponent
