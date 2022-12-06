import "./App.css";
import Navbar from "./component/navbar.js";
import React, { Component } from "react";
import News from "./component/news";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
export default class App extends Component {
  apiKey = process.env.REACT_APP_API_KEY;
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News api={this.apiKey} key="general" category="general" />
              }
            ></Route>

            <Route
              exact
              path="/sports"
              element={
                <News api={this.apiKey} key="sports" category="sports" />
              }
            ></Route>

            <Route
              exact
              path="/health"
              element={
                <News api={this.apiKey} key="health" category="health" />
              }
            ></Route>
            <Route
              exact
              path="/science"
              element={
                <News api={this.apiKey} key="science" category="science" />
              }
            ></Route>
            <Route
              exact
              path="/technology"
              element={
                <News
                  api={this.apiKey}
                  key="technology"
                  category="technology"
                />
              }
            ></Route>
            <Route
              exact
              path="/entertainment"
              element={
                <News
                  api={this.apiKey}
                  key="entertainment"
                  category="entertainment"
                />
              }
            ></Route>
          </Routes>
        </Router>
      </>
    );
  }
}
