import React, { useState } from "react";

import {
  Stack, Text, CommandBar, Slider, ICommandBarItemProps
} from"@fluentui/react";

import Help from "../modals/help";
import Samples from "../modals/samples";

import * as Styles from "./header.styles";

const speedFormat = (value: number) => `${value} ms`;

const Header = (props) => {
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
}

export default Header;
