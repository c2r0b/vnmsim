import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import Image from 'next/image';

import poweredByVercelImg from "public/powered-by-vercel.svg";

import { SimulatorContext } from "src/store/dispatcher";
import { LocaleContext } from "src/locale/dispatcher";

import { Tooltip, Button, Slider, Label, useId } from "@fluentui/react-components";
import { Next24Regular, FastForward24Regular, Pause24Regular, Play24Regular, Stop24Regular } from "@fluentui/react-icons";

import { clearHighlight } from "src/app/utility/highlight";

import * as Styles from "./controls.styles";

const vercelLink = "https://vercel.com/?utm_source=vnmsim&utm_campaign=oss";

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
      icon: <Play24Regular />,
      onClick: () => Sim.setSimStatus(1),
    },
    {
      key: "step",
      ariaLabel: Locale.get("STEP"),
      disabled: hasErrors || [1,2,3].includes(simStatus),
      icon: <Next24Regular />,
      onClick: () => Sim.setSimStatus(2),
    },
    {
      key: "iteration",
      ariaLabel: Locale.get("ITERATION"),
      disabled: hasErrors || [1,2,3].includes(simStatus),
      icon: <FastForward24Regular />,
      onClick: () => Sim.setSimStatus(3),
    },
    {
      key: "pause",
      ariaLabel: Locale.get("PAUSE"),
      disabled: hasErrors || [0,4].includes(simStatus),
      icon: <Pause24Regular />,
      onClick: () => Sim.setSimStatus(4),
    },
    {
      key: "stop",
      ariaLabel: Locale.get("STOP"),
      disabled: hasErrors || simStatus === 0,
      icon: <Stop24Regular />,
      onClick: () => {
        Sim.setSimStatus(0);
        clearHighlight(Sim.getEditor());
      }
    },
  ];

  const onIntervalChange = (e, value) => {
    // if running restore interval
    if ([1,2,3].includes(simStatus)) {
      const oldStatus = simStatus;
      Sim.setSimStatus(0);
      setTimeout(() => {
        Sim.setSimStatus(oldStatus);
      });
    }
    Sim.setInterval(value.value);
  };

  const sliderId = useId('slider');
  const interval = Sim.getInterval();

  return (
    <div style={ Styles.container }>
      <div style={ Styles.controls }>
        {
          _controls.map(props => (
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
                onClick={ props.onClick }
                appearance="subtle"
              />
            </Tooltip>
          ))
        }
      </div>

      <div style={ Styles.sliderContainer }>
        <Slider
          id={ sliderId }
          style={ Styles.slider }
          min={ 0 }
          max={ 2000 }
          step={ 50 }
          defaultValue={ 500 }
          onChange={ onIntervalChange }
        />
        <Label
          style={ Styles.sliderLabel }
          htmlFor={ sliderId }
        >
          { `${interval} ms` }
        </Label>
      </div>
      
      <div style={ Styles.poweredByVercel }>
        <a href={ vercelLink }>
          <Image
            priority
            src={ poweredByVercelImg }
            alt="Powered by Vercel"
            width={ 150 }
            height={ 44 }
          />
        </a>
      </div>
    </div>
  );
});