import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import {Container,
        Row,
        Col,
        ListGroup,
        Modal,
        Button} from 'react-bootstrap/';
import ViewEventComponent from './ViewEventComponent.js';
import AddEventComponent from './AddEventComponent.js';
import EventList from './EventList.js';
import MapBoxMapComponent from './MapBoxMapComponent';
import './css/MapPage.css';
import APIRequest from './APIRequests.js';

class MapPage extends Component {

  constructor(props){
    super(props);

    const search = props.location.search;

    var floatLat;
    var floatLng;

    if(search){
        var latlong = search.slice(1).split("&");
        floatLat = parseFloat(latlong[0].slice([4]));
        floatLng = parseFloat(latlong[1].slice([4]));

    }else{
       //austin lat long
       floatLat = 30.27;
       floatLng = -97.74;
    }

    this.state = {
                  latitude:floatLat,
                  longitude:floatLng,
                  search_str:this.props.match.params.latlong,
                  events:[],
                  eventRefs:[],
                  isLoggedIn:localStorage.getItem("isLoggedOn"),
                  userId:localStorage.getItem("userId"),
                  showAddEventModal:false,
                  showViewEventModal:false
                  };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.resetEvents = this.resetEvents.bind(this);
    this.removeSignUp = this.removeSignUp.bind(this);
  }

  //creates a set of React refs for each event in event_json, this is used
  //for scrolling
  createEventRefs(event_json){
    var eventRefs = [];
    for(var evnt in event_json){
      eventRefs.push(React.createRef());
    }
    return eventRefs;
  }

  //called to reset our event list, used initially when component mounts
  //or when a search is performed
  //will be done by making an API call, right now just returns all events
  resetEvents(latitude, longitude){
    fetch(APIRequest.getAPIBase()+`austinCleanupAPI/eventsByLatLong?lat=${latitude}&lng=${longitude}`)
    .then(function(response){
      if(response.ok){
        return response.json();
      }else{
        throw new Error('Error in MapPage.js resetEvents, Network response not okay')
      }
    }).then(json => {
      this.setState({events:json,
                    eventRefs:this.createEventRefs(json),
                    latitude:latitude,
                    longitude:longitude})
    });
  }

  componentDidMount(){
    fetch(APIRequest.getAPIBase()+`austinCleanupAPI/eventsByLatLong?lat=${this.state.latitude.toString()}&lng=${this.state.longitude.toString()}`)
    .then(function(response){
      if(response.ok){
        return response.json();
      }else{
        throw new Error('Error in MapPage.js componentDidMount, Network response not okay')
      }
    }).then(json => {
      this.setState({events:json, eventRefs:this.createEventRefs(json)})
    });
  }

  removeSignUp(){
    this.resetEvents(this.state.latitude, this.state.longitude);
    this.setState({showViewEventModal:false});
  }

  render(){
    return(
      <div>
        <Container style={{height:"100%", width:"100%", maxWidth:"100%", margin:"0px", padding:"0px"}}>
          <Row style={{padding:"30px"}}>
             <Col xs={3} style={{textAlign:"center", padding:"0px", paddingLeft:'15px'}}>
                <EventList events={this.state.events}
                          eventRefs={this.state.eventRefs}
                          onClick={(showevent, event)=>{this.setState(showevent, event)}}/>
                <Button variant="primary" style={{margin:"10px"}} onClick={()=>{this.setState({showAddEventModal:true})}}>
                  Add Event
                </Button>
             </Col>
             <Col xs={9} style={{padding:"0px"}}>
               <MapBoxMapComponent lat={this.state.latitude} lng={this.state.longitude}
                                  onMove={this.resetEvents}
                                  events={this.state.events}
                                  eventRefs={this.state.eventRefs}
                                  testprop={1}
                                  onClick={(showevent, event)=>{this.setState(showevent, event)}}
                                  onMouseIn={(eventid)=>{this.setState(eventid)}}
                                  onMouseOut={(eventid)=>{this.setState(eventid)}}/>
            </Col>

          </Row>

          <Row className="justify-content-center">
            <Col xs={12}>
              {/* modal for adding events*/}
              <Modal show={this.state.showAddEventModal}
                     onHide={()=>{
                                  this.setState({showAddEventModal:false});
                                  this.resetEvents(this.state.latitude, this.state.longitude);
                                  }}>
                <Modal.Header closeButton>
                  <Modal.Title>Add Event</Modal.Title>
                </Modal.Header>
                <Modal.Body><AddEventComponent isLoggedIn={this.state.isLoggedIn}
                                               userId={this.state.userId}/>
                </Modal.Body>
              </Modal>

              {/*modal for viewing events*/}
              <Modal show={this.state.showViewEventModal}
                     onHide={()=>{this.setState({showViewEventModal:false})}}
                     >
                <Modal.Header closeButton/>
                <Modal.Body><ViewEventComponent event={this.state.displayedEvent}
                                                isLoggedIn={this.state.isLoggedIn}
                                                userId={this.state.userId}
                                                removeSignUp={this.removeSignUp}/>
                </Modal.Body>
              </Modal>
            </Col>
          </Row>
        </Container>
      </div>

    )

  }
}

export default MapPage;
