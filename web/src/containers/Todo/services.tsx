import {
  setSearchTodos,
  addNewTodo,
  updateTodo,
  deleteTodo,
  setFetchBuckets,
} from "./actions";
import { get, post, put, delete_entry } from "@utils";
import { isObject } from "lodash";

export const fetchBuckets = () => async (dispatch: any) => {
  let path = `/buckets`;

  dispatch(
    setFetchBuckets({
      isFetchingBuckets: true,
      bucketsError: "",
    })
  );

  try {
    const response = await get(path);
    dispatch(
      setFetchBuckets({
        buckets: response.data.data,
        isFetchingBuckets: false,
        bucketsError: "",
      })
    );
  } catch (error) {
    dispatch(
      setFetchBuckets({
        buckets: [],
        isFetchingBuckets: false,
        bucketsError: error,
      })
    );
  }
};

export const fetchTodos = () => async (dispatch: any) => {
  let path = `/todos`;

  dispatch(
    setSearchTodos({
      isSearchingTodos: true,
      todosError: "",
    })
  );

  try {
    const todos = await get(path);
    dispatch(
      setSearchTodos({
        todos: todos.data.data,
        isSearchingTodos: false,
        todosError: "",
      })
    );
  } catch (error) {
    dispatch(
      setSearchTodos({
        todos: [],
        isSearchingTodos: false,
        todosError: error,
      })
    );
  }
};

export const createNewTodo = (todo: any) => async (dispatch: any) => {
  const path = "/todos";

  dispatch(
    addNewTodo({
      isAddingNewTodo: true,
    })
  );

  try {
    post(path, { todo: todo }).then((data) => {
      const newTodo = data.data;
      dispatch(
        addNewTodo({
          todo: newTodo,
          isAddingNewTodo: false,
          successMessage: "Todo added successfully",
        })
      );
      fetchTodos()(dispatch);
    });
  } catch (err) {
    dispatch(
      addNewTodo({
        isAddingNewTodo: false,
        errorOnAdding: err.message,
      })
    );
  }
};

export const updateTodoData = (todo: any) => (dispatch: any) => {
  const path = `/todos/${todo.id}`;

  if (isObject(todo.bucket)) {
    todo.bucket = todo.bucket.name;
  }

  dispatch(
    updateTodo({
      isUpdatingTodo: true,
    })
  );

  try {
    put(path, { todo }).then((data) => {
      dispatch(
        updateTodo({
          todo: todo,
          isUpdatingTodo: false,
          successMessage: "Todo updated successfully",
        })
      );
      fetchTodos()(dispatch);
    });
  } catch (err) {
    dispatch(
      updateTodo({
        isUpdatingTodo: false,
        errorOnUpdating: err.message,
      })
    );
  }
};

export const deleteTodoData = (todo: any) => async (dispatch: any) => {
  const path = `/todos/${todo.id}`;

  dispatch(
    deleteTodo({
      isDeletingTodo: true,
    })
  );

  try {
    delete_entry(path).then((data) => {
      dispatch(
        deleteTodo({
          todo: todo,
          isDeletingTodo: false,
          successMessage: "Todo updated successfully",
        })
      );
      fetchTodos()(dispatch);
    });
  } catch (err) {
    dispatch(
      deleteTodo({
        isDeletingTodo: false,
        errorOnDeleting: err.message,
      })
    );
  }
};
