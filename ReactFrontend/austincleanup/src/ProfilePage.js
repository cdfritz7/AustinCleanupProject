import React, {Component} from 'react';
import LoginComponent from './LoginComponent.js';
import {
        Container,
        Row,
        Col
       } from 'react-bootstrap';

class ProfilePage extends Component {
  render(){
    return (
        <Container>
          <Row>
            <Col xs={12}>
              <LoginComponent />
            </Col>
          </Row>
        </Container>
    )
  }
}

export default ProfilePage;
