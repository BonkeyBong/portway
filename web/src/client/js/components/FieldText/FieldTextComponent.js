import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import CodeMirror from 'codemirror/lib/codemirror'

import 'codemirror/addon/display/autorefresh'
import 'codemirror/addon/edit/continuelist'
import 'codemirror/mode/gfm/gfm'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/clike/clike'

import './codemirror.css'
import './FieldText.scss'

window.CodeMirror = CodeMirror

const FieldTextComponent = ({ autoFocusElement, field, onBlur, onChange, onFocus, readOnly }) => {
  const textRef = useRef()
  const editorRef = useRef()
  // Mount the SimpleMDE Editor
  useEffect(() => {
    editorRef.current = CodeMirror.fromTextArea(textRef.current, {
      addModeClass: true,
      autoRefresh: true,
      dragDrop: false,
      extraKeys: {
        'Enter': 'newlineAndIndentContinueMarkdownList',
        'Tab': 'tabAndIndentMarkdownList',
        'Shift-Tab': 'shiftTabAndUnindentMarkdownList'
      },
      lineNumbers: false,
      lineWrapping: true,
      mode: {
        name: 'gfm',
        gitHubSpice: false,
        highlightFormatting: true,
      },
      scrollbarStyle: null,
      tabSize: 2,
      tokenTypeOverrides: {
        list1: 'formatting-list-ul'
      }
    })
  // We're disabling the dependency warning here because anything other than []
  // causes problems. We only want setEditor to run once
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.options.readOnly = readOnly ? 'nocursor' : false
      editorRef.current.on('blur', (cm, e) => { onBlur(field.id, field.type, editorRef.current) })
      editorRef.current.on('change', () => { onChange(field.id, editorRef.current.getValue()) })
      editorRef.current.on('dragstart', (cm, e) => { e.preventDefault() })
      editorRef.current.on('dragenter', (cm, e) => { e.preventDefault() })
      editorRef.current.on('dragover', (cm, e) => { e.preventDefault() })
      editorRef.current.on('dragleave', (cm, e) => { e.preventDefault() })
      editorRef.current.on('focus', (cm, e) => { onFocus(field.id, field.type, editorRef.current) })
      if (autoFocusElement) {
        window.requestAnimationFrame(() => {
          editorRef.current.focus()
        })
      }
    }
  // We're disabling the dependency here because adding field.id or onChange here
  // will cause a bunch of API hits
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorRef])

  useEffect(() => {
    // If we have an editor, and we have a field value, and the field value is different from
    // the editors current value, then we got an update from the socket, so update the text
    if (editorRef.current && field.value && field.value !== editorRef.current.getValue()) {
      editorRef.current.getDoc().setValue(field.value)
      editorRef.current.refresh()
    }
  }, [field.value])

  return (
    <div className="document-field__text">
      <textarea ref={textRef} defaultValue={field.value} readOnly={readOnly} />
    </div>
  )
}

FieldTextComponent.propTypes = {
  autoFocusElement: PropTypes.bool,
  field: PropTypes.object.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
}

export default FieldTextComponent
