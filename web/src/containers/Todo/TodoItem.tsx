import React, { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Switch from "react-switch";
import { isObject } from "lodash";

import { TodoItemWrap, TodoItemInner, ActionWrap } from "./styles";

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

const TodoItem: React.FC<{
  todo: TodoProps;
  deleteHandler: any;
  toggleStatusHandler: any;
}> = ({ todo, deleteHandler, toggleStatusHandler }) => {
  const deleteTodoItem = (e: any, todo: TodoProps) => {
    e.preventDefault();
    if (window.confirm("Are you sure to delete todo?")) deleteHandler(todo);
  };

  const toggleStatus = (checked: any) => {
    toggleStatusHandler(todo, checked);
  };

  return (
    <TodoItemWrap>
      <TodoItemInner className={todo.isCompleted ? "completed" : ""}>
        <h3>{todo.name}</h3>
        <h6>{isObject(todo.bucket) ? todo.bucket.name : todo.bucket}</h6>
        <span>{format(new Date(todo.createdAt), "dd MMM yyyy")}</span>
        <ActionWrap>
          <Switch
            className="react-switch"
            onChange={toggleStatus}
            checked={todo.isCompleted}
            onColor="#888"
            onHandleColor="#47547b"
            handleDiameter={20}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={15}
            width={35}
          />
          <Link
            to={{
              pathname: `/todos/${todo.id}`,
              state: { modal: true },
            }}
          >
            Edit
          </Link>
          <a href="#" onClick={(e) => deleteTodoItem(e, todo)}>
            Delete
          </a>
        </ActionWrap>
      </TodoItemInner>
    </TodoItemWrap>
  );
};

export default TodoItem;
