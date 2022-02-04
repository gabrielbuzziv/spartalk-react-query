import { FlatList } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  background: #f7f7f7;

  flex: 1;

  padding: 20px 0;
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: {
    padding: 20
  },
})`` as React.ComponentType as new <T>() => FlatList<T>;

export const Title = styled.Text`
  color: #026FF9;
  font-size: 18px;
  font-weight: bold;
  
  margin-bottom: 20px;
`;