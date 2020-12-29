import React, { Component } from 'react';
import axios from 'axios';
import Loading from './Loading';
// import BackgroundC from './BackgroundC';
import './css/home.css';
import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import 'react-fancybox/lib/fancybox.css';


class Home extends Component {
    constructor(props) {
        super(props);
     
        this.state = {
          cities: [],
          isLoading: true
       }
      }

      listCities = () => {

        axios.get(`/api/weather`)
            .then(res => {
              const cities = res.data; //sort cities
               cities.forEach((item, i) => {
                item.id = i + 1;
              });

          let newList = cities.map(city => {
                if (city["tempType"] === "F") {
                    city["temp"] = ((city["temp"] - 32) / 1.8).toFixed(2);
                    city["tempType"] = "C";
                }
                 if (city["tempType"] === "K") {
                    city["temp"] = (city["temp"] - 273.15).toFixed(2);
                    city["tempType"] = "C";
                
                }
                return city;
            })
            //   console.log(newList);
              this.setState({ cities: cities.sort((a, b) => a.city.name.localeCompare(b.city.name)),
                isLoading: false
            });   
            localStorage.setItem("weatherItems", JSON.stringify(cities));
            })
            .catch(err => console.log(err));
        
    }


    refreshPage = () => {
        this.interval = setInterval(this.listCities(), 500); // <- time in ms
    }
    
    
    componentDidMount() {
        this.listCities();
    }

    stopInterval() {
        clearInterval(this.interval);
      }
      
      componentWillUnmount() {
        this.stopInterval();
      }



    render() {
        console.log(this.state.cities);
    
        if (this.state.cities !== undefined) {
            return (
                <React.Fragment>
                      <button style={linkStyle} className="link" onClick={this.refreshPage}>Refresh!</button>
                         {/* <BackgroundC /> */}
                <div className="home">
                    { this.state.isLoading ? <Loading /> :
                    this.state.cities.map((item, index) => (
                       <Card key={index} className="rcard">
                        <CardActionArea>
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                            {item.city.name}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                         <Link className="linkx" city={item} 
                          id={item.id} to={ { 
                            pathname: "/city/" + item.id,
                            myCustomProps: item
                        }}>
                                    See More..
                        </Link>
                        
                        </CardActions>
                        </Card>
                                        
                        
                    ))} 
    
                </div>
                </React.Fragment>
            )

        } else {
            return(
                <Loading />
            );
        }
    
    }
}

const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    marginRight: "20px",
    marginLeft: "20px",
    backgroundColor: '#444'
  };
  

export default Home;
