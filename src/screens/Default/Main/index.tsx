import React, { useCallback, useEffect, useState } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { Create } from '../../../components/Create';
import { Empty } from '../../../components/Empty';
import { TodoItem } from '../../../components/TodoItem';
import { Todo } from '../../../domains/todos';
import { createTodoUseCase } from '../../../useCases/Todos/createTodoUseCase';
import { getTodosListUseCase } from '../../../useCases/Todos/getTodosListUseCase';
import { markAsDoneUseCase } from '../../../useCases/Todos/markAsDoneUseCase';
import { Container, List, Title } from './styles';

export function DefaultMain() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const [data, setData] = useState<Todo[]>([] as Todo[]);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);

      const listOfTodos = await getTodosListUseCase({ done: false });
      setData(listOfTodos);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshData = useCallback(async () => {
    try {
      setIsRefreshing(true);

      const listOfTodos = await getTodosListUseCase({ done: false });
      setData(listOfTodos);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const onDone = useCallback(
    async (id: string) => {
      await markAsDoneUseCase({ todoId: id });
      refreshData();
    },
    [refreshData]
  );

  const onCreate = useCallback(
    async (description: string) => {
      try {
        setIsCreating(true);
        await createTodoUseCase({ description });
        refreshData();
      } finally {
        setIsCreating(false);
      }
    },
    [refreshData]
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Todo>) => {
      return <TodoItem data={item} onDone={() => onDone(item.id)} />;
    },
    [onDone]
  );

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Create loading={isCreating} onCreate={onCreate} />

      <List
        data={data}
        keyExtractor={item => `default-todo-${item.id}`}
        renderItem={renderItem}
        refreshing={isRefreshing}
        onRefresh={refreshData}
        ListHeaderComponent={<Title>Lista de tarefas</Title>}
        ListEmptyComponent={<Empty />}
      />
    </Container>
  );
}
