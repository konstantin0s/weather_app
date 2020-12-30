import React, { Component } from "react";
import Loading from "./Loading";
import Moment from "moment";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ReactFancyBox from "react-fancybox";
import "react-fancybox/lib/fancybox.css";
import "./css/citydetails.css";
import Fade from "react-reveal/Fade";
import ErrorBoundary from "./ErrorBoundary";
import sun from './img/sun.jpeg';

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: JSON.parse(localStorage.getItem("weatherItems"))
        ? JSON.parse(localStorage.getItem("weatherItems"))
        : [],
      isLoading: true,
      oneCity: {},
    };
  }

  fetchCity = () => {
    const weatherItems = JSON.parse(localStorage.getItem("weatherItems"))
      ? JSON.parse(localStorage.getItem("weatherItems"))
      : [];
    let oneCity = weatherItems
      .filter((item) => Number(item.id) === Number(this.props.id))
      .map((filteredCity) => {
        return filteredCity;
      });
    this.setState({ oneCity: oneCity[0], isLoading: false });
  };

  componentDidMount() {
    this.fetchCity();
  }

  render() {
    const { temp, date, tempType } = this.state.oneCity;
    const {city} = this.state.oneCity;

  
    const { isLoading } = this.state;

    if (isLoading === false) {
      return (
        <div className="onecity">
          <ErrorBoundary>
            <Fade right cascade>
              <Card>
                <CardActionArea>
                  <ReactFancyBox
                    thumbnail={city.picture ? city.picture : this.state.oneCity.city.picture}
                    image={city.picture ? city.picture : this.state.oneCity.city.picture}
                  />
                  <CardContent>
                    <Typography variant="h2" component="h2">
                      City: {city.name? city.name : this.state.oneCity.city.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                      Temperature: {temp}{" "}
                      {tempType} 
                      <img className="sun" src={sun} alt="sun"/>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Date:{" "}
                      {Moment(date).format("YYYY-MM-DD")}{" "}
                      <br />
                      Time: {Moment(date).format("HH:mm:ss")}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Fade>
          </ErrorBoundary>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

export default City;
