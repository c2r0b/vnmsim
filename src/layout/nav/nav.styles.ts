import Image from 'next/image'
import styled from 'styled-components'
import { Button } from '@fluentui/react-components'

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  width: 100%;
  padding-top: 0;
  background-color: black;
  border-bottom: 1px solid var(--lightBorder);
  display: flex;
  flex-direction: row;
  z-index: 9999;
`;

export const Input = styled.input`
  display: "none";
`;

export const MenuButton = styled(Button)`
  min-width: 0;
  font-weight: 500;
  font-size: 12px;
  padding: 17px 20px;
  color: #cccccc;
  &:hover {
    color: white;
  }
`;

export const MenuItem = styled.div`
  &:before {
    position: absolute;
    top: 20px;
    content: "";
    width: 1px;
    height: 20px;
    background-color: #232125;
  }
  &:hover {
    cursor: pointer;
  }
`;