import React, { useState } from "react";
import { ITodo } from "../type";

interface IProps {
  saveTodo: (e: React.FormEvent, formData: ITodo | any) => void;
}

const Todo: React.FC<IProps> = ({ saveTodo }) => {
  const [formData, setFormData] = useState<ITodo | {}>();

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    let val: boolean | string = e.currentTarget.value;

    if (e.currentTarget.type === "checkbox") {
      val = e.currentTarget.checked;
    }

    const baseData = {
      ...formData,
      status: false,
      [e.currentTarget.id]: val,
    } as Pick<ITodo, keyof ITodo>;

    setFormData(baseData);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.persist();
    saveTodo(e, formData);
    setFormData({});
  };

  return (
    <form className="Form" onSubmit={handleSubmitForm}>
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <input onChange={handleForm} type="text" id="name" />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input onChange={handleForm} type="text" id="description" />
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <input onChange={handleForm} type="checkbox" id="status" />
        </div>
      </div>
      <button disabled={formData === undefined ? true : false}>Add Todo</button>
    </form>
  );
};

export default Todo;
