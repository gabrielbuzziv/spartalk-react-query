import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 0 20px;
`;

export const Input = styled.TextInput`
  background: white;
  border: 1px solid #DDD;
  border-radius: 3px;
  
  font-size: 16px;

  flex: 1;

  height: 50px;
  padding: 0 10px;
  margin-right: 10px;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
  hitSlop: { bottom: 20, top: 20, }
})`
  padding: 0 10px;
`

export const ButtonText = styled.Text`
  color: #424242;
  font-size: 16px;
`;