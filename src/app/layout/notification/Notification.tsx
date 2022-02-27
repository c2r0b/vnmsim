import React, { useContext } from 'react';

import { SimulatorContext, LocaleContext } from "src/store/dispatcher";
import { observer } from "mobx-react-lite";

import { MessageBar, MessageBarType, Text } from '@fluentui/react';

import * as Styles from "./notification.styles";

const Notification = observer(() => {
  const Sim = useContext(SimulatorContext);
  const Locale = useContext(LocaleContext);

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
        dismissButtonAriaLabel={ Locale.get("CLOSE") }
      >
        <Text styles={ Styles.text }>
          { errorMessage }
        </Text>
      </MessageBar>
    </div>
  );
});

export default Notification;