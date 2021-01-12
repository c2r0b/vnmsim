import React from 'react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react';

interface Props {
  status: number;
  setStatus: Function;
};

const Header = (props:Props) => {
  const _items: ICommandBarItemProps[] = [
    {
      key: 'open',
      text: 'Open',
      iconProps: { iconName: 'OpenFolderHorizontal' },
      onClick: () => {

      }
    },
    {
      key: 'save',
      text: 'Save',
      iconProps: { iconName: 'Save' },
      onClick: () => {

      }
    },
    {
      key: 'help',
      text: 'Help',
      iconProps: { iconName: 'Help' },
      onClick: () => {

      }
    },
    {
      key: 'settings',
      text: 'Settings',
      iconProps: { iconName: 'Settings' },
      onClick: () => {

      }
    },
  ];

  const _farItems: ICommandBarItemProps[] = [
    {
      key: 'compile',
      text: 'Compile',
      ariaLabel: 'Compile',
      iconOnly: true,
      iconProps: { iconName: 'FileCode' },
      onClick: () => props.setStatus(5),
    },
    {
      key: 'play',
      text: 'Play',
      ariaLabel: 'Play',
      iconOnly: true,
      iconProps: { iconName: 'Play' },
      onClick: () => props.setStatus(1),
    },
    {
      key: 'singleStep',
      text: 'Single step',
      ariaLabel: 'Single step',
      iconOnly: true,
      iconProps: { iconName: 'Rerun' },
      onClick: () => props.setStatus(2),
    },
    {
      key: 'nextAction',
      text: 'Next action',
      ariaLabel: 'Next action',
      iconOnly: true,
      iconProps: { iconName: 'ReceiptForward' },
      onClick: () => props.setStatus(3),
    },
    {
      key: 'pause',
      text: 'Pause',
      ariaLabel: 'Pause',
      iconOnly: true,
      iconProps: { iconName: 'Pause' },
      onClick: () => props.setStatus(4),
    },
    {
      key: 'stop',
      text: 'Stop',
      ariaLabel: 'Stop',
      iconOnly: true,
      iconProps: { iconName: 'Stop' },
      onClick: () => props.setStatus(0),
    },
  ];

  return (
    <div className="header">
      <CommandBar
        items={_items}
        farItems={_farItems}
        ariaLabel="Use left and right arrow keys to navigate between commands"
      />
    </div>
  );
}

export default Header;
