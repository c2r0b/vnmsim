import React, { useState, useContext } from "react";

import { SimulatorContext } from "src/store/dispatcher";
import { LocaleContext } from "src/locale/dispatcher";
import { observer } from "mobx-react-lite";

import { Tooltip, Button, Image } from"@fluentui/react-components";
import { Beaker24Regular, ChatHelp24Regular, FolderOpen24Regular, Save24Regular, Settings24Regular } from "@fluentui/react-icons";

import DropZone from "../dropZone/DropZone";
import Help from "../../modals/help";
import Samples from "../../modals/samples";
import Settings from "../../modals/settings";

import { readFile, save } from "../../utility/io";

import * as Styles from "./nav.styles";


const onGithubClick = () => {
  window.open("https://github.com/c2r0b/vnmsim", "_blank");
};

const acceptedFileTypes = "application/json,.vnsp";

const Nav = observer(() => {
  const Sim = useContext(SimulatorContext);
  const Locale = useContext(LocaleContext);

  const [ selPanel, setSelPanel ] = useState("");

  const isSimRunning = [1,2,3].includes(Sim.getSimStatus());
  
  const onOpen = (input) => {
    const onError = () => {
      Sim.setError(Locale.get("LOG_OPENING_FAILURE"))
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
      key: "open",
      ariaLabel: Locale.get("PROJECT_OPEN"),
      icon: <FolderOpen24Regular />,
      disabled: isSimRunning,
      onClick: () => {
        document.getElementById('openProject').click();
      }
    },
    {
      key: "save",
      ariaLabel: Locale.get("PROJECT_SAVE"),
      disabled: isSimRunning,
      icon: <Save24Regular />,
      onClick: onSave
    },
    {
      key: "samples",
      ariaLabel: Locale.get("SAMPLES"),
      icon: <Beaker24Regular />,
      onClick: () => setSelPanel("samples")
    },
    {
      key: "help",
      ariaLabel: Locale.get("HELP"),
      icon: <ChatHelp24Regular />,
      onClick: () => setSelPanel("help")
    },
    {
      key: "github",
      ariaLabel: "GitHub",
      children: (
        <Image
          src={ Styles.githubIcon }
          style={ Styles.github }
        />
      ),
      onClick: onGithubClick
    },
    {
      key: "settings",
      ariaLabel: Locale.get("SETTINGS"),
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
        withArrow
      >
        <Button
          aria-label={ props.ariaLabel }
          icon={ props.icon }
          disabled={ props.disabled }
          style={ Styles.menuItem }
          onClick={ props.onClick }
          appearance="subtle"
        >
          { props.children || null }
        </Button>
      </Tooltip>
    );
  });

  return (
    <>
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
