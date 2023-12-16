import styled from 'styled-components'
import { TableCell, TableRow, SpinButton } from '@fluentui/react-components'

export const VarSpin = styled(SpinButton)`
  padding: 3px;
  margin: 0;
  min-height: 0;
  border: 0;
  &.focused {
    background-color: #f9c55b;
  }
`;

export const TypeCell = styled(TableCell)`
  width: 55px;
  font-size: 10px;
`;

export const InputCell = styled(TableCell)`
  padding: 2px;
`;

export const Row = styled(TableRow)`
  border: none;
`;