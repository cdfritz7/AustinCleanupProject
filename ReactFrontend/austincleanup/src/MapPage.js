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
    return <h3> {this.props.name} </h3>
  }
}

class SimpleMap extends Component {
  static defaultProps = {
    dcenter: {
      lat:0.0,
      lng:0.0
    },
    zoom: 10
  };

  render() {

    //create list of markers based on passed in events
    var marker_list = this.props.events.map(my_event => <EventMarkerSmall lat={my_event.latitude}
                      lng={my_event.longitude}
                      name={my_event.name} />);

    return (
      //always set container height explicitly, required by google maps
      <div style={{height: '75vh', width: '100%'}}>
        <GoogleMapReact
          //we need to get a google maps api key to use full functionality
          //bootstrapURLKeys={{key:/*your key here8
          defaultCenter={this.props.dcenter}
          defaultZoom={this.props.zoom}
          center={this.props.center}
        >
          {marker_list}
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
    console.log(this.state.latitude);
    console.log(this.state.longitude);
    fetch(`http://localhost:8080/austinCleanupAPI/eventsByLatLong?lat=${latitude}&lng=${longitude}`)
    .then(function(response){
      if(response.ok){
        return response.json();
      }else{
        throw new Error('Error in MapPage.js resetEvents, Network response not okay')
      }
    }).then(json => {
      this.setState({events:json})});
  }

  componentDidMount(){
      const handle = this.props.match.params.latlong;
      var floatLat = 30.27;
      var floatLng = -97.74

      if(handle){
          var latlong = handle.split("_")
          var floatLat = parseFloat(latlong[0]);
          var floatLng = parseFloat(latlong[1]);
      }

      fetch(`http://localhost:8080/austinCleanupAPI/eventsByLatLong?lat=${floatLat}&lng=${floatLng}`)
      .then(function(response){
        if(response.ok){
          return response.json();
        }else{
          throw new Error('Error in MapPage.js resetEvents, Network response not okay')
        }
      }).then(json => {
        this.setState({events:json})
      });

      this.setState({latitude:floatLat, longitude:floatLng});
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
            <Col xs={4}>
              <ListGroup>
                {event_list}
              </ListGroup>
            </Col>
            <Col xs={8}>
              <SimpleMap center={{lat:this.state.latitude, lng:this.state.longitude}} events={this.state.events}/>
            </Col>
          </Row>
        </Container>
      </div>

    )

  }
}

export default MapPage;
