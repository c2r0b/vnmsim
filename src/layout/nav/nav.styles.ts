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
  font-size: 11px;
  padding: 17px 20px;
  color: white;
  &:hover {
    color: white;
  }
`;

export const MenuItem = styled.div`
  &:hover {
    cursor: pointer;
    background-color: #222;
  }
`;

export const Logo = styled(Image)`
  width: 35px;
  height: 35px;
  border: 1px solid var(--logoOrange);
  border-radius: 100px;
  margin-top: 12px;
  margin-left: 7px;
  margin-right: 10px;
  cursor: default;
`;