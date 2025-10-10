import styled from 'styled-components/native';
import * as cores from '../../../../styles/cores';

export const Container = styled.View`
  margin-top: 24px;
  margin-bottom: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 20px;
  margin-bottom: 12px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${cores.brancoTotal};
`;

export const ViewAllButton = styled.TouchableOpacity`
  padding: 4px 8px;
`;

export const ViewAllText = styled.Text`
  color: ${cores.vermelhoPrimario};
  font-size: 14px;
  font-weight: 600;
`;

export const CarouselContainer = styled.View`
  position: relative;
  height: 320px;
`;

export const ArrowButton = styled.TouchableOpacity`
  position: absolute;
  top: 130px;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const ArrowIcon = styled.Text`
  color: ${cores.vermelhoPrimario};
  font-size: 36px;
  font-weight: bold;
  line-height: 40px;
`;

export const IndicatorsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  gap: 8px;
`;

export const Indicator = styled.View<{ active: boolean }>`
  width: ${(props: { active: boolean }) => props.active ? '24px' : '8px'};
  height: 8px;
  border-radius: 4px;
  background-color: ${(props: { active: boolean }) => 
    props.active ? cores.vermelhoPrimario : cores.cinzaBorda
  };
`;


