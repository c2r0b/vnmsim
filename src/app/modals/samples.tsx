import * as Styles from "./samples.styles";

import React, { useContext } from "react";

import { SimulatorContext } from "src/store/dispatcher";
import { observer } from "mobx-react-lite";

import {
  Panel, PanelType, Stack, DocumentCard, DocumentCardType, DocumentCardDetails,
  DocumentCardTitle, DocumentCardLocation, DocumentCardActions,
  MessageBar
} from "@fluentui/react";

import * as SAMPLES from "../samples";

const samples = [
  {
    key: "addition",
    label: "Addition",
    desc: "x + y = z"
  },
  {
    key: "subtraction",
    label: "Subtraction",
    desc: "x - y = z"
  },
  {
    key: "multiplication",
    label: "Multiplication",
    desc: "x * y = z"
  },
  {
    key: "division",
    label: "Division",
    desc: "x / y = z"
  },
  {
    key: "basics",
    label: "Basics",
    desc: "x (y = +,-,*,/) z = w"
  },
  {
    key: "power",
    label: "Power",
    desc: "x ^ y"
  },
  {
    key: "square_root",
    label: "Square root",
    desc: "sqrt(x)"
  },
  {
    key: "modulo",
    label: "Modulo",
    desc: "x % y"
  },
  {
    key: "even",
    label: "Is even",
    desc: "x % 2 == 0"
  },
  {
    key: "greater_than",
    label: "Is greater than",
    desc: "x > y"
  },
];

interface IProps {
  show: boolean;
  onDismiss: Function;
}

const Samples = observer((props:IProps) => {
  const Sim = useContext(SimulatorContext);
  return (
    <Panel
      headerText="Samples"
      isOpen={ props.show }
      isLightDismiss={ true }
      type={ PanelType.custom }
      styles={{ main: { width: 480 }}}
      onDismiss={ () => props.onDismiss() }
      closeButtonAriaLabel="Close"
    >
      <MessageBar
        isMultiline={ true }
        styles={ Styles.infoBar }
      >
        The following list of samples is meant as a way to introduce to and practice with the main commands of this simulator. 
        These samples are not meant to be "the right way" to approach the described problem since there is not a single solution to them.
      </MessageBar>
      <Stack
        horizontal
        wrap
        tokens={{ childrenGap: 20 }}
        styles={ Styles.stack }
      >
        {
          samples.map(s => {
            return (
              <DocumentCard
                key={ s.key }
                type={ DocumentCardType.compact }
                styles={ Styles.card }
              >
                <DocumentCardDetails>
                  <DocumentCardTitle
                    title={ s.label }
                    shouldTruncate
                  />
                  <DocumentCardLocation
                    location={ s.desc }
                  />
                </DocumentCardDetails>
                <DocumentCardActions
                  actions={ [
                    {
                      iconProps: { iconName: "DownloadDocument" },
                      onClick: () => {
                        const obj = SAMPLES[s.key];

                        // save first ?
                        // ---

                        // set code
                        Sim.setCode(obj.code);
                        delete obj.code;

                        // copy state
                        //---

                        // close panel
                        props.onDismiss();
                      },
                      ariaLabel: "Load"
                    }
                  ] }
                />
              </DocumentCard>
            );
          })
        }
      </Stack>
    </Panel>
  );
});

export default Samples;
