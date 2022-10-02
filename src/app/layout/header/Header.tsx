import React, { useContext } from "react";

import { SimulatorContext } from "src/store/dispatcher";
import { LocaleContext } from "src/locale/dispatcher";
import { observer } from "mobx-react-lite";

import { Stack, Spinner } from "@fluentui/react";

import * as Styles from "./header.styles";

const Header = observer(() => {
  const Sim = useContext(SimulatorContext);
  const Locale = useContext(LocaleContext);

  // display running spinner according to sim status
  let runningSpinner = null;
  if ([1,2,3].includes(Sim.getSimStatus())) {
    runningSpinner = (
      <Spinner
        label={ Locale.get("RUNNING") }
        ariaLive="assertive"
        labelPosition="left"
        styles={ Styles.status }
      />
    );
  }

  return (
    <>
      <div style={ Styles.container }>
        <Stack horizontal horizontalAlign="space-between">
          <div style={ Styles.logo.container }>
            <div>
              <div style={ Styles.logo.cube.standard } />
              <div style={ Styles.logo.cube.colored } />
              <div style={ Styles.logo.cube.standard } />
              <div style={ Styles.logo.cube.standard } />
            </div>
          </div>
          { runningSpinner }
        </Stack>
      </div>
    </>
  );
});

export default Header;
