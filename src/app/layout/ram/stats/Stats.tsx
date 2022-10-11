import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { SimulatorContext } from "src/store/dispatcher";
import { LocaleContext } from "src/locale/dispatcher";
import { Localize } from "src/locale/Localize";

import { Text, Tooltip, Button } from "@fluentui/react-components";
import { Table, TableBody, TableCell, TableRow } from "@fluentui/react-components/unstable";

import { ArrowRotateClockwise24Filled } from "@fluentui/react-icons";

import * as Styles from "../ram.styles";

interface IItem {
  type: string
  count: number
}
export const Statistics = observer(() => {
  const Sim = useContext(SimulatorContext);
  const Locale = useContext(LocaleContext);

  const stats = Sim.getStats();

  const items:Array<IItem> = Object.entries(stats).map(([key, value], i) => ({
    type: key,
    count: +value
  }));

  return (
    <>
      <div style={ Styles.verticalHalf }>
        <div style={ Styles.title }>
          <Text style={ Styles.titleText }>
            <Localize label="STATS"/>
          </Text>
          <Tooltip
            content={ Locale.get("STATS_CLEAR") }
            relationship="label"
            withArrow
          >
            <Button
              aria-label={ Locale.get("STATS_CLEAR") }
              icon={ <ArrowRotateClockwise24Filled /> }
              onClick={ () => Sim.clearStats() }
              style={ Styles.titleButton }
              appearance="subtle"
            />
          </Tooltip>
        </div>
        <Table size="small">
          <TableBody>
            { items.map((item) => (
              <TableRow key={ item.type }>
                <TableCell style={ Styles.cell }>{ item.type }</TableCell>
                <TableCell style={ Styles.cell }>{ item.count }</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
});