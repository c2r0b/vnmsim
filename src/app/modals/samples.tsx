import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { SimulatorContext } from "src/store/dispatcher";
import { T, useT } from "@transifex/react";

import { Card, CardHeader, Button, Caption1, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Text } from "@fluentui/react-components";
import { ArrowDownload24Filled } from "@fluentui/react-icons";

import { samples } from "./samples.list";

import * as Styles from "./samples.styles";
import * as SAMPLES from "../samples";

interface IProps {
  show: boolean;
  onDismiss: Function;
}

const Samples = observer((props:IProps) => {
  const Sim = useContext(SimulatorContext);
  const t = useT();

  const samplesList = samples.map(s => {
    const onClick = () => {
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
    };

    return (
      <Card
        key={ s.key }
        style={ Styles.card }
      >
        <CardHeader
          header={  <Text weight="semibold">{ s.label }</Text> }
          description={ <Caption1 style={ Styles.desc }>{ s.desc }</Caption1> }
          action={
            <Button
              appearance="transparent"
              aria-label={ t("Open") }
              icon={ <ArrowDownload24Filled /> }
              onClick={ onClick }
            />
          }
        />
      </Card>
    );
  });

  return (
    <Dialog
      open={ props.show }
      onOpenChange={ () => props.onDismiss() }
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>
            <T _str="Samples" />
          </DialogTitle>
          <DialogContent>
            <div style={ Styles.list }>
              { samplesList }
            </div>
          </DialogContent>
          <DialogActions>
            <DialogTrigger>
              <Button appearance="secondary">
                <T _str="Close" />
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
});

export default Samples;
