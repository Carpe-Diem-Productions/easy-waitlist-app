import React from "react";
import ReactDOM from "react-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Navigator from "./Navigator";
import RoleSelector from "./RoleSelector";

import reportWebVitals from "./reportWebVitals";

import "./index.css";

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <Container>
      <Row>
        <Navigator />
      </Row>
      <Row>
        <RoleSelector />
      </Row>
    </Container>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
