import React, { useRef } from 'react'
import { T } from '@transifex/react'

import { Text } from '@fluentui/react-components'
import ContentEditable from 'react-contenteditable'

import { setTitle } from 'src/store/sim.slice'
import { useAppDispatch, useAppSelector } from 'src/hooks/store'

import * as Styles from './workTitle.styles'

const WorkTitle = () => {
  const dispatch = useAppDispatch()
  const title = useAppSelector((state) => state.sim.title)
  const created = useAppSelector((state) => state.sim.created)

  const workTitleRef = useRef<HTMLElement | null>(null)

  const onTitleChange = (ev) => {
    dispatch(setTitle(ev.target.value))
  }

  return (
    <div style={ Styles.container }>
      <Text style={ Styles.title }>
        <ContentEditable
          tagName="pre"
          innerRef={ workTitleRef }
          html={ title }
          onChange={ onTitleChange }
        />
      </Text>
      <Text style={ Styles.date }>
        <T _str="Created on" /> { created }
      </Text>
    </div>
  )
}

export default WorkTitle
