import React, { useState, useContext } from "react";

import { SimulatorContext } from "src/store/dispatcher";
import { observer } from "mobx-react-lite";

import {
  Stack, IconButton, TooltipHost
} from"@fluentui/react";

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
    src: Styles.github.img
  }
};

const onGithubClick = () => {
  window.open("https://github.com/c2r0b/vnmsim", "_blank");
};

const acceptedFileTypes = "application/json,.vnsp";

const Nav = observer(() => {
  const Sim = useContext(SimulatorContext);

  const [ selPanel, setSelPanel ] = useState("");

  const isSimRunning = [1,2,3].includes(Sim.getSimStatus());

  const onOpen = (input) => {
    const onError = () => {
      Sim.setError("Unable to read the selected file")
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
      ariaLabel: "Open",
      iconProps: { iconName: "Open" },
      disabled: isSimRunning,
      onClick: () => {
        document.getElementById('openProject').click();
      }
    },
    {
      ariaLabel: "Save to disk",
      disabled: isSimRunning,
      iconProps: { iconName: "Save" },
      onClick: onSave
    },
    {
      ariaLabel: "Samples",
      iconProps: { iconName: "Sample" },
      onClick: () => setSelPanel("samples")
    },
    {
      ariaLabel: "Help",
      iconProps: { iconName: "Help" },
      onClick: () => setSelPanel("help")
    },
    {
      ariaLabel: "View on GitHub",
      iconProps: githubIconProps,
      onClick: onGithubClick
    },
    {
      ariaLabel: "Settings",
      iconProps: { iconName: "Settings" },
      onClick: () => setSelPanel("settings")
    }
  ];

  const menuItems = _menuItems.map(props => (
    <TooltipHost
      content={ props.ariaLabel }
      calloutProps={{ gapSpace: 0 }}
    >
      <IconButton
        { ...props }
        styles={ Styles.menuButton }
      />
    </TooltipHost>
  ));

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
