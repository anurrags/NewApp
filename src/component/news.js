import React, { Component } from "react";
import NewsItem from "./newsItem";
import LoadingImg from "./loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
export class news extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    api: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalPage: 2,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category === "general" ? "home" : this.props.category
    )} - NewApp`;
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  async update() {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalPage: Math.ceil(parsedData.totalResults / 18),
      loading: false,

      totalResults: parsedData.totalResults,
    });
  }
  async componentDidMount() {
    this.update(this.state.page);
  }
  fetchData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      loading: false,
    });
  };
  //   prevClick = async () => {
  //     this.update(this.state.page - 1);
  //   };
  //   nextClick = async () => {
  //     this.update(this.state.page + 1);
  //   };
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
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<LoadingImg />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="row">
            {/* {!this.state.loading && */}
            {this.state.articles.map((el) => {
              return (
                <div className="col-md-4" key={el.url}>
                  <NewsItem
                    title={el.title ? el.title : " "}
                    description={el.description ? el.description : " "}
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
        </InfiniteScroll>

        {/* {!this.state.loading && (
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
        )} */}
      </div>
    );
  }
}

export default news;
