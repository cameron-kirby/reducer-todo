import React, { useState, useReducer } from 'react'

import { initialState, reducer } from "../reducers/reducer";

import '../styles/TodoList.css'

function TodoList(props) {
    const [state, dispatch] = useReducer(reducer, initialState); // State of TodoList
    const [newItem, setNewItem] = useState('')

    const changeHandler = event => {
        setNewItem(event.target.value)
    }

    const updateCompleted = todo => {
        dispatch({type: "TOGGLE_COMPLETE", payload: todo.id})
        console.log(state)
    }

    return(
        <div className="todo-list">
            <h1>Todo list</h1>
            {state.map(todo =>{
                return (
                    <div className={`todo-item`}
                        key={todo.id} 
                        id={todo.id}>
                        <input type="checkbox" checked={todo.completed} onChange={ () => updateCompleted(todo) } />
                        {todo.item}
                    </div>
                )
            })}
            <input
                className="newItem-input"
                type="text"
                name="newItem"
                value={newItem}
                onChange={changeHandler}
            />
            <button
                onClick={() => {
                dispatch({ type: "ADD_TODO", payload: newItem });
                setNewItem('');
                }}
            >Add</button>
            <button
                onClick={() => {
                dispatch({ type: "CLEAR_COMPLETED" });
                }}
            >Clear Completed</button>
        </div>
    )
}

export default TodoList