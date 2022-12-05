import React, { Component } from "react";

export class newsItem extends Component {
  render() {
    let { title, description, url, urlToImage, publishedAt, author, source } =
      this.props;

    return (
      <div className="my-3">
        <div className="card">
          <span
            className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
            style={{
              left: "90%",
              zIndex: "1",
              padding: "5px 8px",
            }}
          >
            {source.name}
          </span>
          <img src={urlToImage} className="card-img-top" alt="img" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "Unknown"},{" "}
                {publishedAt
                  ? new Date(publishedAt).toGMTString()
                  : "Unknown time"}
              </small>
            </p>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default newsItem;
