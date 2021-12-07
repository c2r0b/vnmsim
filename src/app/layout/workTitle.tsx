import React, { useRef } from 'react';

import { Text, Stack } from '@fluentui/react';
import ContentEditable from "react-contenteditable";

import * as Styles from "./workTitle.styles";

const WorkTitle = (props:Props) => {
  const workTitleRef = useRef();

  const onTitleChange = (ev) => {
    props.store.setTitle(ev.target.value);
  };

  return (
    <div style={ Styles.container }>
      <Stack>
        <Text
          styles={ Styles.title}
        >
          <ContentEditable
            tagName="pre"
            innerRef={ workTitleRef }
            html={ props.store.getTitle() }
            onChange={ onTitleChange }
          />
        </Text>
        <Text styles={ Styles.date }>
          Created on { props.store.getOpenDate() }
        </Text>
      </Stack>
    </div>
  );
};

export default WorkTitle;
