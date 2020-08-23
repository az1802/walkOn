import React, { Component } from "react";
import ReactDOM from "react-dom";
import ThemeContext from "../../context/ThemeConetxt"

class ContextCom extends Component {
    constructor(props, context) {
        console.log("ParentCom -> constructor -> context", context)
        super(props);
        this.state = {
            count: 1,
            theme: {
                color: "blue"
            }
        }

    }
    addCount = (e) => {

        this.setState({
            count: ++this.state.count
        })
    }
    handleChange = (e) => {
        console.log(e.target.value);
        // this.setState({
        //     count: e.target.value
        // })
        e.persist()
        this.setState(() => {
            return {
                count: e.target.value
            }
        })
    }
    shouldComponentUpdate() {
        console.log("should update");
        console.log(this.state);
        return true
    }
    // componentWillUpdate() {
    //     console.log("will update");
    // }
    componentDidUpdate() {
        console.log("did update");
    }
    render() {
        let { color } = this.context
        return (
            <div >
                <button onClick={this.props.toggleTheme}>toggle</button>
                <p style={{ color }}>{color}</p>
            </div >
        )
    }

}
ContextCom.contextType = ThemeContext

export default ContextCom