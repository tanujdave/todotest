import {
  SET_TODOS,
  ADD_NEW_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  SET_BUCKETS,
} from "./types";

const initialState = {
  todos: [],
  isSearchingTodos: false,
  todosError: "",
  isAddingNewTodo: false,
  errorOnAdding: "",
  isUpdatingTodo: false,
  errorOnUpdating: "",
  isDeletingTodo: false,
  errorOnDeleting: "",
  warningInfos: {},

  buckets: [],
  isFetchingBuckets: false,
  bucketsError: "",
};

/**
 * Main function in charge of updating the state on the redux-store
 *
 * @param {object} state Contains the properties needed to be updated
 * @param {object} action Sets what should be updated on the state
 */
export default (state = initialState, action: any) => {  
  switch (action.type) {
    case "CLEAR_REDUCER":
      return initialState;

    case SET_BUCKETS:
      return {
        ...state,
        buckets: action.buckets,
        isFetchingBuckets: action.isFetchingBuckets,
        bucketsError: action.bucketsError,
      };

    case SET_TODOS:
      return {
        ...state,
        todos: action.todos,
        isSearchingTodos: action.isSearchingTodos,
        todosError: action.todosError,
      };

    case ADD_NEW_TODO:
      return {
        ...state,
        isAddingNewTodo: action.isAddingNewTodo,
        errorOnAdding: action.errorOnAdding,
        warningInfos: action.warningInfos,
      };

    case UPDATE_TODO:
      return {
        ...state,
        isUpdatingTodo: action.isUpdatingTodo,
        errorOnUpdating: action.errorOnUpdating,
        warningInfos: action.warningInfos,
        todos:
          action.isUpdatingTodo || action.onDeletingError
            ? state.todos
            : state.todos.map((todo: any) =>
                todo.id !== action.todo.id ? todo : { ...todo, ...action.todo }
              ),
      };

    case DELETE_TODO:
      return {
        ...state,
        isDeletingTodo: action.isDeletingTodo,
        errorOnDeleting: action.errorOnDeleting,
        warningInfos: action.warningInfos,
        todos:
          action.isDeletingTodo || action.errorOnDeleting
            ? state.todos
            : state.todos.filter((todo: any) => todo.id !== action.todo.id),
      };

    default:
      return state;
  }
};
