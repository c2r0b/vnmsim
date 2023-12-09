import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  top: 50px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  display: none;
  &.dragging {
    display: block;
  }
`;

export const OverflowBg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #ccc;
  opacity: 0.6;
`;

export const MessageContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  bottom: 10px;
  left: 10px;
  border: 3px dashed black;
  text-align: center;
`;

export const Message = styled.p`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 15px;
  background-color: black;
  font-size: 12px;
  color: white;
`;