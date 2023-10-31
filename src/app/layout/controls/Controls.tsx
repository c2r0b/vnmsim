import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useT } from '@transifex/react'

import { Tooltip, Button, Slider, Label, useId } from '@fluentui/react-components'
import { Next24Regular, FastForward24Regular, Pause24Regular, Play24Regular, Stop24Regular } from '@fluentui/react-icons'

import { RootState } from 'src/store'
import { setCodeLine, setStatus, setStep, setInterval } from 'src/store/sim.slice'
import { setPc } from 'src/store/pc.slice'
import { Status } from 'src/types/status'
import { isSimulatorRunning } from 'src/selectors'

import Spinner from './Spinner'

import * as Styles from './controls.styles'

export default ({ clearEditorHighlight }) => {
  const dispatch = useDispatch()
  
  const simStatus = useSelector((state:RootState) => state.sim.status)
  const hasErrors = useSelector((state:RootState) => state.errors.hasErrors)
  const interval = useSelector((state:RootState) => state.sim.interval)

  const isRunning = useSelector(isSimulatorRunning)
  
  const t = useT()

  const _controls = [
    {
      key: "run",
      ariaLabel: t("Run loop"),
      disabled: hasErrors || isRunning,
      icon: <Play24Regular />,
      onClick: () => dispatch(setStatus(Status.PLAY)),
    },
    {
      key: "step",
      ariaLabel: t("Single step"),
      disabled: hasErrors || isRunning,
      icon: <Next24Regular />,
      onClick: () => dispatch(setStatus(Status.SINGLE_STEP)),
    },
    {
      key: "iteration",
      ariaLabel: t("Single iteration"),
      disabled: hasErrors || isRunning,
      icon: <FastForward24Regular />,
      onClick: () => dispatch(setStatus(Status.SINGLE_ITERATION)),
    },
    {
      key: "pause",
      ariaLabel: t("Pause"),
      disabled: hasErrors || !isRunning,
      icon: <Pause24Regular />,
      onClick: () => dispatch(setStatus(Status.PAUSE)),
    },
    {
      key: "stop",
      ariaLabel: t("Stop"),
      disabled: hasErrors || simStatus === Status.STOP,
      icon: <Stop24Regular />,
      onClick: () => {
        dispatch(setStatus(Status.STOP))
        dispatch(setPc(0))
        dispatch(setStep(0))
        dispatch(setCodeLine(0))
        clearEditorHighlight()
      }
    },
  ]

  const onIntervalChange = (_e, value) => {
    // if running restore interval
    if (isRunning) {
      const oldStatus = simStatus
      dispatch(setStatus(0))
      setTimeout(() => {
        dispatch(setStatus(oldStatus))
      })
    }
    dispatch(setInterval(value.value))
  }

  const sliderId = useId('slider')

  return (
    <div style={ Styles.container }>
      <div style={ Styles.controls }>
        {
          _controls.map(props => (
            <Tooltip
              key={ props.key }
              content={ props.ariaLabel }
              relationship="label"
              withArrow
            >
              <Button
                aria-label={ props.ariaLabel }
                icon={ props.icon }
                disabled={ !!props.disabled }
                onClick={ props.onClick }
                appearance="subtle"
              />
            </Tooltip>
          ))
        }
      </div>

      <div style={ Styles.sliderContainer }>
        <Slider
          id={ sliderId }
          style={ Styles.slider }
          min={ 0 }
          max={ 2000 }
          step={ 50 }
          defaultValue={ 500 }
          onChange={ onIntervalChange }
        />
        <Label
          style={ Styles.sliderLabel }
          htmlFor={ sliderId }
        >
          { `${interval} ms` }
        </Label>
      </div>

      <Spinner />
    </div>
  )
}