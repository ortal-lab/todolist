import "./App.css";
import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import SearchIcon from "@material-ui/icons/Search";
import { Paper, Grid, InputBase, Button } from "@material-ui/core";

const App = () => {
  const styles = {
    Paper: {
      padding: 20,
      margin: "auto",
      textAlign: "center",
      width: 500,
    },
    search: {
      margin: "10px auto auto",
      padding: "10px",
      display: "flex",
      alignItems: "center",
      width: 250,
      backgroundColor: "#acceff",
      "&:hover": {
        backgroundColor: "#aecaf0",
      },
      borderRadius: 10,
    },
    searchIcon: {
      position: 'fixed',
      top: 20 ,
      left:900,
    },
  };
  const [globalTodoList, setGlobalTodList] = useState([]);
  const [reload, setReload] = useState(false);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearch=async()=>{
    console.log('lala')
      const res = await axios.get(
         `http://localhost:3333/api/todos?search=${search}`
       );
       setGlobalTodList(res.data);
       setSearch('')
  }
  const getData = async () => {
    try {
      
        const res = await axios.get("http://localhost:3333/api/todos");
      setGlobalTodList(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, [reload]);

  const addToList = (todo) => {
    setGlobalTodList([...globalTodoList, todo]);
  };
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12}>
            <Button   style={styles.searchIcon} variant="contained" color="primary" onClick={()=>{handleSearch()}}>
              Search
            </Button>
          <InputBase
            style={styles.search}
            inputProps={{ "aria-label": "search" }}
            value={search}
            onChange={handleChange}
          ></InputBase>
        </Grid>
        <Grid item xs={12}>
          <Paper style={styles.Paper}>
            <TodoForm addToList={addToList} globalTodoList={globalTodoList} />
          </Paper>
        </Grid>
      </Grid>{" "}
      <Grid item xs={12} style={styles.Paper}>
        <TodoList setReload={setReload} list={globalTodoList} />
      </Grid>
    </>
  );
};

export default App;
