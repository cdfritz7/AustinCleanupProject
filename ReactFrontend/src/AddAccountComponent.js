import React, {Component} from 'react';
import {Form,
        Container,
        Row,
        Col,
        Card,
        Button,
        Alert} from 'react-bootstrap';

class AddAccountComponent extends Component{

  constructor(props){
    super(props)

    this.state = {
      email:'',
      username:'',
      password:'',
      cpassword:'',
      wrong_password:false,
      user_exists:false,
      weak_password:false,
      invalid_username:false,
      invalid_email:false,
      addition_success:false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleCPasswordChange = this.handleCPasswordChange.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();

    //post to database
    fetch('http://localhost:8080/austinCleanupAPI/addUser', {
      method: 'POST',
      headers: {'Accept': 'application/json', 'Content-Type':'application/json'},
      body: JSON.stringify({
        'email': this.state.email,
        'username': this.state.username,
        'password': this.state.password,
        'cpassword': this.state.cpassword
      })
    }).then(function(response){
      if(response.ok){
        console.log(response);
        return response.json();
      }else{
        throw new Error("Error in Add Account Component, response not ok");
      }
    }).then(
      json=>{
        if(json.response === "User already exists"){
          this.setState({user_exists:true, weak_password:false, wrong_password:false,
                         invalid_username:false,
                         invalid_email:false, addition_success:false});
        }else if(json.response === "Passwords do not match"){
          this.setState({wrong_password:true, weak_password:false,
                         user_exists:false, invalid_username:false,
                         invalid_email:false,  addition_success:false});
        }else if(json.response === "Password not strong enough"){
          this.setState({weak_password:true, wrong_password:false,
                         user_exists:false, invalid_username:false,
                         invalid_email:false, addition_success:false});
        }else if(json.response == "Invalid username"){
          this.setState({invalid_username:true, weak_password:false, wrong_password:false,
                         user_exists:false,
                         invalid_email:false, addition_success:false})
        }else if(json.response == "Invalid email"){
          this.setState({invalid_email:true, weak_password:false, wrong_password:false,
                         user_exists:false, invalid_username:false,
                         addition_success:false})
        }
        else{
          this.setState({weak_password:false, wrong_password:false,
                         user_exists:false, invalid_username:false,
                         invalid_email:false, addition_success:true, email:'',
                         username:'', password:'', cpassword:''})
        }
      }
    );

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

  handleCPasswordChange(event){
    this.setState({cpassword:event.target.value});
  }

  render(){
    var error_message;
    if(this.state.wrong_password){
      error_message = <Alert variant='warning'>Passwords do not match</Alert>
    }else if(this.state.weak_password){
      error_message = <Alert variant='warning'>Password is too weak! Passwords must be longer than 8 digits, and have at least one number, one uppercase letter, and one symbol.</Alert>
    }else if(this.state.user_exists){
      error_message = <Alert variant='warning'>User already exists</Alert>
    }else if(this.state.invalid_username){
      error_message = <Alert variant='warning'>Username is invalid! Usernames must be longer than 3 characters.</Alert>
    }else if(this.state.invalid_email){
      error_message = <Alert variant='warning'>Email is invalid!</Alert>
    }else if(this.state.addition_success){
      error_message = <Alert variant='success'>User Added!</Alert>
    }

    return (
      <div>
        {error_message}
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
            <Form.Control type="password" value={this.state.password} placeholder="New Password" onChange={this.handlePasswordChange}/>
            <Form.Text className="text-muted">
              Passwords must be longer than 8 digits, and have at least one number, one uppercase letter, and one symbol.
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" value={this.state.cpassword} placeholder="Confirm Password" onChange={this.handleCPasswordChange}/>
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
