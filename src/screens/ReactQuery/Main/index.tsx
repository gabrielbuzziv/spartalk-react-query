import React, { useCallback, useRef } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Create } from '../../../components/Create';
import { Empty } from '../../../components/Empty';
import { TodoItem } from '../../../components/TodoItem';
import { Todo } from '../../../domains/todos';
import { todosQueryKeys } from '../../../services/queries';
import { createTodoUseCase } from '../../../useCases/Todos/createTodoUseCase';
import { getTodosListUseCase } from '../../../useCases/Todos/getTodosListUseCase';
import { markAsDoneUseCase } from '../../../useCases/Todos/markAsDoneUseCase';
import { Container, List, Title } from './styles';

import { useFocusEffect } from '@react-navigation/native'

export function ReactQueryMain() {
  const isScreenFocused = useRef(false);

  const queryClient = useQueryClient();
  const { data, refetch, isLoading, isRefetching } = useQuery(
    todosQueryKeys.pending,
    () => getTodosListUseCase({ done: false })
  );

  const createMutation = useMutation(createTodoUseCase, {
    onMutate: request => {
      queryClient.cancelQueries(todosQueryKeys.pending);
      const previousState = [
        ...queryClient.getQueryData<Todo[]>(todosQueryKeys.pending),
      ];

      queryClient.setQueryData<Todo[]>(todosQueryKeys.pending, oldData => {
        oldData.push({
          id: null,
          description: request.description,
          done: false,
        });

        return oldData;
      });

      return { previousState };
    },
    onError: (err, variables, context) => {
      const { previousState } = context as { previousState: Todo[] };

      queryClient.setQueryData<Todo[]>(
        todosQueryKeys.pending,
        () => previousState
      );
    },
    onSuccess: newData => {
      queryClient.setQueryData<Todo[]>(todosQueryKeys.pending, oldData =>
        oldData.map(data =>
          data.id === null ? { ...data, id: newData.id } : data
        )
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(todosQueryKeys.pending);
    }
  });

  const doneMutation = useMutation(markAsDoneUseCase, {
    onMutate: request => {
      queryClient.cancelQueries(todosQueryKeys.pending);
      const previousState = [
        ...queryClient.getQueryData<Todo[]>(todosQueryKeys.pending),
      ];

      queryClient.setQueryData<Todo[]>(todosQueryKeys.pending, oldData =>
        oldData.filter(data => data.id !== request.todoId)
      );

      return { previousState };
    },
    onError: (err, variables, context) => {
      const { previousState } = context as { previousState: Todo[] };

      queryClient.setQueryData<Todo[]>(
        todosQueryKeys.pending,
        () => previousState
      );
    },
  });

  const onCreate = useCallback(
    (description: string) => {
      createMutation.mutate({ description });
    },
    [createMutation]
  );

  const onDone = useCallback(
    (id: string) => {
      doneMutation.mutate({ todoId: id });
    },
    [createMutation]
  );

  const renderItem = useCallback(({ item }: ListRenderItemInfo<Todo>) => {
    return <TodoItem data={item} onDone={() => onDone(item.id)} />;
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (isScreenFocused.current) {
        refetch()
      } else {
        isScreenFocused.current = true
      }
    }, [refetch])
  )

  return (
    <Container>
      <Create onCreate={onCreate} />

      <List
        data={data}
        keyExtractor={item => `react-query-todos-${item.id}`}
        renderItem={renderItem}
        refreshing={isRefetching}
        onRefresh={refetch}
        ListHeaderComponent={<Title>Lista de tarefas</Title>}
        ListEmptyComponent={<Empty />}
      />
    </Container>
  );
}
