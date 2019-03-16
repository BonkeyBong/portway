import React from 'react'
import { Link } from 'react-router-dom'

import Constants from 'Shared/constants'
import HeaderContainer from 'Components/Header/HeaderContainer'
import ProjectsListContainer from 'Components/ProjectsList/ProjectsListContainer'

class DashboardSection extends React.PureComponent {
  render() {
    return (
      <>
        <HeaderContainer />
        <div role="main">
          <div className="section">
            <h1>FIRST NAME’s Projects</h1>
            <ProjectsListContainer />
            <Link to={Constants.PATH_PROJECTS} className="btn btn--blank">
              See all projects...
            </Link>
          </div>
        </div>
      </>
    )
  }
}

export default DashboardSection
