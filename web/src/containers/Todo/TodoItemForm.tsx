import React from "react";
import { useForm, Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

import { FormRow, TodoItemFormWrap } from "./styles";

interface BucketProps {
  id: number;
  name: string;
}

interface TodoProps {
  id: number;
  name: string;
  isCompleted: boolean;
  bucket: BucketProps;
}

interface BucketProps {
  id: number;
  name: string;
}

const TodoItemForm: React.FC<{
  todo: TodoProps | any;
  buckets: BucketProps | any;
  formType: "edit" | "new";
  onSubmit: any;
}> = ({ todo, buckets, formType, onSubmit }) => {
  const { handleSubmit, register, errors, control } = useForm();

  const handleFormSubmit = (values: any) => {
    let saveTodo = { ...todo, ...values };
    saveTodo.bucket = saveTodo.bucket.label;
    onSubmit(saveTodo);
  };

  const transformOptions = (buckets: BucketProps[]) => {
    return (
      buckets &&
      buckets.map((bucket: BucketProps) => {
        return {
          ...bucket,
          label: bucket.name,
          value: bucket.id,
        };
      })
    );
  };

  return (
    <TodoItemFormWrap>
      <form
        onSubmit={handleSubmit((values) => {
          handleFormSubmit(values);
        })}
      >
        <FormRow>
          <input
            name="name"
            type="text"
            defaultValue={todo && todo.name}
            ref={register({ required: "Required" })}
          />
          {errors.name && errors.name.message && (
            <span className="error-message">{errors.name.message}</span>
          )}
        </FormRow>
        <FormRow>
          <Controller
            name="bucket"
            defaultValue={
              todo && {
                ...todo.bucket,
                ...{ label: todo.bucket.name, value: todo.bucket.id },
              }
            }
            as={CreatableSelect}
            isClearable={true}
            options={transformOptions(buckets)}
            control={control}
            rules={{ required: true }}
            className="react-select"
            formatCreateLabel={(userInput: any) => `Create new Bucket "${userInput}"`}
          />
          {errors.bucket && errors.bucket.message && (
            <span className="error-message">{errors.bucket.message}</span>
          )}
        </FormRow>
        <FormRow className="action-row">
          <button type="submit">
            {formType === "new" ? "Save" : "Update"}
          </button>
        </FormRow>
      </form>
    </TodoItemFormWrap>
  );
};

export default TodoItemForm;
