import React, { useState, useContext } from "react";

import { SimulatorContext } from "src/store/dispatcher";
import { LocaleContext } from "src/locale/dispatcher";
import { observer } from "mobx-react-lite";

import { Stack, IconButton, TooltipHost } from"@fluentui/react";

import DropZone from "../dropZone/DropZone";
import Help from "../../modals/help";
import Samples from "../../modals/samples";
import Settings from "../../modals/settings";

import { readFile, save } from "../../utility/io";

import * as Styles from "./nav.styles";

const githubIconProps = {
  imageProps: {
    width: 16,
    height: 16,
    src: Styles.github.img,
    styles: Styles.github.styles
  }
};

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
      iconProps: { iconName: "Open", styles: Styles.menuIcon },
      disabled: isSimRunning,
      onClick: () => {
        document.getElementById('openProject').click();
      }
    },
    {
      key: "save",
      ariaLabel: Locale.get("PROJECT_SAVE"),
      disabled: isSimRunning,
      iconProps: { iconName: "Save", styles: Styles.menuIcon },
      onClick: onSave
    },
    {
      key: "samples",
      ariaLabel: Locale.get("SAMPLES"),
      iconProps: { iconName: "Sample", styles: Styles.menuIcon },
      onClick: () => setSelPanel("samples")
    },
    {
      key: "help",
      ariaLabel: Locale.get("HELP"),
      iconProps: { iconName: "Help", styles: Styles.menuIcon },
      onClick: () => setSelPanel("help")
    },
    {
      key: "github",
      ariaLabel: "GitHub",
      iconProps: githubIconProps,
      onClick: onGithubClick
    },
    {
      key: "settings",
      ariaLabel: Locale.get("SETTINGS"),
      iconProps: { iconName: "Settings", styles: Styles.menuIcon },
      onClick: () => setSelPanel("settings")
    }
  ];

  const menuItems = _menuItems.map(props => {
    return (
      <TooltipHost
        key={ props.key }
        id={ props.key }
        content={ props.ariaLabel }
        calloutProps={{ gapSpace: 0 }}
      >
        <IconButton
          { ...props }
          styles={ Styles.menuButton }
        />
      </TooltipHost>
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

      <Stack
        tokens={{ childrenGap: 20 }}
        styles={ Styles.container }
      >
        { menuItems }
      </Stack>
    </>
  );
});

export default Nav;
