import React, { Component } from 'react';
import axios from 'axios';
import Loading from './Loading';
import PhotoContainer from './PhotoContainer';
import './css/home.css';
import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import 'react-fancybox/lib/fancybox.css';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import Moment from 'moment';


class Home extends Component {
    constructor(props) {
        super(props);
     
        this.state = {
          cities: [],
          sortedCities: [],
          isLoading: true,
          showModal: false,
          selectedItem: ''
       }
      }
  

      toggleDone = (e) => {
        //   const weatherItems = JSON.parse(localStorage.getItem("weatherItems")) ?
        //   JSON.parse(localStorage.getItem("weatherItems")) : []
        // localStorage.removeItem("weatherItems");
        
        const updatedList = [...this.state.cities].
            map(item =>  {
                if (Number(item.id) == Number(this.state.selectedItem)) {
                    console.log(item.id, this.state.selectedItem);
                        item.isToggle = !item.isToggle;
                    } 

                return item;

            })
            this.setState({ 
                cities: updatedList,
                isLoading: false
             });
            localStorage.removeItem("weatherItems");
            localStorage.setItem("weatherItems", JSON.stringify(updatedList));
    
             console.log(updatedList);
      }

    closeModal = (showModal) => {
        this.setState({showModal: false})
    }

    showModalx = () => {
        this.setState({showModal: true })
    }


      listCities = () => {

            axios.get(`/api/weather`)
            .then(res => {
              const cities = res.data; //sort cities
            let sortedByName = [].concat(cities)
            .sort((a, b) => a.city.name > b.city.name ? 1 : -1)
            console.log(sortedByName);

            let sortedByDate = [].concat(cities)
            .sort((a, b) => a.date > b.date ? 1 : -1)
            console.log(sortedByDate);

            sortedByName.forEach((item, i) => {
                item.id = i + 1;
                item.isToggle = true;
              })

              sortedByName.map(city => {
  
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
              this.setState({ cities: sortedByName,
                isLoading: false,
                sortedCities: sortedByDate
            });   
             JSON.parse(localStorage.getItem("weatherItems")) ?
            JSON.parse(localStorage.getItem("weatherItems")) : 
            localStorage.setItem("weatherItems", JSON.stringify(sortedByName));
                
            })
            .catch(err => {
                console.log(err)
                this.setState({cities:  JSON.parse(localStorage.getItem("weatherItems")) ?
                JSON.parse(localStorage.getItem("weatherItems")) : [], isLoading: false})
            });
    
    }

    listOfCitiesToRefresh = () => {
        if (this.state.cities > 0 ) {
            let result = JSON.parse(localStorage.getItem("weatherItems")) ?
              JSON.parse(localStorage.getItem("weatherItems")) : localStorage.setItem("weatherItems", JSON.stringify(this.state.cities));
              this.setState({cities: result, isLoading: false})
          } 
    }

    refreshPage = () => {
        this.interval = setInterval(this.listOfCitiesToRefresh(), 500); // <- time in ms
    }
    
    stopInterval() {
        clearInterval(this.interval);
      }
      
    
    componentDidMount() {
        this.listCities();
    }

      componentWillUnmount() {
        this.stopInterval();
      }



    render() {
        console.log(this.state.selectedItem);
        console.log(this.state.cities);
        const {showModal } = this.state;
        if (this.state.cities !== undefined) {
            return (
                <React.Fragment>
                 <div>
                 <button onClick={this.showModalx}  className="button primary">
                         Show Chronological
                       </button>
                 </div>  <br />
                      <button className="link button secondary" onClick={this.refreshPage}>Refresh!</button>
                      <PhotoContainer />
                <div className="home">
                    { this.state.isLoading ? <Loading /> :
                      this.state.cities.map((item, index) => (
                        
                    <Fade left cascade key={index}>
    
                       <Card key={index} className="rcard">
                        <button
                        options={item[index]} className="btn btn-primary" onMouseUp={() =>{ this.setState({ selectedItem: item.id });}}
                        onClick={() =>{  this.toggleDone(); }} >
                                            Toggle
                        </button> 
    
                         { item.isToggle && (
                               <div>
                                <CardActionArea>
                                  <CardContent>
                                  <Typography gutterBottom variant="h5" component="h2">
                                  <img src={item.city.picture} alt={item.city.picture} />
                                  </Typography>
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
                                          More details..
                              </Link>
                              
                              </CardActions>
                            </div>

                          )}
    
                        </Card>
                      
                        </Fade>              
                        
                    ))} 
    
                </div>
                {showModal && (
    <Modal className="modalx" ariaHideApp={false}
    isOpen={true} onRequestClose={this.closeModal}>
        <Zoom>
           <button className="close-modal"
             onClick={this.closeModal}
            >X</button>

<h1> Chronological order</h1>
        <div className="modal-body">
    
          { this.state.isLoading ? <Loading /> :
                      this.state.sortedCities.map((item, index) => (
                        
                      <Fade left cascade key={index}>
                    
                       <Card key={index} className="rcard">
                        <CardActionArea>
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                            <img src={item.city.picture} alt={item.city.picture} />
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                            {item.city.name} 
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                            Temperature: {item.temp} {" "}  {item.tempType}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                            Date:  {Moment(item.date).format('YYYY-MM-DD')} {" "} <br />
                            Time: {Moment(item.date).format('HH:mm:ss')} 
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        </Card>
                        </Fade>              
                        
                    ))} 
            </div>
        </Zoom>
    </Modal>
)}
                </React.Fragment>
            )

        } else {
            return(
                <Loading />
            );
        }
    
    }
}

export default Home;
