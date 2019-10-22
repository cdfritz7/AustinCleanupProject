import React, {Component} from 'react';
import {Container,
        Row,
        Col,
        Card,
        Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
class ViewEventComponent extends Component{

  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*sends post request to sign user up for event if they are logged in,
  or tells them to log in if they are not */
  handleSubmit(){
    var user_id = sessionStorage.getItem('userId');

    const response = fetch('http://localhost:8080/austinCleanupAPI/addEvent', {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type':'application/json'},
        body: JSON.stringify({
          'userId': user_id,
          'eventId': this.props.event.id,
          'isOrganizer': false
        })
    });
  }

  render(){
    var is_logged_in = sessionStorage.getItem("isLoggedOn");

    if(is_logged_in == "True"){
      return (
        <div>
          <h1>{this.props.event.name}</h1>
          <h3>{this.props.event.latitude}</h3>
          <h3>{this.props.event.longitude}</h3>
          <Button onClick={()=>this.handleSubmit()}>
            Sign Up!
          </Button>
        </div>
      )
    }else{
      return (
        <div>
          <h1>{this.props.event.name}</h1>
          <h3>{this.props.event.latitude}</h3>
          <h3>{this.props.event.longitude}</h3>
          <Button variant="secondary">
            <Link to="/Profile">Sign In to Sign Up</Link>
          </Button>
        </div>
      )
    }

  }
}

export default ViewEventComponent;
