import React, { useContext } from 'react';

import { SimulatorContext } from "src/store/dispatcher";
import { observer } from "mobx-react-lite";

import { MessageBar, MessageBarType, Text } from '@fluentui/react';

import * as Styles from "./notification.styles";

const Notification = observer(() => {
  const Sim = useContext(SimulatorContext);
  const errorMessage = Sim.getError();

  if (errorMessage === undefined) {
    return null;
  }

  return (
    <div style={ Styles.container }>
      <MessageBar
        styles={ Styles.message }
        messageBarType={ MessageBarType.error }
        isMultiline={ false }
        onDismiss={ () => Sim.dismissError() }
        dismissButtonAriaLabel="Close"
      >
        <Text styles={ Styles.text }>
          { errorMessage }
        </Text>
      </MessageBar>
    </div>
  );
});

export default Notification;