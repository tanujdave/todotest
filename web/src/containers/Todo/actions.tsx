import {
  SET_TODOS,
  ADD_NEW_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  SET_BUCKETS,
} from "./types";

export const setFetchBuckets = (data: { [key: string]: any }) => ({
  type: SET_BUCKETS,
  buckets: data.buckets,
  isFetchingBuckets: data.isFetchingBuckets,
  bucketsError: data.bucketsError,
});

export const setSearchTodos = (data: { [key: string]: any }) => ({
  type: SET_TODOS,
  todos: data.todos,
  isSearchingTodos: data.isSearchingTodos,
  todosError: data.todosError,
});

export const addNewTodo = (data: { [key: string]: any }) => ({
  type: ADD_NEW_TODO,
  todo: data.todo,
  isAddingNewTodo: data.isAddingNewTodo,
  errorOnAdding: data.errorOnAdding,
  warningInfos: data.warningInfos,
});

export const updateTodo = (data: { [key: string]: any }) => ({
  type: UPDATE_TODO,
  todo: data.todo,
  isUpdatingTodo: data.isUpdatingTodo,
  errorOnUpdating: data.errorOnUpdating,
  warningInfos: data.warningInfos,
});

export const deleteTodo = (data: { [key: string]: any }) => ({
  type: DELETE_TODO,  
  todo: data.todo,
  isDeletingTodo: data.isDeletingTodo,
  errorOnDeleting: data.errorOnDeleting,
  warningInfos: data.warningInfos,
});
