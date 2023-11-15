import React, { useState } from 'react'
import Image from 'next/image'
import { useT } from '@transifex/react'
import { Tooltip, Button } from '@fluentui/react-components'
import { Microscope24Regular, Beaker24Regular, CalendarStar24Regular, ChatHelp24Regular, FolderOpen24Regular, Save24Regular, Settings24Regular } from '@fluentui/react-icons'

import DropZone from '../dropZone/DropZone'
import Help from '../../modals/help'
import Samples from '../../modals/samples'
import Settings from '../../modals/settings'
import Stats from '../../modals/stats'

import { readFile, save } from '../../utility/io'
import logoImg from 'public/images/logo.png'

import { setError } from 'src/store/errors.slice'
import { isSimulatorRunning } from 'src/selectors'
import { useAppDispatch, useAppSelector } from 'src/hooks/store'
import { SimulatorState } from 'src/types/simulatorState'
import { load } from 'src/middleware/load'

import * as Styles from './nav.styles'
import NewConfirm from './NewConfirm'

const acceptedFileTypes = 'application/json,.vnsp'

const Nav = () => {
  const dispatch = useAppDispatch()

  const isRunning = useAppSelector(isSimulatorRunning)
  const sim = useAppSelector((state) => state.sim)
  const ram = useAppSelector((state) => state.ram)
  const ir = useAppSelector((state) => state.ir)
  const pc = useAppSelector((state) => state.pc)
  const alu = useAppSelector((state) => state.alu)

  const t = useT()

  const [ selPanel, setSelPanel ] = useState("")

  const onOpen = (input) => {
    const onError = () => {
      dispatch(setError(t("Unable to load the selected file")))
    }

    const onSuccess = (obj:SimulatorState) => {
      dispatch(load(obj.toData()))
    }

    readFile(input, onSuccess, onError)
  }

  const onSave = () => save({
    obj: (new SimulatorState({ sim, ram, ir, pc, alu })).toJSON(),
    title: sim.title,
    date: sim.created
  })

  const _menuItems = [
    {
      key: "new",
      label: t("New project"),
      icon: <CalendarStar24Regular />,
      disabled: isRunning,
      onClick: () => setSelPanel("newConfirm")
    },
    {
      key: "open",
      label: t("Open from file"),
      icon: <FolderOpen24Regular />,
      disabled: isRunning,
      onClick: () => {
        document.getElementById('openProject')?.click()
      }
    },
    {
      key: "save",
      label: t("Save to file"),
      disabled: isRunning,
      icon: <Save24Regular />,
      onClick: onSave
    },
    {
      key: "samples",
      label: t("Samples"),
      icon: <Beaker24Regular />,
      onClick: () => setSelPanel("samples")
    },
    {
      key: "stats",
      label: t("Statistics"),
      icon: <Microscope24Regular />,
      onClick: () => setSelPanel("stats")
    },
    {
      key: "help",
      label: t("Help"),
      icon: <ChatHelp24Regular />,
      onClick: () => setSelPanel("help")
    },
    {
      key: "settings",
      label: t("Settings"),
      icon: <Settings24Regular />,
      onClick: () => setSelPanel("settings")
    }
  ]

  const menuItems = _menuItems.map(props => {
    return (
      <Tooltip
        key={ props.key }
        content={ props.label }
        relationship="label"
        positioning="below"
        withArrow
      >
        <Button
          aria-label={ props.label }
          icon={ props.icon }
          disabled={ props.disabled }
          style={ Styles.menuItem }
          onClick={ props.onClick }
          appearance="subtle"
        >
          { props.label }
        </Button>
      </Tooltip>
    )
  })

  return (
    <>
      <NewConfirm
        show={ selPanel == "newConfirm" }
        onDismiss={ () => setSelPanel("") }
      />
      <Help
        show={ selPanel == "help" }
        onDismiss={ () => setSelPanel("") }
      />
      <Samples
        show={ selPanel == "samples" }
        onDismiss={ () => setSelPanel("") }
      />
      <Settings
        show={ selPanel == "settings" }
        onDismiss={ () => setSelPanel("") }
      />
      <Stats
        show={ selPanel == "stats" }
        onDismiss={ () => setSelPanel("") }
      />

      <DropZone
        onOpen={ onOpen }
      />

      <input
        type="file"
        id="openProject"
        accept={ acceptedFileTypes }
        style={  Styles.openInput }
        onChange={ (e) => {
          if (!e.target.files?.length) return
          onOpen(e.target.files[0])
        }}
      />

      <div style={ Styles.container }>
        <Image
          src={ logoImg }
          style={ Styles.logo }
          alt="VNMS"
        />
        { menuItems }
      </div>
    </>
  )
}

export default Nav
