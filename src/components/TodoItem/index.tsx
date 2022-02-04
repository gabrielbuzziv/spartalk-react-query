import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Todo } from '../../domains/todos';
import { Checkbox } from '../Checkbox';
import { Container, Description } from './styles';

interface TodoItemProps {
  data: Todo;
  onDone?: () => void;
}

export function TodoItem({ data, onDone }: TodoItemProps) {
  return (
    <Container>
      <Description>{data.description}</Description>

      {!data.done && (
        <>
          {data.id ? (
            <Checkbox onChange={onDone} />
          ) : (
            <ActivityIndicator size="small" />
          )}
        </>
      )}
    </Container>
  );
}
