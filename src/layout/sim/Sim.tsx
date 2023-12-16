import React, { useState, useEffect, useRef } from 'react'
import { useT } from '@transifex/react'

import { Input, SpinButton, Text, Tooltip } from '@fluentui/react-components'

import { PanZoom } from 'react-easy-panzoom'

import WorkTitle from '../workTitle/WorkTitle'

import { execute } from '../../middleware/execute'
import { strToObj, mergeDeep } from '../../utility/objects'

import { preventPan } from './preventPan'
import * as DataBus from './DataBus'
import * as AddressesBus from './AddressesBus'

import * as Styles from './sim.styles'
import { clearFocus, setStatus } from 'src/store/sim.slice'
import { setPc, setPcStep } from 'src/store/pc.slice'
import { isSimulatorRunning } from 'src/selectors'
import { useAppDispatch, useAppSelector } from 'src/hooks/store'
import { instant } from 'src/middleware/instant'

import { Status } from 'src/types/status'

export default () => {
  const dispatch = useAppDispatch()
  
  const isRunning = useAppSelector(isSimulatorRunning)

  const sim = useAppSelector((state) => state.sim)
  const alu = useAppSelector((state) => state.alu)
  const ir = useAppSelector((state) => state.ir)
  const pc = useAppSelector((state) => state.pc)

  const t = useT()

  const [intervalId, setIntervalId] = useState<any>(undefined)
  const [styles, setStyles] = useState({ ...Styles })

  // highlight requested element by creating a new focus style object
  // with the requested property cascade and merging it into the default
  // Styles object
  const updateStyles = () => {
    const newStyles = strToObj(sim.focus.el, Styles.focus)
    setStyles(mergeDeep({}, Styles, newStyles))
  }

  useEffect(() => {
    updateStyles()
  }, [sim.focus.el])

  // execute an entire cicle of the simulator
  const runSimulatorCicle = (set) => {
    do {
      dispatch(execute)
    } while (set === false && sim.status)
  }

  // run entire program
  const continousExecution = () => {
    setIntervalId(setInterval(() => {
      runSimulatorCicle(true)
    }, sim.interval))
    return () => clearInterval(intervalId)
  }

  useEffect(() => {
    switch (sim.status) {
      case Status.INSTANT: { // no-delay exectutin
        dispatch(instant)
        break
      }
      case Status.STOP: { // stop
        dispatch(clearFocus())
        clearInterval(intervalId)
        break
      }
      case Status.PAUSE: { // pause
        clearInterval(intervalId)
        break
      }
      case Status.SINGLE_STEP: { // single step
        runSimulatorCicle(true)
        dispatch(setStatus(4))
        break
      }
      case Status.PLAY: // play
      case Status.SINGLE_ITERATION: { // single iteration
        return continousExecution()
      }
    }
  }, [sim.status])

  const decoderInputRef = useRef(null)
  const pcInputRef = useRef(null)
  const pcIncrementInputRef = useRef(null)
  const refsWithoutPan = [decoderInputRef, pcInputRef, pcIncrementInputRef]

  if (sim.interval === 0 && isRunning) {
    return null
  }  

  return (
    <div style={ styles.box }>
      <WorkTitle />
      <PanZoom
        zoomSpeed={ 0.5 }
        minZoom={ 0.5 }
        maxZoom={ 1.5 }
        preventPan={ (e, x, y) => preventPan(e, x, y, refsWithoutPan) }
        style={ styles.container }
      >
        <DataBus.Main />
        <AddressesBus.main />
        <div style={ styles.pc.container }>
          <AddressesBus.pc />
          <SpinButton
            ref={ pcIncrementInputRef }
            min={ 1 }
            style={ styles.pc.increment }
            value={ pc.step }
            onChange={ (_ev, val) => dispatch(setPcStep(+(val.value ?? 0))) }
          />
          <Tooltip
            content={ t("Program counter") }
            relationship="label"
            withArrow
          >
            <Text style={ styles.pc.label }>
              PC
            </Text>
          </Tooltip>
          <SpinButton
            ref={ pcInputRef }
            min={ 0 }
            step={ pc.step }
            style={ styles.pc.input }
            value={ pc.val }
            onChange={ (_ev, val) => { dispatch(setPc(+(val.value ?? 0))) } }
          />
        </div>
        <div style={ styles.alu.container }>
          <svg style={ styles.alu.svg }>
            <polygon
              points="0 35, 120 35, 170 90, 220 35, 340 35, 240 180, 100 180"
            >
            </polygon>
          </svg>
          <Tooltip
            content={ t("Arithmetic logic unit") }
            relationship="label"
            withArrow
          >
            <Text style={ styles.alu.label }>
              ALU
            </Text>
          </Tooltip>
          <Input
            style={ styles.alu.p1 }
            value={ alu.e1.toString() }
            readOnly
          />
          <Input
            style={ styles.alu.p2 }
            value={ alu.e2.toString() }
            readOnly
          />
          <Input
            style={ styles.alu.op }
            value={ alu.op }
            readOnly
          />
        </div>
        <div style={ styles.acc.container }>
          <DataBus.Acc />
          <Tooltip
            content={ t("Accumulator") }
            relationship="label"
            withArrow
          >
            <Text style={ styles.acc.label }>
              ACC
            </Text>
          </Tooltip>
          <Input
            style={ styles.acc.field }
            value={ alu.acc.toString() }
            readOnly
          />
        </div>
        <div style={ styles.ir.container }>
          <Tooltip
            content={ t("Instructions register") }
            relationship="label"
            withArrow
          >
            <Text style={ styles.ir.label }>
              IR
            </Text>
          </Tooltip>
          <Input
            style={ styles.ir.input }
            value={ ir.cmd + " " + ir.loc }
            readOnly
          />
          <Input
            ref={ decoderInputRef }
            style={ styles.ir.decoder }
            defaultValue={ t("Decoder") }
            readOnly
          />
        </div>
        <Tooltip
          content={ t("Data/instructions bus") }
          relationship="label"
          withArrow
        >
          <Text style={ styles.labels.bus }>
            Data bus
          </Text>
        </Tooltip>
        <Tooltip
          content={ t("Addresses bus") }
          relationship="label"
          withArrow
        >
          <Text style={ styles.labels.addressesBus }>
            Add. bus
          </Text>
        </Tooltip>
        
        <Tooltip
          content={ t("Random-access memory") }
          relationship="label"
          positioning="before"
          withArrow
        >
          <div style={ styles.ram.container }>
            <svg style={ styles.ram.svg }>
              <rect width="50" height="100" />
            </svg>
            <Text style={ styles.ram.text }>
              RAM
            </Text>
          </div>
        </Tooltip>
      </PanZoom>
    </div>
  )
}