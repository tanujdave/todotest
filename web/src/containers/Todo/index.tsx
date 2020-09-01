import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Main } from "@templates";
import { Modal } from "@components";
import {
  fetchBuckets,
  fetchTodos,
  createNewTodo,
  updateTodoData,
  deleteTodoData,
} from "./services";
import TodoItem from "./TodoItem";
import TodoItemForm from "./TodoItemForm";

import {
  PageContainer,
  TodoItemWrap,
  TodoItemsContainer,
  TodoItemInner,
  AddNewTodoAction,
} from "./styles";

interface BucketProps {
  id: number;
  name: string;
}

interface TodoProps {
  id: number;
  name: string;
  isCompleted: boolean;
  bucket: BucketProps;
  createdAt: string;
}

const Todo: React.FC<any> = ({
  todos,
  buckets,
  dispatch,
  location,
  match,
  isSearchingTodos,
  isDeletingTodo,
  isUpdatingTodo,
}) => {
  let history = useHistory();
  const { state = {} } = location;
  const { modal } = state;
  const {
    params: { id },
  } = match;
  const selectedTodo =
    modal && todos ? todos.find((todo: TodoProps) => todo.id == id) : null;  

  useLayoutEffect(() => {
    fetchTodos()(dispatch);
    fetchBuckets()(dispatch);

    return () => {
      dispatch({ type: "CLEAR_REDUCER" });
    };
  }, []);

  const deleteHandler = (todo: TodoProps) => {
    deleteTodoData(todo)(dispatch);
  };

  const toggleStatusHandler = (todo: TodoProps, checked: boolean) => {
    todo.isCompleted = checked;
    updateTodoData(todo)(dispatch);
  };

  const renderTodoItems = (todos: TodoProps[]) => {
    return (
      <>
        {todos.map((todo: TodoProps) =>
          TodoItem({ todo, deleteHandler, toggleStatusHandler })
        )}
      </>
    );
  };

  const handleSubmit = ({ todo }: { todo: TodoProps }) => {
    todo.id ? updateTodoData(todo)(dispatch) : createNewTodo(todo)(dispatch);
    history.push("/");
  };

  const renderNewTodoItemPlaceholder = () => {
    return (
      <TodoItemWrap className="todo-placeholder">
        <TodoItemInner>
          <Link
            to={{
              pathname: `/todos/add-new`,
              state: { modal: true },
            }}
          >
            <AddNewTodoAction>
              <span className="add-icon">+</span>
              Add new todo
            </AddNewTodoAction>
          </Link>
        </TodoItemInner>
      </TodoItemWrap>
    );
  };

  return (
    <Main>
      <PageContainer>
        <TodoItemsContainer>
          {renderNewTodoItemPlaceholder()}
          {todos && renderTodoItems(todos)}
        </TodoItemsContainer>
      </PageContainer>

      {modal && todos && (
        <Modal
          title={
            "add-new" === id
              ? "Add new todo item"
              : `Edit todo '${selectedTodo && selectedTodo.name}'`
          }
          closeHandler={() => {
            history.push("/");
          }}
        >
          <TodoItemForm
            todo={todos.find((todo: TodoProps) => todo.id == id)}
            buckets={buckets}
            formType={"add-new" === id ? "new" : "edit"}
            onSubmit={(todo: TodoProps) => handleSubmit({ todo })}
          />
        </Modal>
      )}
    </Main>
  );
};

/**
 * @param {object} state The state found in the provider's state
 * @returns object
 */
const mapStateToProps = (state: any) => ({
  todos: state.todo.todos,
  buckets: state.todo.buckets,
  isDeletingTodo: state.todo.isDeletingTodo,
  isSearchingTodos: state.todo.isSearchingTodos,
  isFetchingBuckets: state.todo.isFetchingBuckets,
  isUpdatingTodo: state.todo.isUpdatingTodo,
});

/**
 * @param {function} dispatch Main dispatch function that updates the provider
 */
const mapDispatchToProps = (dispatch: any) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
