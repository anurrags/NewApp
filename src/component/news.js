import React, { Component } from "react";
import NewsItem from "./newsItem";
import LoadingImg from "./loading";
import PropTypes from "prop-types";

export class news extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 18,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalPage: 2,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category === "general" ? "home" : this.props.category
    )} - NewApp`;
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  async update(pageNo) {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e5d267220e774d6c946402f08734bd55&page=${pageNo}&pagesize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalPage: Math.ceil(parsedData.totalResults / 18),
      loading: false,
      page: pageNo,
    });
  }
  async componentDidMount() {
    this.update(this.state.page);
  }
  prevClick = async () => {
    this.update(this.state.page - 1);
  };
  nextClick = async () => {
    this.update(this.state.page + 1);
  };
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">
          {this.capitalizeFirstLetter(
            this.props.category === "general"
              ? "Top Headlines"
              : this.props.category
          )}
        </h2>
        {this.state.loading && <LoadingImg />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((el) => {
              return (
                <div className="col-md-4" key={el.url}>
                  <NewsItem
                    title={el.title ? el.title : ""}
                    description={el.description ? el.description : ""}
                    url={el.url}
                    urlToImage={
                      el.urlToImage
                        ? el.urlToImage
                        : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
                    }
                    author={el.author}
                    publishedAt={el.publishedAt}
                    source={el.source}
                  />
                </div>
              );
            })}
        </div>
        {!this.state.loading && (
          <div className="d-flex justify-content-between">
            <button
              disabled={this.state.page === 1}
              className="btn btn-lg btn-dark"
              onClick={this.prevClick}
            >
              &larr; Previous
            </button>
            <button
              disabled={this.state.page === this.state.totalPage}
              className="btn btn-lg btn-dark"
              onClick={this.nextClick}
            >
              Next &rarr;
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default news;
