import { Todo } from "../../domains/todos";
import { TodoDTO } from "../../dtos/todos";
import { api } from "../../services/api";

interface MarkAsDoneUseCaseParams {
  todoId: string;
}

export async function markAsDoneUseCase({ todoId }: MarkAsDoneUseCaseParams): Promise<Todo> {
  const response = await api.put<TodoDTO>(`/todos/${todoId}`, {
    done: true
  });

  const todo = response.data;

  return todo;
}