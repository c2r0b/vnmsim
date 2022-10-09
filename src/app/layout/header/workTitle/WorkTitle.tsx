import React, { useRef, useContext } from "react";
import { observer } from "mobx-react-lite";

import { SimulatorContext } from "src/store/dispatcher";
import { Localize } from "src/locale/Localize";

import { Text, Stack } from '@fluentui/react';
import ContentEditable from "react-contenteditable";

import * as Styles from "./workTitle.styles";

const WorkTitle = observer(() => {
  const Sim = useContext(SimulatorContext);

  const workTitleRef = useRef();

  const onTitleChange = (ev) => {
    Sim.setTitle(ev.target.value);
  };

  return (
    <div style={ Styles.container }>
      <Stack>
        <Text styles={ Styles.title }>
          <ContentEditable
            tagName="pre"
            innerRef={ workTitleRef }
            html={ Sim.getTitle() }
            onChange={ onTitleChange }
          />
        </Text>
        <Text styles={ Styles.date }>
          <Localize label="CREATED_ON"/> { Sim.getOpenDate() }
        </Text>
      </Stack>
    </div>
  );
});

export default WorkTitle;
