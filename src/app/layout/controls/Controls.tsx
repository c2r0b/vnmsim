import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import Image from 'next/image';

import poweredByVercelImg from "public/powered-by-vercel.svg";


import { SimulatorContext } from "src/store/dispatcher";
import { LocaleContext } from "src/locale/dispatcher";

import {
  Stack, TooltipHost, IconButton, Slider
} from "@fluentui/react";

import * as Styles from "./controls.styles";

const speedFormat = (value: number) => `${value} ms`;

export default observer(() => {
  const Sim = useContext(SimulatorContext);
  const Locale = useContext(LocaleContext);
  
  const simStatus = Sim.getSimStatus();
  const hasErrors = Sim.hasErrors();

  const _controls = [
    {
      key: "run",
      ariaLabel: Locale.get("RUN"),
      disabled: hasErrors || [1,2,3].includes(simStatus),
      iconProps: { iconName: "Play" },
      onClick: () => Sim.setSimStatus(1),
    },
    {
      key: "step",
      ariaLabel: Locale.get("STEP"),
      disabled: hasErrors || [1,2,3].includes(simStatus),
      iconProps: { iconName: "Step" },
      onClick: () => Sim.setSimStatus(2),
    },
    {
      key: "iteration",
      ariaLabel: Locale.get("ITERATION"),
      disabled: hasErrors || [1,2,3].includes(simStatus),
      iconProps: { iconName: "Circle" },
      onClick: () => Sim.setSimStatus(3),
    },
    {
      key: "pause",
      ariaLabel: Locale.get("PAUSE"),
      disabled: hasErrors || [0,4].includes(simStatus),
      iconProps: { iconName: "Pause" },
      onClick: () => Sim.setSimStatus(4),
    },
    {
      key: "stop",
      ariaLabel: Locale.get("STOP"),
      disabled: hasErrors || simStatus === 0,
      iconProps: { iconName: "Stop" },
      onClick: () => Sim.setSimStatus(0),
    },
  ];

  const onIntervalChange = (value) => {
    // if running restore interval
    if ([1,2,3].includes(simStatus)) {
      const oldStatus = simStatus;
      Sim.setSimStatus(0);
      setTimeout(() => {
        Sim.setSimStatus(oldStatus);
      });
    }
    Sim.setInterval(value);
  };

  return (
    <Stack
      horizontal
      horizontalAlign="space-between"
      styles={ Styles.container }
    >
      <Stack
        horizontal
        tokens={{ childrenGap: 10 }}
        styles={ Styles.controls }
      >
        {
          _controls.map(props => (
            <TooltipHost
              key={ props.key }
              content={ props.ariaLabel }
              calloutProps={{ gapSpace: 0 }}
            >
              <IconButton {...props} />
            </TooltipHost>
          ))
        }
        <Slider
          styles={ Styles.speed }
          valueFormat={ speedFormat }
          min={ 0 }
          max={ 2000 }
          step={ 50 }
          defaultValue={ 500 }
          onChange={ onIntervalChange }
          showValue
          snapToStep
        />
      </Stack>
      <Image
        priority
        src={ poweredByVercelImg }
        alt="Powered by Vercel"
        width={ 150 }
      />
    </Stack>
  );
});