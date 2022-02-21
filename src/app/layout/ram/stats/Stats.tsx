import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { SimulatorContext } from "src/store/dispatcher";

import {
  Stack, Text, TooltipHost, IconButton, DetailsList,
  SelectionMode, DetailsListLayoutMode, IColumn
} from "@fluentui/react";

import * as Styles from "../ram.styles";

const columns:IColumn[] = [
  {
    key: "type",
    name: "Type",
    fieldName: "type",
    data: "string",
    minWidth: 90,
    isPadded: true
  },
  {
    key: "count",
    name: "Count",
    fieldName: "count",
    data: "number",
    minWidth: 20,
    isPadded: true
  }
];

export const Statistics = observer(() => {
  const Sim = useContext(SimulatorContext);

  const stats = Sim.getStats();

  const items = Object.entries(stats).map(([key, value], i) => ({
    key: i.toString(),
    type: key,
    count: value
  }));

  return (
    <>
      <div style={ Styles.verticalHalf }>
        <div style={ Styles.title }>
          <Stack horizontal horizontalAlign="space-between">
            <p/>
            <Text styles={ Styles.titleText }>
              Statistics
            </Text>
            <TooltipHost
              content={ "Clear statistics" }
              calloutProps={{ gapSpace: 0 }}
            >
              <IconButton
                ariaLabel="Clear statistics"
                iconProps={{ iconName: "ClearStats" }}
                onClick={ () => Sim.clearStats() }
                styles={ Styles.titleButton }
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