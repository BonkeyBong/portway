import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, Link, withRouter } from 'react-router-dom'

import Constants from 'Shared/constants'
import Navigator from 'Components/Navigator/NavigatorContainer'
import GlobalSearchContainer from 'Components/GlobalSearch/GlobalSearchContainer'
import UserMenu from 'Components/UserMenu/UserMenu'

import './Header.scss'

const brand = {
  logo: Constants.PRODUCT_LOGO,
  name: Constants.PRODUCT_NAME,
  default: true // if this is our branding
}

const renderBrandLogo = (logo) => {
  return {
    background: `url('${logo}') no-repeat 50% 50%`
  }
}

const renderProjectsItems = () => {
  return (
    <div className="navbar__content-items">
      <Link to={Constants.PATH_PROJECT_CREATE} className="btn btn--blank btn--with-circular-icon">
        <span className="icon icon-add" />
        New Project
      </Link>
    </div>
  )
}

const Header = ({ location }) => {
  const section = location.pathname.split('/')[1]
  return (
    <header className="masthead" role="banner">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar__brand">
          <Link to={Constants.PATH_PROJECTS}>
            <span className="navbar__logo" style={renderBrandLogo(brand.logo)} />
          </Link>
        </div>
        <div className="navbar__content">
          {`/${section}` === Constants.PATH_DASHBOARD && (
            <h1 className={`navbar-brand-name${brand.default ? ' default' : ''}`}>
              <NavLink to={Constants.PATH_DASHBOARD}>{Constants.PRODUCT_NAME}</NavLink>
            </h1>
          )}
          {`/${section}` !== Constants.PATH_DASHBOARD &&
            `/${section}` !== Constants.PATH_SETTINGS && <Navigator />}
          {
            `/${section}` === Constants.PATH_PROJECT &&
            renderProjectsItems()
          }
          <GlobalSearchContainer />
        </div>
        <div className="navbar__user">
          <UserMenu />
        </div>
      </nav>
    </header>
  )
}

Header.propTypes = {
  brand: PropTypes.object,
  location: PropTypes.object.isRequired
}

export default withRouter(Header)
