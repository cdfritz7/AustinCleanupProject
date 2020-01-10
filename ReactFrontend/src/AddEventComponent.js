import React, {Component} from 'react';
import {Form,
        Container,
        Row,
        Col,
        Card,
        Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import APIRequest from './APIRequests.js';

class AddEventComponent extends Component {

  constructor(props){
    super(props);

    this.state = {
      name:'',
      address:'',
      latitude:'',
      longitude:'',
      description:''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLatitudeChange = this.handleLatitudeChange.bind(this);
    this.handleLongitudeChange = this.handleLongitudeChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);

  }

  handleSubmit(event) {
    event.preventDefault();

    //post event to database
    const that = this;
    fetch(APIRequest.getAPIBase()+'austinCleanupAPI/addEvent', {
      method: 'POST',
      headers: {'Accept': 'application/json', 'Content-Type':'application/json'},
      body: JSON.stringify({
        'name': this.state.name,
        'address': this.state.address,
        'latitude': this.state.latitude,
        'longitude': this.state.longitude,
        'description': this.state.description,
      })
    }).then(function(response){
      if(response.ok){
        return response.json();
      }else{
        throw new Error('Error in AddEventComponent.js handleSubmit, Network response not okay')
      }
    }).then(json => {
      //post userevent interaction to database
      fetch(APIRequest.getAPIBase()+'austinCleanupAPI/addUserEvent', {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type':'application/json'},
        body: JSON.stringify({
          'userId': this.props.userId,
          'eventId': json.EventId,
          'isOrganizer': "True"
        })
      }).then(function(response){
        if(response.ok){
            that.setState({
              name:'',
              address:'',
              latitude:'',
              longitude:'',
              description:''
            })
        }else{
          throw new Error('Error in AddEventComponent.js userevent post, Network response not okay')
        }
      })
    });
  }

  handleNameChange(event){
    this.setState({name:event.target.value});
  }

  handleDescChange(event){
    this.setState({description:event.target.value});
  }

  handleAddressChange(event){
    this.setState({address:event.target.value});
  }

  handleLatitudeChange(event){
    this.setState({latitude:event.target.value});
  }

  handleLongitudeChange(event){
    this.setState({longitude:event.target.value});
  }

  render(){

    if(this.props.isLoggedIn === "True"){
      return (
          <div>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control value={this.state.name} placeholder="Enter Name of Event" onChange={this.handleNameChange}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control value={this.state.address} placeholder="Enter Address" onChange={this.handleAddressChange}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Latitude</Form.Label>
                <Form.Control value={this.state.latitude} placeholder="Enter Latitude" onChange={this.handleLatitudeChange}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Longitude</Form.Label>
                <Form.Control value={this.state.longitude} placeholder="Enter Longitude" onChange={this.handleLongitudeChange}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control value={this.state.description} placeholder="Enter Description" onChange={this.handleDescChange}/>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        )
    }else{
      return(
        <Button variant="light">
          <Link to="/Profile">Sign In to Create Events</Link>
        </Button>
      )
    }


  }
}

export default AddEventComponent;
