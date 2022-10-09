import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { SimulatorContext } from "src/store/dispatcher";
import { LocaleContext } from "src/locale/dispatcher";
import { Localize } from "src/locale/Localize";

import {
  Panel, PanelType, Stack, DocumentCard, DocumentCardTitle,
  DocumentCardActions, Text
} from "@fluentui/react";

import { samples } from "./samples.list";

import * as Styles from "./samples.styles";
import * as SAMPLES from "../samples";

interface IProps {
  show: boolean;
  onDismiss: Function;
}

const Samples = observer((props:IProps) => {
  const Sim = useContext(SimulatorContext);
  const Locale = useContext(LocaleContext);

  const samplesList = samples.map(s => {
    const actions = [
      {
        iconProps: { iconName: "DownloadDocument" },
        onClick: () => {
          const obj = SAMPLES[s.key].input;
          
          // set code
          Sim.setCode(obj.code);
          delete obj.code;

          // set title and date
          obj.title = s.label;
          obj.created = new Date().toISOString().slice(0, 10);

          // set simulator status object
          Sim.updateSim(obj);

          // close panel
          props.onDismiss();
        },
        ariaLabel: Locale.get("SAMPLES_OPEN")
      }
    ];

    return (
      <DocumentCard
        key={ s.key }
        styles={ Styles.card }
      >
        <Stack horizontal horizontalAlign="space-between">
          <Stack.Item>
            <DocumentCardTitle
              title={ s.label }
              styles={ Styles.title }
            />
            <Text
              variant="medium"
              styles={ Styles.desc }
            >
              { s.desc }
            </Text>
          </Stack.Item>
          <DocumentCardActions
            actions={ actions }
          />
        </Stack>
      </DocumentCard>
    );
  });

  return (
    <Panel
      headerText={ Locale.get("SAMPLES") }
      isOpen={ props.show }
      isLightDismiss={ true }
      type={ PanelType.custom }
      styles={{ main: { width: 500 }}}
      onDismiss={ () => props.onDismiss() }
      closeButtonAriaLabel={ Locale.get("CLOSE") }
    >
      <p>
        <Localize label="SAMPLES_MSG"/>
      </p>
      
      <Stack
        horizontal
        wrap
        tokens={{ childrenGap: 20 }}
        styles={ Styles.stack }
      >
        { samplesList }
      </Stack>
    </Panel>
  );
});

export default Samples;
