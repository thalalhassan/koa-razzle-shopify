import React from "react";
import logo from "./koajs-logo.png";
import { withRouter } from "react-router-dom";
import "./Home.scss";

class Home extends React.Component {
  constructor(props) {
    super(props);
    console.log({ props });
  }

  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome to Razzle + Koa</h2>
        </div>
        <button onClick={() => {this.props.history.push('/reports')}} name="reports">REPORTS</button>
        <pre className="Home-intro">
          To get started, edit <b>src/App.js</b> or <b>src/Home.js</b> and save
          to reload.
        </pre>
        <ul className="Home-resources">
          <li>
            <a href="https://github.com/jaredpalmer/razzle">Docs</a>
          </li>
          <li>
            <a href="https://koajs.com">Koa official site</a>
          </li>
          <li>
            <a href="https://github.com/jaredpalmer/razzle/issues">Issues</a>
          </li>
          <li>
            <a href="https://palmer.chat">Community Slack</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default withRouter(Home);
