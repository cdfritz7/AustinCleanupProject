import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import {Container,
        Row,
        Col,
        ListGroup,
        Modal,
        Button} from 'react-bootstrap/';

import AddEventComponent from './AddEventComponent.js';
import './css/MapPage.css';

class EventList extends Component {
  render(){

    var event_list = this.props.events.map(my_event =>
    <ListGroup.Item key={my_event.id.toString()} eventKey={my_event.id.toString()}>
    {my_event.name}
    </ListGroup.Item>
    )

    console.log(this.props.events);
    console.log(event_list);

    return (
      <div>
        <ListGroup>
          {event_list}
        </ListGroup>
      </div>
    )
  }
}

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
    var marker_list = this.props.events.map(my_event =>
    <EventMarkerSmall key={my_event.id.toString()}
                      lat={my_event.latitude}
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

  constructor(props){
    super(props);

    this.state = {
                  latitude:0.0,
                  longitude:0.0,
                  events:[],
                  showAddEventModal:false
                  };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.resetEvents = this.resetEvents.bind(this);
  }

  //called to reset our event list, used initially when component mounts
  //or when a search is performed
  //will be done by making an API call, right now just returns all events
  resetEvents(latitude, longitude){
    console.log('reset');
    console.log(latitude);

    fetch(`http://localhost:8080/austinCleanupAPI/eventsByLatLong?lat=${latitude}&lng=${longitude}`)
    .then(function(response){
      if(response.ok){
        return response.json();
      }else{
        throw new Error('Error in MapPage.js resetEvents, Network response not okay')
      }
    }).then(json => {
      this.setState({events:json, latitude:latitude, longitude:longitude})
    });
  }

  componentDidMount(){

    const handle = this.props.match.params.latlong;

    console.log(handle);

    let floatLat;
    let floatLng;

    console.log('Component Did Mount'+handle);

    if(handle){
        var latlong = handle.split("_")
        floatLat = parseFloat(latlong[0]);
        floatLng = parseFloat(latlong[1]);
        console.log(latlong);
    }else{
       //austin lat long
       floatLat = 30.27;
       floatLng = -97.74;
       console.log(floatLng);
    }

    this.setState({latitude:floatLat, longitude:floatLng});

    fetch(`http://localhost:8080/austinCleanupAPI/eventsByLatLong?lat=${floatLat.toString()}&lng=${floatLng.toString()}`)
    .then(function(response){
      if(response.ok){
        return response.json();
      }else{
        throw new Error('Error in MapPage.js resetEvents, Network response not okay')
      }
    }).then(json => {
      this.setState({events:json})
    });
  }

  render(){

    if(this.state.events.length === 0){
      return null;
    }

    console.log('-------');
    console.log(this.state.events);
    console.log(this.state.latitude);

    return(
      <div>
        <Container className='centered'>
          <Row>
            <Col xs={4}>
              <EventList events={this.state.events} />
            </Col>
            <Col xs={8}>
              <SimpleMap center={{lat:this.state.latitude,
                                  lng:this.state.longitude}}
                         events={this.state.events}/>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <Button variant="primary"
                      onClick={()=>{this.setState({showAddEventModal:true})}}>
                Add Event
              </Button>
              <Modal show={this.state.showAddEventModal}
                     onHide={()=>{
                                  this.setState({showAddEventModal:false});
                                  this.resetEvents(this.state.latitude, this.state.longitude);
                                  }}>
                <Modal.Header closeButton>
                  <Modal.Title>Add Event</Modal.Title>
                </Modal.Header>
                <Modal.Body><AddEventComponent /></Modal.Body>
              </Modal>
            </Col>
          </Row>
        </Container>
      </div>

    )

  }
}

export default MapPage;
