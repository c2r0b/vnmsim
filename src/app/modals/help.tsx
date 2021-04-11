import React from "react";
import { Panel } from "@fluentui/react";

const Help = (props) => {
  return (
    <Panel
      headerText="Help"
      isOpen={ props.show }
      onDismiss={ props.onDismiss }
      closeButtonAriaLabel="Close"
    >
      <p>Content goes here.</p>
    </Panel>
  );
};

export default Help;
