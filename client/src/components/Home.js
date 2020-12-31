import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import Moment from "moment";
import Loading from "./Loading";
import PhotoContainer from "./PhotoContainer";
import ErrorBoundary from "./ErrorBoundary";
import sun from './img/sun.jpeg';
import "./css/home.css";
import "react-fancybox/lib/fancybox.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: JSON.parse(localStorage.getItem("weatherItems"))
        ? JSON.parse(localStorage.getItem("weatherItems"))
        : [],
      chronological: JSON.parse(localStorage.getItem("chronological"))
        ? JSON.parse(localStorage.getItem("chronological"))
        : [],
      isLoading: true,
      showModal: false,
      selectedItem: "",
      error: null
    };
  }

  //hide/unhide city and preserve it after page reload
  toggleCity = (e) => {
    const updatedList = [...this.state.cities].map((item) => {
      if (Number(item.id) === Number(this.state.selectedItem)) {
        item.isToggle = !item.isToggle;
      }
      return item;
    });
    this.setState({
      cities: updatedList,
      isLoading: false,
    });
    localStorage.removeItem("weatherItems");
    localStorage.setItem("weatherItems", JSON.stringify(this.state.cities));
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  showModalx = () => {
    this.setState({ showModal: true });
  };

  listCities = () => {
    JSON.parse(localStorage.getItem("weatherItems"))
      ? this.setState({
          cities: JSON.parse(localStorage.getItem("weatherItems")),
          isLoading: false,
        })
      : axios
          .get(`/api/weather`)
          .then((res) => {
            if (res.request.status === 200) {

              const cities = res.data;
              //sort cities by name (Alphabetical order)
              let sortedByName = []
                .concat(cities)
                .sort((a, b) => (a.city.name > b.city.name ? 1 : -1));

              //sort weather in chronological order
              let sortedByDate = []
                .concat(cities)
                .sort((a, b) => (a.date > b.date ? 1 : -1));

              //append id to every object
              sortedByName.forEach((item, i) => {
                item.id = i + 1;
                item.isToggle = true;
              });

              //convert K & F temperatures to Celsius
              sortedByName.map((city) => {
                if (city["tempType"] === "F") {
                  city["temp"] = ((city["temp"] - 32) / 1.8).toFixed(2);
                  city["tempType"] = "C";
                }
                if (city["tempType"] === "K") {
                  city["temp"] = (city["temp"] - 273.15).toFixed(2);
                  city["tempType"] = "C";
                }
                return city;
              });

              this.setState({
                cities: sortedByName,
                isLoading: false,
                chronological: sortedByDate,
              });
              //usage of local storage as a fallback, no need to make new api calls
              localStorage.setItem(
                "weatherItems",
                JSON.stringify(this.state.cities)
              );
              localStorage.setItem(
                "chronological",
                JSON.stringify(this.state.chronological)
              );
            } else {
              //internal server error - project should still run with the data from localstorage if not empty
              this.setState({
                cities: JSON.parse(localStorage.getItem("weatherItems"))
                  ? JSON.parse(localStorage.getItem("weatherItems"))
                  : [],
                isLoading: false,
                chronological: JSON.parse(localStorage.getItem("chronological"))
                ? JSON.parse(localStorage.getItem("chronological"))
                : []
              });
            }
          })
          .catch((err) => {
            this.setState({
              cities: JSON.parse(localStorage.getItem("weatherItems"))
                ? JSON.parse(localStorage.getItem("weatherItems"))
                : [],
              isLoading: false,
              chronological: JSON.parse(localStorage.getItem("chronological"))
                ? JSON.parse(localStorage.getItem("chronological"))
                : [],
              error: err
            });
          });
  };

  //api call, get new data
  refreshData = () => {
    this.setState({ cities: [], chronological: [], isLoading: true });
    localStorage.removeItem("weatherItems");
    localStorage.removeItem("chronological");
    this.interval = setInterval(this.listCities(), 500); // <- time in ms
  };

  stopInterval = () => {
    clearInterval(this.interval);
  };

  componentDidMount = () => {
    this.listCities();
  };

  componentWillUnmount = () => {
    this.stopInterval();
  };

  render() {

    const { showModal, cities, isLoading, chronological } = this.state;
    if (cities !== undefined) {
      return (
        <div>
          <div id="btns" className="btn-container">
            <button onClick={this.showModalx} className="button secondary modal-btn">
              Show Chronological
            </button>
            <br />
            <button
              className="link button secondary"
              onClick={this.refreshData}>
              Refresh Data!
            </button>
          </div>{" "}
          <br />
          <PhotoContainer />
          <div className="home">
            {isLoading ? (
              <Loading />
            ) : (
               cities.map((item, index) => (
                <Fade left cascade key={index} >
                  <Card key={index} className={item.isToggle ? "rcard hide" : "rcard show"}>
                    <button
                      id="button"
                      options={item[index]}
                      className="btn btn-primary" 
                      onMouseUp={() => {
                        this.setState({ selectedItem: item.id });
                      }}
                      onClick={() => {
                        this.toggleCity();
                      }}
                    >
                      {item.isToggle ? "Hide" : "Show"}
                    </button>

                    {item.isToggle && (
                      <div>
                        <CardActionArea>
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              <img className="img"
                                src={item.city.picture}
                                alt={item.city.picture}
                              />
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {item.city.name}
                              <img className="sunset" src={sun} alt="sun"/>
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Link
                            className="linkx"
                            city={item}
                            id={item.id}
                            to={{
                              pathname: "/city/" + item.id,
                              myCustomProps: item,
                            }}
                          >
                            More details..
                          </Link>
                        </CardActions>
                      </div>
                    )}
                  </Card>
                </Fade>
              ))
            )}
          </div>
          {showModal && (
            <Modal
              className="modalx"
              ariaHideApp={false}
              isOpen={true}
              onRequestClose={this.closeModal}
            >
              <Zoom>
                <button className="close-modal" onClick={this.closeModal}>
                  X
                </button>
                <h1> Chronological order</h1>

                <div className="modal-body">
                  {isLoading ? (
                    <Loading />
                  ) : (
                    chronological.map((item, index) => (
                      <ErrorBoundary key={index}>
                        <Fade left cascade key={index}>
                          <Card key={index} className="rcard">
                            <CardActionArea>
                              <CardContent>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="h2"
                                >
                                  <img className="img"
                                    src={item.city.picture}
                                    alt={item.city.picture}
                                  />
                                </Typography>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="h2"
                                >
                                  {item.city.name}
                                </Typography>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="h2"
                                >
                                  Temperature: {item.temp} {item.tempType}
                                </Typography>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="h2"
                                >
                                  Date: {Moment(item.date).format("YYYY-MM-DD")}{" "}
                                  <br />
                                  Time: {Moment(item.date).format("HH:mm:ss")}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </Fade>
                      </ErrorBoundary>
                    ))
                  )}
                </div>
              </Zoom>
            </Modal>
          )}
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

export default Home;
