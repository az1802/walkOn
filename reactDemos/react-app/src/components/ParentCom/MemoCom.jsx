import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import debounce from "./debounce"

function MemoCom() {
    const [count, setCount] = useState(0);
    const [bounceCount, setBounceCount] = useState(0);
    // const debounceSetCount = React.useCallback(debounce(setBounceCount), []);
    const debounceSetCount = React.useMemo(() => debounce(setBounceCount), [bounceCount])
    const handleMouseMove = () => {
        setCount(count + 1);
        debounceSetCount(bounceCount + 1);
    };

    let style = {
        width: "200px",
        height: "200px",
        background: "red"

    };
    return (
        <div onMouseMove={handleMouseMove} style={style}>
            <p>普通移动次数: {count}</p>
            <p>防抖处理后移动次数: {bounceCount}</p>
        </div>
    )
}


export default MemoCom