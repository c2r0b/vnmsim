import React from 'react'
import { useT } from '@transifex/react'

import { Tooltip, Button, Slider, Label, useId } from '@fluentui/react-components'
import { ArrowStepInRight24Regular, SkipForwardTab24Regular, CircleHintHalfVertical24Regular, Pause24Regular, Play24Regular, Stop24Regular } from '@fluentui/react-icons'

import { setCodeLine, setStatus, setStep, setInterval } from 'src/store/sim.slice'
import { setPc } from 'src/store/pc.slice'
import { Status } from 'src/types/status'
import { isSimulatorRunning } from 'src/selectors'
import { useAppDispatch, useAppSelector } from 'src/hooks/store'

import Spinner from './Spinner'

import * as Styles from './controls.styles'

const INTERVAL = 25

export default ({ clearEditorHighlight }) => {
  const dispatch = useAppDispatch()
  
  const simStatus = useAppSelector((state) => state.sim.status)
  const hasErrors = useAppSelector((state) => state.errors.hasErrors)
  const interval = useAppSelector((state) => state.sim.interval)

  const isRunning = useAppSelector(isSimulatorRunning)
  
  const t = useT()

  const _controls = [
    {
      key: isRunning ? "pause" : "run",
      ariaLabel: t(isRunning ? "Pause" : "Run loop"),
      disabled: hasErrors,
      icon: isRunning ? <Pause24Regular /> : <Play24Regular />,
      onClick: () => dispatch(setStatus(isRunning ? Status.PAUSE : Status.PLAY)),
    },
    {
      key: "instant",
      ariaLabel: t("Instant"),
      disabled: hasErrors || isRunning,
      icon: <SkipForwardTab24Regular />,
      onClick: () => dispatch(setStatus(Status.INSTANT)),
    },
    {
      key: "step",
      ariaLabel: t("Single step"),
      disabled: hasErrors || isRunning,
      icon: <ArrowStepInRight24Regular />,
      onClick: () => dispatch(setStatus(Status.SINGLE_STEP)),
    },
    {
      key: "iteration",
      ariaLabel: t("Single iteration"),
      disabled: hasErrors || isRunning,
      icon: <CircleHintHalfVertical24Regular />,
      onClick: () => dispatch(setStatus(Status.SINGLE_ITERATION)),
    },
    {
      key: "stop",
      ariaLabel: t("Stop"),
      disabled: hasErrors|| !isRunning,
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
    dispatch(setInterval((100 - +value.value) * INTERVAL))
  }

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
        <Tooltip
          content={ t("Speed") }
          relationship="label"
          withArrow
        >
          <Slider
            style={ Styles.slider }
            min={ 0 }
            max={ 99 }
            step={ 1 }
            defaultValue={ 75 }
            onChange={ onIntervalChange }
          />
        </Tooltip>
      </div>

      <Spinner />
    </div>
  )
}