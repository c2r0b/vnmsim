import React from "react";
import DarkModeToggle from "react-dark-mode-toggle";

import {
  Stack, MessageBar, CommandBar, ICommandBarItemProps
} from"@fluentui/react";

import * as Styles from "./footer.styles";

const Footer = (props:Props) => {
  const darkMode = props.store.getDarkMode();

  const _items: ICommandBarItemProps[] = [
    {
      key: 'github',
      text: 'GitHub',
      iconProps: { iconName: 'Github' },
      onClick: () => {

      }
    }
  ];

  return (
    <div className="footer">
      <Stack horizontal horizontalAlign="space-between">
        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <Stack.Item styles={ Styles.status }>
            <MessageBar>Idle</MessageBar>
          </Stack.Item>
        </Stack>
        <Stack horizontal>
          <CommandBar
            styles={ Styles.menu }
            items={ _items }
          />
          <Stack.Item styles={ Styles.lightDarkToggle }>
            {null/*<DarkModeToggle
              onChange={ () => props.store.toggleDarkMode() }
              checked={ darkMode }
              size={ 50 }
            />*/}
          </Stack.Item>
        </Stack>
      </Stack>
    </div>
  );
}

export default Footer;
