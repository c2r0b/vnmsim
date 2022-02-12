import React, { useState, useContext, useCallback } from "react";

import { SimulatorContext } from "src/store/dispatcher";
import { observer } from "mobx-react-lite";

import {
  Panel, Stack, IconButton, TooltipHost
} from"@fluentui/react";

import Dropzone from "react-dropzone";

import Help from "../modals/help";
import Samples from "../modals/samples";
import Settings from "../modals/settings";

import { readFile, save } from "../utility/io";

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

const Nav = observer(() => {
  const Sim = useContext(SimulatorContext);

  const [ selPanel, setSelPanel ] = useState("");

  const isSimRunning = [1,2,3].includes(Sim.getSimStatus());

  const onOpen = (event) => {
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

    readFile(event, onSuccess, onError);
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
      ariaLabel: "Settings",
      iconProps: { iconName: "Settings" },
      onClick: () => setSelPanel("settings")
    }
  ];

  const isInDarkMode = Sim.getDarkMode();

  const onRenderFooterContent = () => (
    <Stack tokens={{ childrenGap: 20 }}>
      {/*<TooltipHost
        content={ isInDarkMode ? "Switch to light mode" : "Switch to dark mode" }
        calloutProps={{ gapSpace: 0 }}
      >
        <IconButton
          iconProps={{ iconName: isInDarkMode ? "Light" : "Dark" }}
          onClick={ () => Sim.toggleDarkMode() }
          styles={ Styles.menuButton }
        />
      </TooltipHost>*/}
      <TooltipHost
        content={ "View on GitHub" }
        calloutProps={{ gapSpace: 0 }}
      >
        <IconButton
          iconProps={ githubIconProps }
          onClick={ onGithubClick }
          styles={ Styles.menuButton }
        />
      </TooltipHost>
    </Stack>
  );

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
        store={ Sim }
        show={ selPanel == "samples" }
        onDismiss={ () => setSelPanel("") }
      />
      <Settings
        store={ Sim }
        show={ selPanel == "settings" }
        onDismiss={ () => setSelPanel("") }
      />

      <input
        type="file"
        id="openProject"
        accept="application/json,.vnsp"
        style={  Styles.openInput }
        onChange={ onOpen }
      />

      <Dropzone
        disableClick
        onDrop={files => console.log('on drop')}
        onDragEnter={ () => { }}
        onDragLeave={() => {}}
        multiple={false}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} style={{ position: "absolute", top: 0,left:0,right:0,bottom:0}}>
            <input {...getInputProps()} hidden />
          </div>
        )}
      </Dropzone>

      <Panel
        isBlocking={ false }
        isOpen={ true }
        hasCloseButton={ false }
        styles={ Styles.container }
        isFooterAtBottom={ true }
        onRenderFooterContent={ onRenderFooterContent }
      >
        <Stack tokens={{ childrenGap: 20 }}>
          { menuItems }
        </Stack>
      </Panel>
    </>
  );
});

export default Nav;
