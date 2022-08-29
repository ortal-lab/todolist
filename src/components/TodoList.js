import React from 'react'
import Todo from './Todo'
const TodoList = ({list,setReload}) => {
    return (
    list.map(todo=> {return <Todo todo={todo} setReload={setReload}></Todo>})
    )
}

export default TodoList
