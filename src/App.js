import "./App.css";
import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import SearchIcon from "@material-ui/icons/Search";
import { Paper, Grid, InputBase } from "@material-ui/core";

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
      margin: "10px auto auto",
      padding: "10px",
      display: "flex",
      height: "100%",
      pointerEvents: "none",
      alignItems: "center",
      justifyContent: "center",
    },
  };
  const [globalTodoList, setGlobalTodList] = useState([]);
  const [reload, setReload] = useState(false);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  function debounce(value, timeout = 500) {
    let timer;
    
      //clearTimeout(timer);
      timer = setTimeout(() => {
      }, timeout);
  }

  const processChange =()=>debounce();
  //http://localhost:3333/api/todos?search=”mem”
  const getData = async () => {
    try {
      let res;
      if (search !== "") {
        res = await axios.get(
          `http://localhost:3333/api/todos?search=${search}`
        );
      } else {
        res = await axios.get("http://localhost:3333/api/todos");
      }
      setGlobalTodList(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    processChange()
    getData();
  }, [reload,search]);

  const addToList = (todo) => {
    setGlobalTodList([...globalTodoList, todo]);
  };
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <div className={styles.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
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
