import React, { useRef, useState } from "react";
import { Delete, Build } from "@material-ui/icons";
import { Checkbox, Grid, Paper,Input } from "@material-ui/core";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";

const Todo = ({ todo, setReload }) => {
  const gridRef = useRef();
  const [fade, setFade] = useState(false);
  const [text,setText]=useState('');
  const styles = {
    Icon: {
      marginLeft: "auto",
    },
    Paper: {
      margin: "auto",
      padding: 10,
      display: "flex",
      alignItems: "center",
      marginTop: 10,
      width: 500,
    },
  };
  const gridClass = fade ? "fade-out" : "";
  const onChangeCheck = async (e) => {
    try {

      const res = await axios.patch(`http://localhost:3333/api/todo`, 
        { id: todo.id, completed: e.target.checked });
      setReload((x) => !x);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  const onChangeText =  (e) => {
      setText(e.target.value)
  };
  const  Update= async (e) => {
    try {
      const res = await axios.patch(`http://localhost:3333/api/todo`, 
        { id: todo.id, text: text });
      setReload((x) => !x);
      console.log(res);
      setText('')

    } catch (e) {
      console.log(e);
    }
  }
  const deleteTodo = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3333/api/todo/${todo.id}`
      );
      setReload((x) => !x);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Grid xs={12} className={`${gridClass}`} item key={todo.id} ref={gridRef}>
      <Paper elevation={2} style={styles.Paper}>
        <Input  disableUnderline fullWidth onChange={onChangeText} value={text?text:todo.text}></Input>
        <IconButton
          color="primary"
          aria-label="Edit"
          style={styles.Icon}
          onClick={Update}
        >
          <Build fontSize="small" />
        </IconButton>
        <IconButton color="secondary" aria-label="Delete" onClick={deleteTodo}>
          <Delete fontSize="small" />
        </IconButton>
        <Checkbox
          checked={todo.completed}
          onChange={onChangeCheck}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </Paper>
    </Grid>
  );
};

export default Todo;
