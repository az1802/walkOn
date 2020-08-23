import React, { Component } from "react";
import ReactDOM, { render } from "react-dom";


class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            err: false
        }
    }
    render() {
        if (this.state.err) {
            return (
                <div>错误捕获</div>
            )
        } else {
            return this.props.children;
        }

    }
    static getDerivedStateFromError(error) {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { err: true };
    }
    componentDidCatch(error, errorInfo) {
        this.setState({
            err: true
        })
        console.log("ErrorBoundary -> componentDidCatch -> error, errorInfo", error, errorInfo)
    }
}

class ChildTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1
        }
    }
    handleClick = () => {
        let preCount = this.state.count;
        if (preCount === 3) {
            throw new Error("子组件发生错误")
        }
        this.setState({
            count: ++preCount
        })
    }
    render() {
        return (
            <div onClick={this.handleClick}>子组件内容 {this.state.count}</div>
        )
    }
}

export {
    ChildTest,
    ErrorBoundary
}