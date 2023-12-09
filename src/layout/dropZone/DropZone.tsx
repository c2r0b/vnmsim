import React, { useState, useEffect } from 'react'
import { T } from '@transifex/react'

import * as Styled from './dropZone.styles'

interface IProps {
  onOpen: Function
}

const DropZone = (props:IProps) => {
  const [ isDragging, setIsDragging ] = useState(false)
  
  const handleDrag = (e, isDragging) => {
    e.preventDefault()
    setIsDragging(isDragging)
  }

  // files drop
  useEffect(() => {
    window.addEventListener("dragenter", (e) => handleDrag(e, true))
    const el = document.getElementById("dropZone")
    if (!el) return
    el.addEventListener("dragenter", (e) => handleDrag(e, true))
    el.addEventListener("dragover", (e) => handleDrag(e, true))
    el.addEventListener("dragleave", (e) => handleDrag(e, false))
    el.addEventListener("drop", (e) => {
      if (e.dataTransfer?.files.length) {
        props.onOpen(e.dataTransfer.files[0])
        handleDrag(e, false)
      }
    })
  }, [])

  return (
    <Styled.Container
      id="dropZone"
      className={ isDragging ? "dragging" : "" }
    >
      <Styled.OverflowBg />
      <Styled.MessageContainer>
        <Styled.Message>
          <T _str="Drop the file anywhere on the page to open it" />
        </Styled.Message>
      </Styled.MessageContainer>
    </Styled.Container>
  )
}

export default DropZone
