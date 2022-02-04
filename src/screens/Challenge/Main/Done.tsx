import React, { useCallback } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { useQuery } from 'react-query';
import { Empty } from '../../../components/Empty';
import { TodoItem } from '../../../components/TodoItem';
import { Todo } from '../../../domains/todos';
import { todosQueryKeys } from '../../../services/queries';
import { getTodosListUseCase } from '../../../useCases/Todos/getTodosListUseCase';
import { List } from './styles';

export function Done() {
  const { data, refetch, isLoading, isRefetching } = useQuery(
    todosQueryKeys.done,
    () => getTodosListUseCase({ done: true })
  );

  const renderItem = useCallback(({ item }: ListRenderItemInfo<Todo>) => {
    return <TodoItem data={item} />;
  }, []);

  return (
    <List
      data={data}
      keyExtractor={item => `challenge-todos-done-${item.id}`}
      renderItem={renderItem}
      refreshing={isRefetching}
      onRefresh={refetch}
      ListEmptyComponent={<Empty />}
    />
  );
}
