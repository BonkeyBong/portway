import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

const MenuHeader = ({ className, children, ...props }) => {
  const menuTitleClasses = cx({
    'menu__header': true,
    [className]: className
  })
  return (
    <li className={menuTitleClasses} {...props}>
      {children}
    </li>
  )
}

MenuHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

export default MenuHeader
