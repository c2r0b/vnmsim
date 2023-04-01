import React, { useState, useContext } from "react";

import { SimulatorContext } from "src/store/dispatcher";
import { observer } from "mobx-react-lite";
import { T, useT } from '@transifex/react';

import { Tooltip, Button } from"@fluentui/react-components";
import { Microscope24Regular, Beaker24Regular, CalendarStar24Regular, ChatHelp24Regular, FolderOpen24Regular, Save24Regular, Settings24Regular } from "@fluentui/react-icons";

import DropZone from "../dropZone/DropZone";
import Help from "../../modals/help";
import Samples from "../../modals/samples";
import Settings from "../../modals/settings";
import Stats from "../../modals/stats";

import { readFile, save } from "../../utility/io";

import * as Styles from "./nav.styles";
import NewConfirm from "./NewConfirm";

const acceptedFileTypes = "application/json,.vnsp";

const Nav = observer(() => {
  const Sim = useContext(SimulatorContext);
  const t = useT();

  const [ selPanel, setSelPanel ] = useState("");

  const isSimRunning = [1,2,3].includes(Sim.getSimStatus());
  
  const onOpen = (input) => {
    const onError = () => {
      Sim.setError(t("Unable to load the selected file"))
    };

    const onSuccess = (obj) => {
      // set memory cells code and then destroy that property
      Sim.setCode(obj.code);
      delete obj.code;

      // set simulator status object
      Sim.updateSim(obj);
    };

    readFile(input, onSuccess, onError);
  };

  const onSave = () => save({
    sim: Sim.getSim(),
    code: Sim.getCode(),
    title: Sim.getTitle(),
    date: Sim.getOpenDate()
  });

  const _menuItems = [
    {
      key: "new",
      ariaLabel: t("New project"),
      icon: <CalendarStar24Regular />,
      disabled: isSimRunning,
      onClick: () => setSelPanel("newConfirm")
    },
    {
      key: "open",
      ariaLabel: t("Open from file"),
      icon: <FolderOpen24Regular />,
      disabled: isSimRunning,
      onClick: () => {
        document.getElementById('openProject').click();
      }
    },
    {
      key: "save",
      ariaLabel: t("Save to file"),
      disabled: isSimRunning,
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
  ];

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
    );
  });

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
        onChange={ (e) => onOpen(e.target.files[0]) }
      />

      <div style={ Styles.container }>
        { menuItems }
      </div>
    </>
  );
});

export default Nav;
