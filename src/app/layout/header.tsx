import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import {
  Panel, Stack, IconButton, TooltipHost
} from"@fluentui/react";

import Help from "../modals/help";
import Samples from "../modals/samples";

import * as Styles from "./header.styles";

const Header = observer((props) => {
  const [ selPanel, setSelPanel ] = useState("");

  const isSimRunning = [1,2,3].includes(props.store.getSimStatus());

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
      onClick: () => {

      }
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
    }
  ];

  const readFile = (event) => {
    const input = event.target.files[0];

    // file reader init
    var reader = new FileReader();
    reader.readAsText(input, "UTF-8");

    // on reader error
    var errorCallBack = () => {
      props.store.setError("Unable to read the selected file")
    };

    // read the file
    reader.onload = evt => {
      let file = evt.target.result;
      let obj = JSON.parse(file);

      // prevent data loss
      //if (confirm(this.$rootScope.translate('WARNING_UNSAVED'))) {
        // if this is a json file from VNMSIM v >= 2016.09.04
        if (input.type == "application/json") {
          // set memory cells code and then destroy that property
          props.store.setCode(obj.code);
          delete obj.code;

          // set simulator status object
          /*if (this.sim != obj)
            angular.copy(obj, this.sim);*/
        }
        // retrocompatibility for older versions / Zanichelli edition
        else if (input[0].name.split('.').slice(-1)[0] == 'vnsp') {
          // split input file lines
          file = file.split(/\n+/);

          // code for memory cells (removing NOP used as placeholders)
          const nop_cmds = new RegExp('NOP','g');
          const code = file[5].split(',').join('\n').replace(nop_cmds,'');
          props.store.setCode(code);

          // X-Y-Z-W variables
          var val = file[8].split(',');
          /*this.sim.variables = {
            X: parseInt(val[0]),
            Y: parseInt(val[1]),
            Z: parseInt(val[2]),
            W: parseInt(val[3])
          };

          // T1-40 variables
          val = file[11].split(',');
          val.pop();
          for (var v in val)
            this.sim.variables['T' + (parseInt(v) + 1)] = parseInt(val[v]);*/
        }
        // unreadable file type
        else {
          errorCallBack();
          return;
        }
        //this.log.write('LOG_OPENED');
      //}
    }
    // invalid file
    reader.onerror = evt => errorCallBack();
  };

  const isInDarkMode = props.store.getDarkMode();

  const onRenderFooterContent = () => (
    <Stack tokens={{ childrenGap: 20 }}>
      <TooltipHost
        content={ isInDarkMode ? "Switch to light mode" : "Switch to dark mode" }
        calloutProps={{ gapSpace: 0 }}
      >
        <IconButton
          iconProps={{ iconName: isInDarkMode ? "Light" : "Dark" }}
          onClick={ () => props.store.toggleDarkMode() }
        />
      </TooltipHost>
      <TooltipHost
        content={ "View on GitHub" }
        calloutProps={{ gapSpace: 0 }}
      >
        <IconButton
          iconProps={{ imageProps: { width: 16, src: Styles.github.img }}}
          onClick={ () => window.open("https://github.com/c2r0b/vnmsim", "_blank") }
        />
      </TooltipHost>
    </Stack>
  );

  return (
    <>
      <Help
        show={ selPanel == "help" }
        onDismiss={ () => setSelPanel("") }
      />
      <Samples
        store={ props.store }
        show={ selPanel == "samples" }
        onDismiss={ () => setSelPanel("") }
      />

      <input
        type="file"
        id="openProject"
        accept="application/json,.vnsp"
        style={  Styles.openInput }
        onChange={ readFile }
      />

      <Panel
        isBlocking={ false }
        isOpen={ true }
        hasCloseButton={ false }
        styles={ Styles.container }
        isFooterAtBottom={ true }
        onRenderFooterContent={ onRenderFooterContent }
      >
        <Stack>
          <Stack>
            <div style={ Styles.logo.container }>
              <div style={ Styles.logo.cube } />
              <div style={ Styles.logo.cube } />
              <br />
              <div style={ Styles.logo.cube } />
              <div style={ Styles.logo.cube } />
            </div>
            <Stack tokens={{ childrenGap: 20 }}>
              {
                _menuItems.map(props => (
                  <TooltipHost
                    content={ props.ariaLabel }
                    calloutProps={{ gapSpace: 0 }}
                  >
                    <IconButton {...props} />
                  </TooltipHost>
                ))
              }
            </Stack>
          </Stack>
        </Stack>
      </Panel>
    </>
  );
});

export default Header;
