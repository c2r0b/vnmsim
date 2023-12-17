import styled from 'styled-components'
import { Text } from '@fluentui/react-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-top: 17px;
  margin-left: 15px;
`;

export const Title = styled(Text)`
  font-size: 21px;
  font-weight: 600;
  line-height: 0;
`;

export const CreationDate = styled(Text)`
  font-size: 9px;
  padding-top: 10px;
  cursor: default;
`;