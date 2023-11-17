import React from 'react'

import { useT } from '@transifex/react'

import { Alert } from '@fluentui/react-components/unstable'
import { Text } from '@fluentui/react-components'

import { clearError } from 'src/store/errors.slice'
import { useAppDispatch, useAppSelector } from 'src/hooks/store'

import * as Styles from './notification.styles'

const Notification = () => {
  const dispatch = useAppDispatch()
  const errorMessage = useAppSelector((state) => state.errors.error)
  const t = useT()

  if (errorMessage === undefined) {
    return null
  }

  const handleCloseError = () => {
    dispatch(clearError())
  }

  return (
    <div style={ Styles.container }>
      <Alert
        intent="error"
        action={ t("Close") }
        onClick={ handleCloseError }
      >
        <Text style={ Styles.text }>
          { errorMessage }
        </Text>
      </Alert>
    </div>
  )
}

export default Notification