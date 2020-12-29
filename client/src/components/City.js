
import React, { Component } from 'react';
import Loading from './Loading';
import Moment from 'moment';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ReactFancyBox from 'react-fancybox';
import 'react-fancybox/lib/fancybox.css';
import './css/citydetails.css';
import Fade from 'react-reveal/Fade';


class City extends Component {
constructor(props) {
    super(props);
    this.state = {
        city: JSON.parse(localStorage.getItem("weatherItems")) ?
        JSON.parse(localStorage.getItem("weatherItems")) : [],
        isLoading: true,
        oneCity: {}
    }
}


fetchCity = () => {
    const weatherItems =  JSON.parse(localStorage.getItem("weatherItems")) ?
    JSON.parse(localStorage.getItem("weatherItems")) : [];
  let oneCity = weatherItems.filter(item => Number(item.id) === Number(this.props.id)).map(filteredCity => {
        return filteredCity
    })
  console.log(oneCity);
    this.setState({oneCity: oneCity[0],
    isLoading: false})
}

componentDidMount() {
    this.fetchCity();
}



delayRender = () => {
    const { temp, date, tempType } = this.state.oneCity;
    // const { name, picture } = this.state.oneCity;
     console.log(this.props);
     console.log(this.state.oneCity);
    const { isLoading} = this.state;

    if (isLoading === false) {

    return (
    <Fade right cascade>
    <Card >
    <CardActionArea>
      <ReactFancyBox
          thumbnail={this.state.oneCity.city.picture}
          image={this.state.oneCity.city.picture} />
      <CardContent>
      <Typography variant="h2" component="h2">
       City: {this.state.oneCity.city.name}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
         Temperature: {temp} {" "}  {tempType}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        Date:  {Moment(date).format('YYYY-MM-DD')} {" "} <br />
        Time: {Moment(date).format('HH:mm:ss')}
        </Typography>
      </CardContent>
     </CardActionArea>
  </Card>
  </Fade>
)
    } else {
        return (
           <Loading />
        )
    }
}


    render() {
        return (
            <div className="onecity">
              {this.delayRender()}
            </div>
        )
    }
}

export default City;