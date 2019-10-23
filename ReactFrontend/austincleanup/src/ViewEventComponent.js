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

    this.state = {
      isSignedUp : false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  /*sends post request to sign user up for event*/
  handleSubmit(){
    fetch('http://localhost:8080/austinCleanupAPI/addUserEvent', {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type':'application/json'},
        body: JSON.stringify({
          'userId': this.props.userId,
          'eventId': this.props.event.id.toString(),
          'isOrganizer': "false"
        })
    }).then(function(response){
      if(!response.ok){
        throw new Error('Error in ViewEventComponent.js in handleSubmit()')
      }
    }).then(()=>{this.setState({isSignedUp:true})});
  }

  componentDidMount(){
    //finds if the user is registered for the event
    fetch(`http://localhost:8080/austinCleanupAPI/isUserSignedUpForEvent?userId=${this.props.userId}&eventId=${this.props.event.id}`)
    .then(function(response){
      if(response.ok){
        return response.json();
      }else{
        throw new Error('Error in ViewEventComponent.js componentDidMount, Network response not okay')
      }
    }).then(json => {
      this.setState({isSignedUp:json})
    });
  }

  render(){

    var but;
    if(this.props.isLoggedIn == "True"){
      if(this.state.isSignedUp){
        but = <Button>You're Already Signed up</Button>
      }else{
        but = <Button onClick={()=>this.handleSubmit()}>Sign Up!</Button>
      }
    }else{
      but = <Button variant="secondary">
        <Link to="/Profile">Sign In to Sign Up</Link>
      </Button>
    }

    return(
      <div>
        <h1>{this.props.event.name}</h1>
        <h3>{this.props.event.latitude}</h3>
        <h3>{this.props.event.longitude}</h3>
        {but}
      </div>
    )

  }
}

export default ViewEventComponent;
