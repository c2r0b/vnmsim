import * as Styles from "./samples.styles";
import { observer } from "mobx-react-lite";

import React from "react";
import {
  Panel, PanelType, Stack, DocumentCard, DocumentCardType, DocumentCardDetails,
  DocumentCardTitle, DocumentCardLocation, DocumentCardActions
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

const Samples = observer((props) => {
  return (
    <Panel
      headerText="Samples"
      isOpen={ props.show }
      isLightDismiss={ true }
      type={ PanelType.custom }
      customWidth={ 500 }
      onDismiss={ props.onDismiss }
      closeButtonAriaLabel="Close"
    >
      <p><b>Disclaimer &#128679;:</b> the following list of samples is meant for educational purposes as a way to introduce to and practice with the main commands of this simulator. The code used is not meant to be "the right way" to approach the described problem since there is not a single way to write them.</p>
      <p>We would like to encourage you to write your own solutions in order to really learn the basics and then move on to much more complicated problems. &#127808;</p>
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
                        props.store.setCode(obj.code);
                        delete obj.code;

                        // copy state
                        //---

                        // close panel
                        // ---
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
