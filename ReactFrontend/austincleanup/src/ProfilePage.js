import React, {Component} from 'react';
import LoginComponent from './LoginComponent.js';
import {
        Container,
        Row,
        Col,
        Button
       } from 'react-bootstrap';

class ProfileContent extends Component {

  constructor(props){
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    this.props.logOff();
  }

  render(){
    return (
      <Container>
        <Row>
          <Col xs={12}>

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
      </Container>

    )
  }
}


class ProfilePage extends Component {

  constructor(props){
    super(props);

    this.state = {
      login_response:'',
      username:'',
      password:''
    };

    this.handleLogonSubmit = this.handleLogonSubmit.bind(this);
    this.handleLogoffSubmit = this.handleLogoffSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleLogoffSubmit(){
    this.setState({login_response:'False',
                   username:'',
                   password:''});

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
      this.setState({login_response:json.IsValid});
    });
    //depending on whether response is okay,
    //set local storage boolean keeping track of login to true along with user id
    //right now assumes response was valid and sets to True
    sessionStorage.setItem('isLoggedOn', 'True');
  }

  handleUsernameChange(usern){
    this.setState({username:usern});
  }

  handlePasswordChange(passw){
    this.setState({password:passw});
  }

  render(){

    var is_logged_in = sessionStorage.getItem('isLoggedOn');
    var ret_component;

    console.log(is_logged_in);
    console.log(typeof is_logged_in);
    console.log(typeof "True");

    if(is_logged_in === "True"){
      ret_component = <ProfileContent logOff={this.handleLogoffSubmit}/>;
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
