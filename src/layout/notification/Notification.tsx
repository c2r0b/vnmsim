import React, { useEffect } from 'react'

import { useT } from '@transifex/react'

import { Link, Toast, ToastBody, ToastFooter, ToastTitle, Toaster, useId, useToastController } from '@fluentui/react-components'

import { clearError } from 'src/store/errors.slice'
import { useAppDispatch, useAppSelector } from 'src/hooks/store'

const Notification = () => {
  const dispatch = useAppDispatch()
  const errorMessage = useAppSelector((state) => state.errors.error)
  const toasterId = useId("toaster");
  const { dispatchToast, dismissToast } = useToastController(toasterId);
  const t = useT()

  const notify = () => (
    dispatchToast(
      <Toast>
        <ToastTitle>Error</ToastTitle>
        <ToastBody>{ errorMessage }</ToastBody>
        <ToastFooter>
          <Link onClick={ handleCloseError }>{ t("Close") }</Link>
        </ToastFooter>
      </Toast>,
      {
        toastId: toasterId,
        intent: "error"
      }
    )
  )
  
  useEffect(() => {
    if (errorMessage !== undefined) {
      notify()
    }
  }, [errorMessage])

  const handleCloseError = () => {
    dispatch(clearError())
    dismissToast(toasterId)
  }

  return (<Toaster toasterId={toasterId} />)
}

export default Notification