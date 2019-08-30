import React, {Component} from 'react';
import {Form,
        Container,
        Row,
        Col,
        Card,
        Button} from 'react-bootstrap';

class LoginComponent extends Component {

  constructor(props){
    super(props);

    this.state = {
      username:'',
      password:''
    }

    let isLoggedOn = sessionStorage.getItem('isLoggedOn');
    if(isLoggedOn == "True"){
      this.setState({login_response:"True"})
    }else{
      this.setState({login_response:""})
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

  }

  handleSubmit(event){
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
      this.setState({'login_response':json.IsValid});
    });

    //depending on whether response is okay,
    //set local storage boolean keeping track of login to true along with user id
  }

  handleUsernameChange(event){
    this.setState({username:event.target.value});
  }

  handlePasswordChange(event){
    this.setState({password:event.target.value});
  }

  //checks if user is logged on before rendering the component
  componentDidMount(){
    let isLoggedOn = sessionStorage.getItem('isLoggedOn');
    if(isLoggedOn == "True"){
      this.setState({login_response:"True"})
    }
  }

  render(){
    if(this.state.login_response == "False" || this.state.login_response == ""){
      return (
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control value={this.state.username} onChange={this.handleUsernameChange}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control value={this.state.password} onChange={this.handlePasswordChange}></Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Log in
            </Button>
          </Form>
       </div>
      )
    }else{
      sessionStorage.setItem('isLoggedOn', 'True');
      console.log(sessionStorage.getItem('isLoggedOn'))
      return (<h1> Logged In </h1>);
    }
  }
}

export default LoginComponent;
