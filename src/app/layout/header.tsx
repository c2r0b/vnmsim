import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import {
  Stack, Text, CommandBar, Slider, ICommandBarItemProps
} from"@fluentui/react";

import Help from "../modals/help";
import Samples from "../modals/samples";

import * as Styles from "./header.styles";

const speedFormat = (value: number) => `${value} ms`;

const Header = observer((props) => {
  const [ selPanel, setSelPanel ] = useState("");

  //const darkMode = props.store.getDarkMode();

  // does not rerender !!
  const hasErrors = props.store.hasErrors();

  const _menuItems: ICommandBarItemProps[] = [
    {
      key: "open",
      text: "Open",
      iconProps: { iconName: "Open" },
      onClick: () => {
        document.getElementById('openProject').click();
      }
    },
    {
      key: "export",
      text: "Export",
      iconProps: { iconName: "Save" },
      onClick: () => {

      }
    },
    {
      key: "samples",
      text: "Samples",
      iconProps: { iconName: "Sample" },
      onClick: () => setSelPanel("samples")
    },
    {
      key: "help",
      text: "Help",
      iconProps: { iconName: "Help" },
      onClick: () => setSelPanel("help")
    }
  ];

  const _controls: ICommandBarItemProps[] = [
    {
      key: "play",
      text: "Play",
      ariaLabel: "Play",
      iconOnly: true,
      disabled: hasErrors,
      iconProps: { iconName: "Play" },
      onClick: () => props.setStatus(1),
    },
    {
      key: "singleStep",
      text: "Single step",
      ariaLabel: "Single step",
      iconOnly: true,
      disabled: hasErrors,
      iconProps: { iconName: "Step" },
      onClick: () => props.setStatus(2),
    },
    {
      key: "doCircle",
      text: "Single iteration",
      ariaLabel: "Single iteration",
      iconOnly: true,
      disabled: hasErrors,
      iconProps: { iconName: "Circle" },
      onClick: () => props.setStatus(3),
    },
    {
      key: "pause",
      text: "Pause",
      ariaLabel: "Pause",
      iconOnly: true,
      disabled: hasErrors,
      iconProps: { iconName: "Pause" },
      onClick: () => props.setStatus(4),
    },
    {
      key: "stop",
      text: "Stop",
      ariaLabel: "Stop",
      iconOnly: true,
      disabled: hasErrors,
      iconProps: { iconName: "Stop" },
      onClick: () => props.setStatus(0),
    },
  ];

  const readFile = (event) => {
    const input = event.target.files[0];

    // file reader init
    var reader = new FileReader();
    reader.readAsText(input, "UTF-8");

    // on reader error
    var errorCallBack = () => {
      //---
      //---
      console.log("ERROR");
    };

    // read the file
    reader.onload = evt => {
      var file = evt.target.result,
          obj = JSON.parse(file);


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

      <div style={ Styles.container }>
        <Stack horizontal horizontalAlign="space-between">
          <Stack horizontal>
            <Text
              styles={ Styles.logo }
              variant={ "xLarge" }
            >
              <Text
                styles={{ root: { ...Styles.logo.root, color: "#e67e22" }}}
                variant={ "xLarge" }
              >
                vnm
              </Text>
              sim
            </Text>
            <CommandBar
              styles={ Styles.menu }
              items={ _menuItems }
              shiftOnReduce={ false }
            />
          </Stack>
          <Stack horizontal tokens={{ childrenGap: 10 }}>
            <CommandBar
              styles={ Styles.controls }
              items={ _controls }
              shiftOnReduce={ false }
            />
            <Slider
              styles={ Styles.speed }
              valueFormat={ speedFormat }
              min={ 0 }
              max={ 2000 }
              step={ 50 }
              defaultValue={ 500 }
              showValue
              snapToStep
            />
          </Stack>
        </Stack>
      </div>
    </>
  );
});

export default Header;
