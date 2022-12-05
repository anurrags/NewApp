import React, { Component } from "react";
import loadingImg from "../loading-img.gif";

export class loading extends Component {
  render() {
    return (
      <div className="text-center" style={{ marginTop: "180px" }}>
        <img src={loadingImg} alt="loading" />
      </div>
    );
  }
}

export default loading;
