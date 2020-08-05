import "@babel/polyfill";
import React ,{Component} from 'react';
import ReactDom from 'react-dom';


class App extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (<div>
            react test
        </div>)
    }
}

// function App(){
//     return (<div>
//         react test
//     </div>)
// }

ReactDom.render(<App />,document.getElementById("root"))