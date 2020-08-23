
import React, { useState, useEffect, useReducer, useCallback, useMemo } from "react";


function HookCom(props) {

    function todosReducer(state = [], action) {
        switch (action.type) {
            case "add":
                return state.concat("new one")
            default:
                return state
        }
    }

    let [count, setCount] = useState(2);
    let [name, setName] = useState("sj");
    let [todos, dispatch] = useReducer(todosReducer, [])
    useEffect(() => {
        console.log("effect 触发");
        return () => {
            console.log("执行清楚effect");
        }
    }, [name])
    let cb = useMemo(() => {
        console.log("执行call back");
    }, [count])
    return (
        <div>
            <p onClick={() => { setCount(++count); }}>count -- {count}</p>
            <p onClick={() => { dispatch({ type: "add" }) }}>add Todo----{JSON.stringify(todos)}</p>
        </div>
    )
}


export default HookCom;