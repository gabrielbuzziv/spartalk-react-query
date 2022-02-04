import React, { useCallback } from 'react';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { useMutation, useQueryClient } from 'react-query';
import { Create } from '../../../components/Create';
import { Todo } from '../../../domains/todos';
import { todosQueryKeys } from '../../../services/queries';
import { createTodoUseCase } from '../../../useCases/Todos/createTodoUseCase';
import { Done } from './Done';
import { Pending } from './Pending';
import { Container } from './styles';

const renderScene = SceneMap({
  pending: Pending,
  done: Done,
});

export function Challenge() {
  const queryClient = useQueryClient();

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
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'pending', title: 'Pendentes' },
    { key: 'done', title: 'Completos' },
  ]);

  const onCreate = useCallback(
    (description: string) => {
      createMutation.mutate({ description });
    },
    [createMutation]
  );

  return (
    <Container>
      <Create onCreate={onCreate} />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={props => (
          <TabBar
            {...props}
            tabStyle={{
              backgroundColor: '#f7f7f7',
            }}
            inactiveColor="#424242"
            activeColor="#026FF9"
            style={{
              marginTop: 10,
            }}
          />
        )}
      />
    </Container>
  );
}
