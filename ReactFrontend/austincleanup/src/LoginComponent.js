import React, {Component} from 'react';
import {Form,
        Container,
        Row,
        Col,
        Card,
        Button,
        Modal} from 'react-bootstrap';
import AddAccountComponent from './AddAccountComponent.js';

class LoginComponent extends Component {

  constructor(props){
    super(props);

    this.state = {
      showCreateAccountModal:false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

  }

  handleSubmit(event){
    this.props.onLoginSubmit(event);
  }

  handleUsernameChange(event){
    this.props.handleUsernameChange(event.target.value);
  }

  handlePasswordChange(event){
    this.props.handlePasswordChange(event.target.value);
  }

  //checks if user is logged on before rendering the component
  /*
  componentDidMount(){
    let isLoggedOn = sessionStorage.getItem('isLoggedOn');
    if(isLoggedOn === "True"){
      this.setState({login_response:"True"})
    }
  }
  */

  render(){
    console.log('login component rendered');

    return (
        <div>
          <Container>
            <Row>
              <Col xs={12} >
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control value={this.props.username} onChange={this.handleUsernameChange}></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={this.props.password} onChange={this.handlePasswordChange}></Form.Control>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Log in
                  </Button>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Button variant="primary" onClick={() => {this.setState({showCreateAccountModal:true})}} >
                Create New Account
                </Button>
                <Modal show={this.state.showCreateAccountModal}
                       onHide={() => {this.setState({showCreateAccountModal:false})}}>
                  <Modal.Header closeButton>
                    <Modal.Title>New Account</Modal.Title>
                  </Modal.Header>
                  <Modal.Body><AddAccountComponent /></Modal.Body>
                </Modal>
              </Col>
            </Row>
         </Container>
       </div>
    )
  }
}

export default LoginComponent;
