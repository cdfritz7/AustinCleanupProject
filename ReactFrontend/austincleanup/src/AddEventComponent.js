import React, {Component} from 'react';
import {Form,
        Container,
        Row,
        Col,
        Card,
        Button} from 'react-bootstrap';

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

    //post to database
    const response = fetch('http://localhost:8080/austinCleanupAPI/addEvent', {
      method: 'POST',
      headers: {'Accept': 'application/json', 'Content-Type':'application/json'},
      body: JSON.stringify({
        'name': this.state.name,
        'address': this.state.address,
        'latitude': this.state.latitude,
        'longitude': this.state.longitude,
        'description': this.state.description,
      })
    });

    console.log(response);

    this.setState({
      name:'',
      address:'',
      latitude:'',
      longitude:'',
      description:''
    })
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

  }
}

export default AddEventComponent;
