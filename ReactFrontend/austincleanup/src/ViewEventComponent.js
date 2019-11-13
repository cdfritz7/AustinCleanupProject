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
      isSignedUp:false,
      isOrganizer:false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemoval = this.handleRemoval.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
    if(this.props.isLoggedIn){
      fetch(`http://localhost:8080/austinCleanupAPI/isUserSignedUpForEvent?userId=${this.props.userId}&eventId=${this.props.event.id}`)
      .then(function(response){
        if(response.ok){
          return response.json();
        }else{
          throw new Error('Error in ViewEventComponent.js componentDidMount, Network response not okay')
        }
      }).then(json => {
        this.setState({isSignedUp:json.isSignedUp, isOrganizer:json.isOrganizer});
      });
    }

  }

  handleRemoval(){
    if(this.props.isLoggedIn){
      fetch('http://localhost:8080/austinCleanupAPI/deleteUserEvent', {
        method:"POST",
        headers: {'Accept': 'application/json', 'Content-Type':'application/json'},
        body: JSON.stringify({
          'userId': this.props.userId.toString(),
          'eventId': this.props.event.id.toString()
        })
      }).then(function(response){
        if(response.ok){
          return response.json();
        }else{
          throw new Error('Error in ViewEventComponent.js, user event interaction not found in database');
        }
      }).then(json=>{
        if(typeof this.props.removeSignUp != 'undefined'){
          this.props.removeSignUp();
        }
      });
    }
  }

  handleDelete(){
    console.log(this.props.event.id.toString());
    fetch('http://localhost:8080/austinCleanupAPI/absoluteDeleteEventById', {
      method:'POST',
      headers: {'Accept': 'application/json', 'Content-Type':'application/json'},
      body: JSON.stringify({
         "id": this.props.event.id.toString()
      })
    }).then(function(response){
      if(!response.ok){
        throw new Error('Error in ViewEventComponent.js handleDelete, event not found in database');
      }
    }).then(json=>{
      if(typeof this.props.removeSignUp != 'undefined'){
        this.props.removeSignUp();
      }
    });
  }

  render(){

    var but;
    if(!this.state.isOrganizer){
      if(this.props.isLoggedIn === "True"){
        if(this.state.isSignedUp){
          if(!this.props.removeSignUp){
            but = <Button>You're Already Signed Up!</Button>
          }else{
            but = <Button variant="warning"
                          onClick={()=>(this.handleRemoval())}>Remove Yourself</Button>
          }
        }else{
          but = <Button onClick={()=>this.handleSubmit()}>Sign Up!</Button>
        }
      }else{
        but = <Button variant="light">
          <Link to="/Profile">Sign In to Create Events</Link>
        </Button>
      }
    }

    var deleteButton;
    if(this.props.isLoggedIn === "True"){
      if(this.state.isOrganizer){
        deleteButton = <Button onClick={()=>this.handleDelete()}
                               variant="danger"> Delete Event </Button>
      }
    }

    return(
      <div>
        <h1>{this.props.event.name}</h1>
        <h3>{this.props.event.latitude}</h3>
        <h3>{this.props.event.longitude}</h3>
        {but}
        {deleteButton}
      </div>
    )

  }
}

export default ViewEventComponent;
