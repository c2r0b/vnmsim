import styled from "styled-components"

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: calc(100vh - 123px);
  width: 100%;
  z-index: 100;
`;

export const RamHalf = styled.div`
  overflow-y: auto;
`;

export const VerticalHalf = styled.div`
  position: relative;
  width: 100%;
  overflow: auto;
`;

export const Cell = styled.div`
  font-size: 11px;
`;