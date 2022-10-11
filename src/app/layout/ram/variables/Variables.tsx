import React, { useState, useContext } from "react";
import { observer } from "mobx-react-lite";

import { SimulatorContext } from "src/store/dispatcher";
import { LocaleContext } from "src/locale/dispatcher";
import { Localize } from "src/locale/Localize";

import { Add24Filled } from "@fluentui/react-icons";

import { Text, Tooltip, Button, Input } from "@fluentui/react-components";
import { Table, TableBody, TableCell, TableCellLayout, TableRow } from "@fluentui/react-components/unstable";

import * as RamStyles from "../ram.styles";
import * as Styles from "./variables.styles";

const variables = ["X", "Y", "Z", "W"];

interface IProps {
  focusedVar?: string
}

export const Variables = observer((props:IProps) => {
  const Sim = useContext(SimulatorContext);
  const Locale = useContext(LocaleContext);

  const [lastTvariable, setLastTvariable] = useState(10);

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

  const onVariableChange = (key, value) => {
    console.log(value)
    const newValue = value.value || value.displayValue;
    if (newValue === undefined) return;
    Sim.setVariable(key, newValue);
  };

  const addVariable = () => {
    Sim.setVariable("T" + (lastTvariable + 1), 0);
    setLastTvariable(lastTvariable + 1);
  };

  return (
    <>
      <div style={ RamStyles.verticalHalf }>
        <div style={ RamStyles.title }>
          <Text style={ RamStyles.titleText }>
            <Localize label="VARIABLES"/>
          </Text>
          <Tooltip
            content={ Locale.get("ADD_VARIABLE") }
            relationship="label"
            withArrow
          >
            <Button
              aria-label={ Locale.get("ADD_VARIABLE") }
              icon={ <Add24Filled /> }
              onClick={ addVariable }
              style={ RamStyles.titleButton }
              appearance="subtle"
            />
          </Tooltip>
        </div>
        <Table size="small">
          <TableBody>
            { items.map(item => (
              <TableRow key={ item.type }>
                <TableCell style={ Styles.typeCell }>
                  { item.type }
                </TableCell>
                <TableCell style={ Styles.inputCell }>
                  <TableCellLayout>
                    <Input
                      type="number"
                      appearance="filled-lighter"
                      step={ 1 }
                      value={ Sim.getVariable(item.type) }
                      onChange={ (e, v) => onVariableChange(item.type, v) }
                      style={ props.focusedVar === item.type ? Styles.focusedVar : Styles.varSpin }
                    />
                  </TableCellLayout>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
});