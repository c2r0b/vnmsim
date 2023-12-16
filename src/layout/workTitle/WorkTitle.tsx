import React, { useRef } from 'react'
import { T } from '@transifex/react'
import ContentEditable from 'react-contenteditable'

import { setTitle } from 'src/store/sim.slice'
import { useAppDispatch, useAppSelector } from 'src/hooks/store'

import * as Styled from './workTitle.styles'

const WorkTitle = () => {
  const dispatch = useAppDispatch()
  const title = useAppSelector((state) => state.sim.title)
  const created = useAppSelector((state) => state.sim.created)

  const workTitleRef = useRef<HTMLElement | null>(null)

  const onTitleChange = (ev) => {
    dispatch(setTitle(ev.target.value))
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
