import React from 'react';
import styles from "./button.module.css"

console.log(styles)
function Button(props) {
    console.log(props)
    return (
        <button className={styles.button} onClick={() => { props.onClick() }}>按钮</button>
    );
}

export default Button;
