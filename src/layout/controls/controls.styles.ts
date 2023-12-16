import styled from 'styled-components'
import { Slider as FluentUISlider } from '@fluentui/react-components'
import { AnimalRabbit24Regular, AnimalTurtle24Regular } from '@fluentui/react-icons'

export const Container = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  padding-top: 5px;
  padding-right: 15px;
  background-color: var(--white);
  border-top: 1px solid var(--lightBorder);
  z-index: 900;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
`;

export const Controls = styled.div`
  padding-top: 10px;
  padding-left: 15px;
  padding-bottom: 15px;
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

export const SliderContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin-top: -5px;
`;

export const SliderSlowIcon = styled(AnimalTurtle24Regular)`
  margin-top: 17px;
`;

export const SliderFastIcon = styled(AnimalRabbit24Regular)`
  margin-top: 17px;
`;

export const Slider = styled(FluentUISlider)`
  width: 150px;
`;
