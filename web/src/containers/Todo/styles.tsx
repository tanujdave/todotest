import styled from "styled-components";

export const PageContainer = styled("div")`
  margin: 0;
  padding-top: 30px;
`;

export const TodoItemsContainer = styled("div")`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
`;

export const TodoItemWrap = styled("div")`
  font-weight: 400;
  color: #fff;
  background-color: transparent;
  box-sizing: border-box;
  flex-basis: 25%;
  -ms-flex: auto;
  width: 300px;
  max-width: 313px;
  position: relative;
  padding: 10px;
  box-sizing: border-box;
  &.todo-placeholder {
    cursor: pointer;
  }
`;

export const TodoItemInner = styled("div")`
  border-radius: 0.25rem;
  border-radius: 0.25rem;
  border: 1px solid #434857;
  min-height: 142.6px;
  height: 100%;
  width: 100%;
  padding: 20px;
  padding-bottom: 15px;
  box-sizing: border-box;
  height: auto;
  position: relative;
  a {
    text-decoration: none;
  }
  h3 {
    color: #c6cad7;
    font-style: italic;
    font-size: 1.5rem;
    font-weight: bolder;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  h6 {
    padding-top: 15px;
    color: #aaa;
    font-size: 10px;
    letter-spacing: 1px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  span {
    padding-top: 5px;
    color: #888;
    font-size: 10px;
    letter-spacing: 1px;
    &.add-icon {
      font-size: 1.5rem;
      font-weight: bolder;
      background: #333;
      display: inline-block;
      width: 30px;
      height: 30px;
      line-height: 28px;
      padding: 0;
      border-radius: 50%;
      margin-bottom: 10px;
    }
  }
  &.completed {
    opacity: 0.3;
    h3 {
      text-decoration: line-through;
    }
  }
`;

export const ActionWrap = styled("div")`
  // text-align: center;
  // position: absolute;
  // display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin-top: 25px;
  text-align: right;
  .react-switch {
    float: left;
  }
  label {
    cursor: pointer;
  }
  a {
    background-color: #1a1c22;
    text-decoration: none;
    color: #ddd;
    font-size: 11px;
    padding: 3px 15px;
    border-radius: 10px;
    margin-right: 5px;
  }
`;
export const AddNewTodoAction = styled("div")`
  text-align: center;
  height: 100%;
  color: #888;
  font-weight: bolder;
  font-size: 1.5rem;
  text-decoration: none;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    align-items: center;
    text-decoration: none;
    &:visited {
      color: #888;
      text-decoration: none;
    }
  }
`;

export const FormRow = styled("div")`
  margin-bottom: 15px;
  width: 100%;
  &.action-row {
    text-align: right;
  }
`;

export const TodoItemFormWrap = styled("div")`
  .error-message {
    color: red;
    font-size: 12px;
  }
`;
