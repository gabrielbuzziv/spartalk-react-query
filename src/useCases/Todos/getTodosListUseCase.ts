import { Todo } from '../../domains/todos';
import { TodoDTO } from '../../dtos/todos';
import { api } from '../../services/api';

interface GetTodosListUseCaseParams {
  done?: boolean;
}

export async function getTodosListUseCase({
  done = false,
}: GetTodosListUseCaseParams): Promise<Todo[]> {
  const response = await api.get<TodoDTO[]>(`/todos`, {
    params: { done: done ?? false },
  });

  const todos = response.data;

  return todos;
}
