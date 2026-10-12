import React, { useRef } from 'react'
import { T } from '@transifex/react'
import ContentEditable from 'react-contenteditable'
import sanitizeHtml from 'sanitize-html'

import { setTitle } from 'src/store/sim.slice'
import { useAppDispatch, useAppSelector } from 'src/hooks/store'

import * as Styled from './workTitle.styles'

const WorkTitle = () => {
  const dispatch = useAppDispatch()
  const title = useAppSelector((state) => state.sim.title)
  const created = useAppSelector((state) => state.sim.created)

  const workTitleRef = useRef<HTMLElement | null>(null)

  const onTitleChange = (ev) => {
    // Sanitize user input from ContentEditable to prevent XSS
    dispatch(setTitle(sanitizeHtml(ev.target.value, { allowedTags: [], allowedAttributes: {} })))
  }

  return (
    <Styled.Container>
      <Styled.Title>
        <ContentEditable
          tagName="pre"
          innerRef={ workTitleRef }
          html={ title }
          onChange={ onTitleChange }
        />
      </Styled.Title>
      <Styled.CreationDate>
        <T _str="Created on" /> { created }
      </Styled.CreationDate>
    </Styled.Container>
  )
}

export default WorkTitle
