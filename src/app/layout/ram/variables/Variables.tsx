import React, { useState, useContext } from "react";
import { observer } from "mobx-react-lite";

import { SimulatorContext } from "src/store/dispatcher";
import { useT } from "@transifex/react";

import { Add24Filled } from "@fluentui/react-icons";

import { Tooltip, Button, Table, TableBody, TableCell, TableCellLayout, TableRow } from "@fluentui/react-components";

import * as RamStyles from "../ram.styles";
import * as Styles from "./variables.styles";

const variables = ["X", "Y", "Z", "W"];

interface IProps {
  focusedVar?: string
}

export const Variables = observer((props:IProps) => {
  const Sim = useContext(SimulatorContext);
  const t = useT();

  const [lastTvariable, setLastTvariable] = useState(20);

  const interval = Sim.getInterval();

  // generate T variables
  const allVariables = [
    ...variables, 
    ...Array.from(
      Array(lastTvariable).keys()
    ).map(i => "T" + ++i)
  ];

  const items = allVariables.map((key, i) => ({
    key: i.toString(),
    type: key,
    value: Sim.getVariable(key)
  }));

  const onChange = (key, event) => {
    const newValue = event.target.value;
    if (newValue === undefined) return;
    Sim.setVariable(key, newValue);
  };

  const addVariable = () => {
    Sim.setVariable("T" + (lastTvariable + 1), 0);
    setLastTvariable(lastTvariable + 1);
  };

  const displayVariable = (item) => {
    const value = Sim.getVariable(item.type);
    let style = Styles.varSpin;

    // change style on focus variable
    if (props.focusedVar === item.type && interval !== 0) {
      style = Styles.focusedVar;
    }

    return (
      <TableRow key={ item.type } style={ RamStyles.row }>
        <TableCell style={ Styles.typeCell }>
          { item.type }
        </TableCell>
        <TableCell style={ Styles.inputCell }>
          <TableCellLayout>
            <input
              type="number"
              step={ 1 }
              value={ value }
              onChange={ (e) => onChange(item.type, e) }
              style={ style }
            />
          </TableCellLayout>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div style={ RamStyles.verticalHalf }>
      <Table size="small">
        <TableBody>
          { items.map(displayVariable) }
          <TableRow>
            <Tooltip
              content={ t("Add T variable") }
              relationship="label"
              withArrow
            >
              <Button
                aria-label={ t("Add T variable") }
                icon={ <Add24Filled /> }
                onClick={ addVariable }
                appearance="subtle"
              />
            </Tooltip>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
});