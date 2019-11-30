import React, {Component} from 'react';
import LoginComponent from './LoginComponent.js';
import {
        Container,
        Row,
        Col,
        Button,
        Modal
       } from 'react-bootstrap';

import ViewEventComponent from './ViewEventComponent.js';
import EventList from './EventList.js';

class ProfileContent extends Component {

  constructor(props){
    super(props)
    this.state = {
      showViewEventModal:false
    }
    this.removeSignUp = this.removeSignUp.bind(this);
  }

  removeSignUp(){
    this.setState({showViewEventModal:false});
    this.props.resetEvents();
  }

  render(){
    return (
      <Container>
        <Row>
          <Col xs={4}>
            <h4> Profile Information </h4>
          </Col>
          <Col xs={4}>
            <h4> Events I'm Signed Up For </h4>
            <EventList events={this.props.signedUpEvents}
                       onClick={(showevent, event)=>{this.setState(showevent, event)}}/>
          </Col>
          <Col xs={4}>
            <h4> My Organized Events </h4>
            <EventList events={this.props.organizedEvents}
                       onClick={(showevent, event)=>{this.setState(showevent, event)}}/>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Button variant="primary"
                    onClick={() => {this.props.logOff()}}>
              Log Out
            </Button>
          </Col>
        </Row>

        {/*modal for viewing events*/}
        <Modal show={this.state.showViewEventModal}
               onHide={()=>{this.setState({showViewEventModal:false})}}
               >
          <Modal.Header closeButton/>
          <Modal.Body><ViewEventComponent event={this.state.displayedEvent}
                                          isLoggedIn={this.props.isLoggedIn}
                                          userId={this.props.userId}
                                          removeSignUp={this.removeSignUp}/></Modal.Body>
        </Modal>

      </Container>

    )
  }
}


class ProfilePage extends Component {

  constructor(props){
    super(props);

    this.state = {
      login_response:localStorage.getItem("isLoggedOn"),
      userId:localStorage.getItem("userId"),
      username:'',
      password:'',
      organizedEvents:[],
      signedUpEvents:[]
    };

    this.handleLogonSubmit = this.handleLogonSubmit.bind(this);
    this.handleLogoffSubmit = this.handleLogoffSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.resetEvents = this.resetEvents.bind(this);

    this.resetEvents();
  }

  handleLogoffSubmit(){
    this.setState({login_response:'False',
                   username:'',
                   userId:undefined,
                   password:'',
                   organizedEvents:[],
                   signedUpEvents:[]});

    localStorage.setItem('isLoggedOn', "False");
    localStorage.setItem('userId', undefined);
  }

  async handleLogonSubmit(event){
    event.preventDefault();

    const response = await fetch('http://localhost:8080/austinCleanupAPI/checkIsUser', {
      method:"POST",
      headers: {'Accept': 'application/json', 'Content-Type':'application/json'},
      body: JSON.stringify({
        'username': this.state.username,
        'password': this.state.password
      })
    });

    const result = await response.json();

    if(result.IsValid==="True"){
      this.resetEvents(result.UserId);
      this.setState({login_response:result.IsValid, userId:result.UserId});
      localStorage.setItem('isLoggedOn', result.IsValid);
      localStorage.setItem('userId', result.UserId);
    }

  }

  resetEvents(userId){
    if(typeof userId === 'undefined'){
      userId = localStorage.getItem("userId");
    }

    fetch(`http://localhost:8080/austinCleanupAPI/detailedEventsByUserId?id=${userId}`)
    .then(function(response){
      if(response.ok){
        return response.json();
      }else{
        throw new Error('Error in ProfilePage.js when calling signedUpEventsByUserId');
      }
    }).then(json=>{
      this.setState({signedUpEvents:json.signedUpEvents, organizedEvents:json.organizedEvents});
    });
  }

  handleUsernameChange(usern){
    this.setState({username:usern});
  }

  handlePasswordChange(passw){
    this.setState({password:passw});
  }

  render(){
    var is_logged_in = this.state.login_response;
    var ret_component;

    if(is_logged_in === "True"){
      ret_component = <ProfileContent logOff={this.handleLogoffSubmit}
                                       signedUpEvents={this.state.signedUpEvents}
                                       organizedEvents={this.state.organizedEvents}
                                       isLoggedIn={this.state.login_response}
                                       userId={this.state.userId}
                                       resetEvents={this.resetEvents}/>;

    }else{
      ret_component = <LoginComponent onLoginSubmit={this.handleLogonSubmit}
                                      handleUsernameChange={this.handleUsernameChange}
                                      handlePasswordChange={this.handlePasswordChange}
                                      username={this.state.username}
                                      password={this.state.password}/>;
    }

    return (
        <Container>
          <Row>
            <Col xs={12}>
              {ret_component}
            </Col>
          </Row>
        </Container>
    )
  }
}

export default ProfilePage;
