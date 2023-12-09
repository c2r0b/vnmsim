import React from 'react'
import { useT } from '@transifex/react'

import { Tooltip, Button } from '@fluentui/react-components'
import { ArrowStepInRight24Regular, SkipForwardTab24Regular, CircleHintHalfVertical24Regular, Pause24Regular, Play24Regular, Stop24Regular } from '@fluentui/react-icons'

import { setCodeLine, setStatus, setStep, setInterval } from 'src/store/sim.slice'
import { setPc } from 'src/store/pc.slice'
import { isSimulatorRunning, hasCode } from 'src/selectors'
import { useAppDispatch, useAppSelector } from 'src/hooks/store'

import { Status } from 'src/types/status'

import Spinner from './Spinner'
import * as Styled from './controls.styles'

const INTERVAL = 25

export default ({ clearEditorHighlight }) => {
  const dispatch = useAppDispatch()
  
  const simStatus = useAppSelector((state) => state.sim.status)
  const hasErrors = useAppSelector((state) => state.errors.hasErrors)
  const isRunning = useAppSelector(isSimulatorRunning)
  const hasRamCode = useAppSelector(hasCode)

  const t = useT()

  const _controls = [
    {
      key: isRunning ? "pause" : "run",
      ariaLabel: t(isRunning ? "Pause" : "Run loop"),
      disabled: hasErrors || !hasRamCode,
      icon: isRunning ? <Pause24Regular /> : <Play24Regular />,
      onClick: () => dispatch(setStatus(isRunning ? Status.PAUSE : Status.PLAY)),
    },
    {
      key: "instant",
      ariaLabel: t("Instant"),
      disabled: hasErrors || isRunning || !hasRamCode,
      icon: <SkipForwardTab24Regular />,
      onClick: () => dispatch(setStatus(Status.INSTANT)),
    },
    {
      key: "step",
      ariaLabel: t("Single step"),
      disabled: hasErrors || isRunning || !hasRamCode,
      icon: <ArrowStepInRight24Regular />,
      onClick: () => dispatch(setStatus(Status.SINGLE_STEP)),
    },
    {
      key: "iteration",
      ariaLabel: t("Single iteration"),
      disabled: hasErrors || isRunning || !hasRamCode,
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
      dispatch(setStatus(Status.STOP))
      setTimeout(() => {
        dispatch(setStatus(oldStatus))
      })
    }
    dispatch(setInterval((100 - +value.value) * INTERVAL))
  }

  return (
    <Styled.Container>
      <Styled.Controls>
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

        <Spinner />
      </Styled.Controls>

      <Styled.SliderContainer>
        <Styled.SliderSlowIcon />
        <Tooltip
          content={ t("Speed") }
          relationship="label"
          withArrow
        >
          <Styled.Slider
            min={ 0 }
            max={ 99 }
            step={ 1 }
            defaultValue={ 75 }
            onChange={ onIntervalChange }
          />
        </Tooltip>
        <Styled.SliderFastIcon />
      </Styled.SliderContainer>
    </Styled.Container>
  )
}