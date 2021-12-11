import React from "react";
import { Panel, PanelType } from "@fluentui/react";

const Settings = (props) => {
  return (
    <Panel
      headerText="Settings"
      isOpen={ props.show }
      isLightDismiss={ true }
      type={ PanelType.custom }
      styles={{ main: { width: 480 }}}
      onDismiss={ props.onDismiss }
      closeButtonAriaLabel="Close"
    >
      
    </Panel>
  );
};

export default Settings;
