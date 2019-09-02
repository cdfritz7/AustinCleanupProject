import React, {Component} from 'react';
import {Form,
        Container,
        Row,
        Col,
        Card,
        Button} from 'react-bootstrap';

class AddAccountComponent extends Component{

  constructor(props){
    super(props)

    this.state = {
      email:'',
      username:'',
      password:''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();

    //post to database
    const response = fetch('http://localhost:8080/austinCleanupAPI/addUser', {
      method: 'POST',
      headers: {'Accept': 'application/json', 'Content-Type':'application/json'},
      body: JSON.stringify({
        'email': this.state.email,
        'username': this.state.username,
        'password': this.state.password
      })
    });

    console.log(response);

    this.setState({
      email:'',
      username:'',
      password:''
    })
  }

  handleEmailChange(event){
    this.setState({email:event.target.value});
  }

  handleUsernameChange(event){
    this.setState({username:event.target.value});
  }

  handlePasswordChange(event){
    this.setState({password:event.target.value});
  }

  render(){
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control value={this.state.email} placeholder="Enter Your Email" onChange={this.handleEmailChange}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control value={this.state.username} placeholder="New Username" onChange={this.handleUsernameChange}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control value={this.state.password} placeholder="New Password" onChange={this.handlePasswordChange}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

export default AddAccountComponent;
