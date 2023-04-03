import React, { useContext } from 'react';

import { SimulatorContext } from "src/store/dispatcher";
import { observer } from "mobx-react-lite";
import { useT } from '@transifex/react';

import { Alert } from "@fluentui/react-components/unstable";
import { Text } from "@fluentui/react-components";

import * as Styles from "./notification.styles";

const Notification = observer(() => {
  const Sim = useContext(SimulatorContext);
  const t = useT();

  const errorMessage = Sim.getError();

  if (errorMessage === undefined) {
    return null;
  }

  return (
    <div style={ Styles.container }>
      <Alert
        intent="error"
        action={ t("Close") }
        onClick={ () => Sim.dismissError() }
      >
        <Text style={ Styles.text }>
          { errorMessage }
        </Text>
      </Alert>
    </div>
  );
});

export default Notification;