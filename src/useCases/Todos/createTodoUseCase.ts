import { AxiosResponse } from "axios";
import { Todo } from "../../domains/todos";
import { TodoDTO } from "../../dtos/todos";
import { api } from "../../services/api";

interface CreateTodoUseCaseParams {
  description: string;
}

export async function createTodoUseCase({ description }: CreateTodoUseCaseParams): Promise<Todo> {
  const response = await api.post<CreateTodoUseCaseParams, AxiosResponse<TodoDTO>>(`/todos`, {
    description
  });

  const todo = response.data;

  return todo;
}