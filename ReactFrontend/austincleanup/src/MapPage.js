import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import {Container,
        Row,
        Col,
        ListGroup} from 'react-bootstrap/';
import './css/MapPage.css';

class EventMarkerSmall extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return <h1> {this.props.event.name} </h1>
  }
}

class SimpleMap extends Component {
    static defaultProps = {
      dcenter: {
        lat:0.0,
        lng:0.0
      },
      zoom: 11
    };

  constructor(props){
    super(props);
  }

  render() {

    {console.log(this.props.center);}
    return (
      //always set container height explicitly, required by google maps
      <div style={{height: '65vh', width: '100%'}}>
        <GoogleMapReact
          //we need to get a google maps api key to use full functionality
          //bootstrapURLKeys={{key:/*your key here8
          defaultCenter={this.props.dcenter}
          defaultZoom={this.props.zoom}
          center={this.props.center}
        >

        </GoogleMapReact>
      </div>
    );
  }
}

class MapPage extends Component {
  static defaultProps = {
    latitude: 0.0,
    longitude: 0.0,
    events:[]
  };

  constructor(props){
    super(props);
    this.state = {latitude:props.latitude,
                  longitude:props.longitude,
                  events:props.events};
    this.componentDidMount = this.componentDidMount.bind(this);
    this.resetEvents = this.resetEvents.bind(this);
  }

  //called to reset our event list, used initially when component mounts
  //or when a search is performed
  //will be done by making an API call, right now just returns all events
  resetEvents(latitude, longitude){
    console.log('reset');

    fetch("http://localhost:8080/austinCleanupAPI/allEvents")
    .then(function(response){
      if(response.ok){
        console.log('reset1');
        return response.json();
      }else{
        throw new Error('Error in MapPage.js resetEvents, Network response not okay')
      }
    }).then(json => this.setState({events:json}));
    
  }

  componentDidMount(){
      const {handle} = this.props.match.params;
      if(handle){
          var latlong = handle.split("_")
          this.setState({latitude:parseInt(latlong[0]), longitude:parseInt(latlong[1])});
      }else{
          this.setState({latitude:30.27, longitude:-97.74});
      }
      this.resetEvents(this.state.latitude, this.state.longitude);
  }



  render(){
    var event_list = []

    for(let i = 0; i < this.state.events.length; i++){
      event_list.push(<ListGroup.Item>{this.state.events[i].name}</ListGroup.Item>)
    }

    return(
      <div>
        <Container className='centered'>
          <Row>
            <Col xs={6}>
              <ListGroup>
                {event_list}
                <ListGroup.Item>asdf</ListGroup.Item>
                <ListGroup.Item>asdf</ListGroup.Item>
                <ListGroup.Item>asdf</ListGroup.Item>
                <ListGroup.Item>asdf</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col xs={6}>
              <SimpleMap center={{lat:this.state.latitude, lng:this.state.longitude}}/>
            </Col>
          </Row>
        </Container>
      </div>

    )

  }
}

export default MapPage;
