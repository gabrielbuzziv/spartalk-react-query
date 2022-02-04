import React, { useCallback } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Empty } from '../../../components/Empty';
import { TodoItem } from '../../../components/TodoItem';
import { Todo } from '../../../domains/todos';
import { todosQueryKeys } from '../../../services/queries';
import { getTodosListUseCase } from '../../../useCases/Todos/getTodosListUseCase';
import { markAsDoneUseCase } from '../../../useCases/Todos/markAsDoneUseCase';
import { List } from './styles';

export function Pending() {
  const queryClient = useQueryClient();
  const { data, refetch, isLoading, isRefetching } = useQuery(
    todosQueryKeys.pending,
    () => getTodosListUseCase({ done: false })
  );

  const doneMutation = useMutation(markAsDoneUseCase, {
    onMutate: request => {
      queryClient.cancelQueries(todosQueryKeys.pending);
      const previousStatePending = [
        ...queryClient.getQueryData<Todo[]>(todosQueryKeys.pending),
      ];

      const previousStateDone = [
        ...queryClient.getQueryData<Todo[]>(todosQueryKeys.done),
      ];

      queryClient.setQueryData<Todo[]>(todosQueryKeys.pending, oldData =>
        oldData.filter(data => data.id !== request.todoId)
      );

      queryClient.setQueryData<Todo[]>(todosQueryKeys.done, oldData => {
        const doneTodo = previousStatePending.find(item => item.id === request.todoId);

        oldData.push({
          ...doneTodo,
          done: true
        })

        return oldData
      });

      return { previousStatePending, previousStateDone };
    },
    onError: (err, variables, context) => {
      const { previousStatePending, previousStateDone } = context as { previousStatePending: Todo[], previousStateDone: Todo[] };

      queryClient.setQueryData<Todo[]>(
        todosQueryKeys.pending,
        () => previousStatePending
      );

      queryClient.setQueryData<Todo[]>(
        todosQueryKeys.done,
        () => previousStateDone
      );
    },
  });

  const onDone = useCallback((id: string) => {
    doneMutation.mutate({ todoId: id });
  }, []);




  const renderItem = useCallback(({ item }: ListRenderItemInfo<Todo>) => {
    return <TodoItem data={item} onDone={() => onDone(item.id)} />;
  }, []);

  return (
    <List
      data={data}
      keyExtractor={item => `challenge-todos-pending-${item.id}`}
      renderItem={renderItem}
      refreshing={isRefetching}
      onRefresh={refetch}
      ListEmptyComponent={<Empty />}
    />
  );
}
