import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useT } from '@transifex/react'

import { Tooltip, Button } from '@fluentui/react-components'
import { Microscope24Regular, Beaker24Regular, CalendarStar24Regular, ChatHelp24Regular, FolderOpen24Regular, Save24Regular, Settings24Regular } from '@fluentui/react-icons'

import DropZone from '../dropZone/DropZone'
import Help from '../../modals/help'
import Samples from '../../modals/samples'
import Settings from '../../modals/settings'
import Stats from '../../modals/stats'

import { readFile, save } from '../../utility/io'

import { RootState } from 'src/store'
import { setError } from 'src/store/errors.slice'
import { setCode } from 'src/store/ram.slice'
import { isSimulatorRunning } from 'src/selectors'

import * as Styles from './nav.styles'
import NewConfirm from './NewConfirm'

const acceptedFileTypes = 'application/json,.vnsp'

const Nav = () => {
  const isRunning = useSelector(isSimulatorRunning)
  const sim = useSelector((state: RootState) => state.sim)
  const ramCode = useSelector((state: RootState) => state.ram.code)

  const dispatch = useDispatch()

  const t = useT()

  const [ selPanel, setSelPanel ] = useState("")
  
  const onOpen = (input) => {
    const onError = () => {
      dispatch(setError(t("Unable to load the selected file")))
    }

    const onSuccess = (obj) => {
      // set memory cells code and then destroy that property
      dispatch(setCode(obj.code))
      delete obj.code

      // TODO: set simulator status object
      // Sim.updateSim(obj)
    }

    readFile(input, onSuccess, onError)
  }

  const onSave = () => save({
    sim,
    code: ramCode,
    title: sim.title,
    date: sim.created
  })

  const _menuItems = [
    {
      key: "new",
      ariaLabel: t("New project"),
      icon: <CalendarStar24Regular />,
      disabled: isRunning,
      onClick: () => setSelPanel("newConfirm")
    },
    {
      key: "open",
      ariaLabel: t("Open from file"),
      icon: <FolderOpen24Regular />,
      disabled: isRunning,
      onClick: () => {
        document.getElementById('openProject')?.click()
      }
    },
    {
      key: "save",
      ariaLabel: t("Save to file"),
      disabled: isRunning,
      icon: <Save24Regular />,
      onClick: onSave
    },
    {
      key: "samples",
      ariaLabel: t("Samples"),
      icon: <Beaker24Regular />,
      onClick: () => setSelPanel("samples")
    },
    {
      key: "stats",
      ariaLabel: t("Statistics"),
      icon: <Microscope24Regular />,
      onClick: () => setSelPanel("stats")
    },
    {
      key: "help",
      ariaLabel: t("Help"),
      icon: <ChatHelp24Regular />,
      onClick: () => setSelPanel("help")
    },
    {
      key: "settings",
      ariaLabel: t("Settings"),
      icon: <Settings24Regular />,
      onClick: () => setSelPanel("settings")
    }
  ]

  const menuItems = _menuItems.map(props => {
    return (
      <Tooltip
        key={ props.key }
        content={ props.ariaLabel }
        relationship="label"
        positioning="below"
        withArrow
      >
        <Button
          aria-label={ props.ariaLabel }
          icon={ props.icon }
          disabled={ props.disabled }
          style={ Styles.menuItem }
          onClick={ props.onClick }
          appearance="subtle"
        />
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
        { menuItems }
      </div>
    </>
  )
}

export default Nav
