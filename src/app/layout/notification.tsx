import React from 'react';

import { MessageBar, MessageBarType, Text } from '@fluentui/react';

import * as Styles from "./notification.styles";

const Notification = (props) => {
  const errorMessage = props.store.getError();

  if (errorMessage === undefined) {
    return null;
  }

  return (
    <div style={ Styles.container }>
      <MessageBar
        styles={ Styles.message }
        messageBarType={ MessageBarType.error }
        isMultiline={ false }
        onDismiss={ () => props.store.dismissError() }
        dismissButtonAriaLabel="Close"
      >
        <Text styles={ Styles.text }>
          { errorMessage }
        </Text>
      </MessageBar>
    </div>
  );
};

export default Notification;