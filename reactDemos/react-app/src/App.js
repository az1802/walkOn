import React, { useEffect, useState, Component, Suspense } from 'react';
import Button from "./components/Button/index.js";
import ContextCom from "./components/ParentCom/ContextCom"
import { store } from "./store/redux.js"
import ThemeContext from "./context/ThemeConetxt"
import { ErrorBoundary, ChildTest } from "./components/ParentCom/ErrorBoundary"
import HookCom from "./components/ParentCom/HookCom"
import MemoCom from "./components/ParentCom/MemoCom"
const LazyComponent = React.lazy(() => import('./components/ParentCom/AsyncCom'))
class App extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      theme: {
        color: "red"
      }
    }
    this.toggleTheme = () => {
      this.setState(state => ({
        theme: state.theme.color == "red" ? { color: "blue" } : { color: "red" }
      }))
    }
  }
  render() {
    return (
      <ThemeContext.Provider value={this.state.theme} >
        <div className="App">
          <ContextCom toggleTheme={this.toggleTheme}></ContextCom>
          <Suspense fallback={<div>异步组件加载中.....</div>}>
            <LazyComponent></LazyComponent>
          </Suspense>
          {/* <ErrorBoundary>
            <ChildTest></ChildTest>
          </ErrorBoundary> */}
          <br />
          <HookCom></HookCom>
          <MemoCom></MemoCom>
        </div>
      </ThemeContext.Provider>

    );
  }
}


export default App;
