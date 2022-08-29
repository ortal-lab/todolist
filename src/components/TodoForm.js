import React, { useState, useRef } from "react";
import axios from "axios";
import { Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
const TodoForm = ({ addToList, globalTodoList }) => {
 
  const inputRef = useRef();
  //const errorRef = useRef();
  const handleSubmit = async (e) => {
    console.log(inputRef.current.value);
    e.preventDefault();
    if (inputRef.current.value === "") {
      //errorRef.current.classList.add("active");
      return null;
    }
    //errorRef.current.classList.remove("active");
    try {
      const res = await axios.post("http://localhost:3333/api/todo", {
        text: inputRef.current.value,
      });
      addToList(res.data);
    } catch (error) {
      alert(error);
    }
    inputRef.current.value = ""
    };
  return (
    <form onSubmit={handleSubmit} style={{ display: "flex" }}>
      
      <Input
        placeholder="Todo"
        inputProps={{
          "aria-label": "Description",
        }}
        inputRef={inputRef}
        style={{ width: "90%" }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ width: "10%" }}
      >
        Add
      </Button>

      {/* <p ref={errorRef} className="error">
        Error, must enter a value!
      </p> */}
    </form>
  );
};

export default TodoForm;
