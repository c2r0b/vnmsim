import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { SimulatorContext } from "src/store/dispatcher";
import { LocaleContext } from "src/locale/dispatcher";

import { Button, Dialog, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions, DialogTrigger, Table, TableBody, TableCell, TableRow } from "@fluentui/react-components";
import { ArrowRotateClockwise24Filled } from "@fluentui/react-icons";

import * as Styles from "./stats.styles";

interface IItem {
  type: string
  count: number
}

interface IProps {
  show: boolean;
  onDismiss: Function;
}

const Stats = observer((props:IProps) => {
  const Sim = useContext(SimulatorContext);
  const Locale = useContext(LocaleContext);

  const stats = Sim.getStats();

  const items:Array<IItem> = Object.entries(stats).map(([key, value], i) => ({
    type: key,
    count: +value
  }));

  return (
    <Dialog
      open={ props.show }
      onOpenChange={ () => props.onDismiss() }
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{ Locale.get("STATS") }</DialogTitle>
          <DialogContent style={ Styles.container }>
            <Table size="small">
              <TableBody>
                { items.map((item) => (
                  <TableRow key={ item.type } style={ Styles.row }>
                    <TableCell style={ Styles.cell }>{ item.type }</TableCell>
                    <TableCell style={ Styles.cell }>{ item.count }</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
          <DialogActions>
            <DialogTrigger>
              <Button 
                appearance="secondary"
                icon={ <ArrowRotateClockwise24Filled /> }
                onClick={ () => Sim.clearStats() }
              >
                { Locale.get("STATS_CLEAR") }
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
});

export default Stats;