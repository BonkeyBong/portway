import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import { debounce } from 'Shared/utilities'
import './FieldNumber.scss'

const FieldNumberComponent = ({ field, onChange, showName }) => {
  // field name change
  const nameRef = useRef()
  const debouncedNameChangeHandler = debounce(1000, (e) => {
    onChange(field.id, { name: nameRef.current.value })
  })
  // Value change
  const valueRef = useRef()
  const debouncedValueChangeHandler = debounce(1000, () => {
    onChange(field.id, { value: valueRef.current.value })
  })
  return (
    <>
    <input
      className="h-second-level"
      defaultValue={field.value}
      onChange={debouncedValueChangeHandler}
      onFocus={(e) => { e.target.select() }}
      type="number"
      ref={valueRef} />
    {showName &&
    <input
      ref={nameRef}
      className="field__name"
      defaultValue={field.name}
      onChange={debouncedNameChangeHandler}
      onFocus={(e) => { e.target.select() }}
      type="text" />
    }
    </>
  )
}

FieldNumberComponent.propTypes = {
  field: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  showName: PropTypes.bool
}

export default FieldNumberComponent
