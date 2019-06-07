import React from 'react'
import PropTypes from 'prop-types'

function SearchIcon({ className, fill, height, width }) {
  return (
    <div className="icon">
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 36 36">
        <path fill={fill} fillRule="evenodd" d="M13.7430947,12.5740557 L9.91009465,8.73955572 C10.5971654,7.80245935 10.9652265,6.66953223 10.9600947,5.50755572 C10.946985,2.47441147 8.49371664,0.0175744397 5.46059465,5.57178262e-05 C4.00907481,-0.00651157295 2.61521603,0.567712287 1.58953064,1.59480646 C0.56384524,2.62190064 -0.00846492859,4.01654626 9.46502197e-05,5.46805572 C0.0132043609,8.50147611 2.46669652,10.958537 5.50009465,10.9760557 C6.66680484,10.9811124 7.80387114,10.6087552 8.74159465,9.91455572 L8.74559465,9.91155572 L12.5750947,13.7430557 C12.7821435,13.9602692 13.0906604,14.0481921 13.3811096,13.9727584 C13.6715587,13.8973248 13.898302,13.6703873 13.9734871,13.3798737 C14.0486722,13.0893602 13.9604853,12.7809186 13.7430947,12.5740557 L13.7430947,12.5740557 Z M5.49609465,9.87805572 C3.06950871,9.86409673 1.1067469,7.89865842 1.09609465,5.47205572 C1.08954524,4.31099854 1.54743104,3.19550612 2.36782487,2.37389147 C3.1882187,1.55227681 4.30302902,1.09273279 5.46409465,1.09755572 C7.89068059,1.1115147 9.8534424,3.07695301 9.86409465,5.50355572 C9.87064406,6.6646129 9.41275826,7.78010532 8.59236443,8.60171997 C7.7719706,9.42333462 6.65716028,9.88287864 5.49609465,9.87805572 Z"/>
      </svg>
    </div>
  )
}

SearchIcon.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string
}

SearchIcon.defaultProps = {
  className: 'icon-search',
  fill: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#e5e7e6' : '#3b3d3e',
  height: '18',
  width: '18'
}

export default SearchIcon
