import React, { useState, useContext } from "react";
import { observer } from "mobx-react-lite";

import { SimulatorContext, LocaleContext } from "src/store/dispatcher";
import { Localize } from "src/locale/Localize";

import {
  Stack, Text, TooltipHost, IconButton, DetailsList,
  SelectionMode, DetailsListLayoutMode, IColumn,
  SpinButton
} from "@fluentui/react";

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

  const columns:IColumn[] = [
    {
      key: "type",
      name: "Type",
      fieldName: "type",
      data: "string",
      minWidth: 30,
      maxWidth: 30,
      isPadded: true
    },
    {
      key: "value",
      name: "Value",
      fieldName: "value",
      data: "number",
      minWidth: 30,
      isPadded: false,
      onRender: (item) => {
        return (
          <SpinButton
            step={ 1 }
            value={ Sim.getVariable(item.type) }
            onChange={ (e, v) => onVariableChange(item.type, v) }
            styles={ props.focusedVar === item.type ? Styles.focusedVar : Styles.varSpin }
          />
        );
      },
    }
  ];

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

  const onVariableChange = (key, newValue) => {
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
          <Stack horizontal horizontalAlign="space-between">
            <p/>
            <Text styles={ RamStyles.titleText }>
              <Localize label="VARIABLES"/>
            </Text>
            <TooltipHost
              content={ Locale.get("ADD_VARIABLE") }
              calloutProps={{ gapSpace: 0 }}
            >
              <IconButton
                ariaLabel={ Locale.get("ADD_VARIABLE") }
                iconProps={{ iconName: "Add" }}
                onClick={ addVariable }
                styles={ RamStyles.titleButton }
              />
            </TooltipHost>
          </Stack>
        </div>
        <DetailsList
          items={ items }
          compact={ true }
          columns={ columns }
          selectionMode={ SelectionMode.none }
          layoutMode={ DetailsListLayoutMode.justified }
          isHeaderVisible={ false }
        />
      </div>
    </>
  );
});