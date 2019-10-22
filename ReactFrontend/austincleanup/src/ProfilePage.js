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

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    this.props.logOff();
  }

  render(){
    return (
      <Container>
        <Row>
          <Col xs={4}>

          </Col>
          <Col xs={8}>
            <EventList events={this.props.events}
                       onClick={(showevent, event)=>{this.setState(showevent, event)}}/>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Button variant="primary"
                    onClick={() => {this.handleSubmit()}}>
              Log Out
            </Button>
          </Col>
        </Row>

        {/*modal for viewing events*/}
        <Modal show={this.state.showViewEventModal}
               onHide={()=>{this.setState({showViewEventModal:false})}}
               >
          <Modal.Header closeButton/>
          <Modal.Body><ViewEventComponent event={this.state.displayedEvent}/></Modal.Body>
        </Modal>

      </Container>

    )
  }
}


class ProfilePage extends Component {

  constructor(props){
    super(props);

    this.state = {
      login_response:sessionStorage.getItem("isLoggedOn"),
      userId:sessionStorage.getItem("userId"),
      username:'',
      password:'',
      events:[]
    };

    this.handleLogonSubmit = this.handleLogonSubmit.bind(this);
    this.handleLogoffSubmit = this.handleLogoffSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.resetEvents = this.resetEvents.bind(this);
  }

  handleLogoffSubmit(){
    this.setState({login_response:'False',
                   username:'',
                   password:'',
                   events:[]});

    sessionStorage.setItem('isLoggedOn', "False");
  }

  handleLogonSubmit(event){
    event.preventDefault();

    console.log('Submitted');

    fetch('http://localhost:8080/austinCleanupAPI/checkIsUser', {
      method:"POST",
      headers: {'Accept': 'application/json', 'Content-Type':'application/json'},
      body: JSON.stringify({
        'username': this.state.username,
        'password': this.state.password
      })
    }).then(response => {
      if(response.ok){
        return response.json();
      }else{
        console.log('Network response not okay');
      }
    }).then(json => {
      this.setState({login_response:json.IsValid, user_id:json.UserId});
    });

    this.resetEvents();
  }

  resetEvents(){
    fetch(`http://localhost:8080/austinCleanupAPI/eventsByUserId?id=${this.state.userId}`)
                    .then(function(response){
                      if(response.ok){
                        return response.json();
                      }else{
                        throw new Error('Error in ProfilePage.js, logged in userId not found in database');
                      }
                    }).then(json=>{
                      this.setState({events:json});
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
                                       events={this.state.events}/>;
      sessionStorage.setItem('isLoggedOn', this.state.login_response);
      sessionStorage.setItem('userId', this.state.user_id);
    }else{
      ret_component = <LoginComponent onLoginSubmit={this.handleLogonSubmit}
                                      handleUsernameChange={this.handleUsernameChange}
                                      handlePasswordChange={this.handlePasswordChange}
                                      username={this.state.username}
                                      passowrd={this.state.password}/>;
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
