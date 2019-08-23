import React, {Component} from 'react';
import {Form,
        Container,
        Row,
        Col,
        Card,
        Button} from 'react-bootstrap';
import './css/SearchPage.css';

class SearchPage extends Component{
  constructor(props){
    super(props);
    this.state={search:''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Submitted');
    console.log(fetch('/austinCleanupAPI/allUsers').
                then(response => console.log(response.json())));
    console.log(fetch('/austinCleanupAPI/allUsers').
                then(response => response.json()).
                then(json => JSON.stringify(json)));
    /*
    fetch('localhost:8080/austinCleanupAPI/allUsers')
    .then(response => response.json())
    .then(json => alert(JSON.stringify(json)));
    */
  }

  handleChange(event){
    this.setState({search:event.target.value})
  }

  render(){
    return (
      (
        <div>
          <div className="bg">
            <img src={require("./imgs/bridge_background.jpeg")} className="bg_img"/>
            <div className="centered titleText">
              Austin Cleanup Project
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Control style={{width:'66vw', height:'6vh'}}
                         placeholder="Search"
                         onChange={this.handleChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                Go!
                </Button>
              </Form>
            </div>
          </div>

          <br/>
          <Container>
            <Row>
              <Col xs={6}>
                <Card>
                <Card.Body>
                  <Card.Text>
                    Loren Ipsum Dolor sit amet
                    asdf Loren Ipsum Dolor sit amet asdf asdf asdf Loren Ipsum Dolor sit amet asdf asdf asdf Loren Ipsum Dolor sit amet asdf asdf asdf
                    asdf Loren Ipsum Dolor sit amet asdf asdf asdf Loren Ipsum Dolor sit amet asdf asdf asdf Loren Ipsum Dolor sit amet asdf asdf asdf
                    asdf Loren Ipsum Dolor sit amet asdf asdf asdf Loren Ipsum Dolor sit amet asdf asdf asdf Loren Ipsum Dolor sit amet asdf asdf asdf
                  </Card.Text>
                </Card.Body>
                </Card>
              </Col>
              <Col xs={6}>
                  <img className="cardSideImage" src={require('./imgs/bridge_background.jpeg')} />
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                  <img className="cardSideImage" src={require('./imgs/bridge_background.jpeg')} />
              </Col>
              <Col xs={6}>
                <Card>
                <Card.Body>
                  <Card.Text>
                    Loren Ipsum Dolor sit amet
                    asdf Loren Ipsum Dolor sit amet asdf asdf asdf Loren Ipsum Dolor sit amet asdf asdf asdf Loren Ipsum Dolor sit amet asdf asdf asdf
                    asdf Loren Ipsum Dolor sit amet asdf asdf asdf Loren Ipsum Dolor sit amet asdf asdf asdf Loren Ipsum Dolor sit amet asdf asdf asdf
                    asdf Loren Ipsum Dolor sit amet asdf asdf asdf Loren Ipsum Dolor sit amet asdf asdf asdf Loren Ipsum Dolor sit amet asdf asdf asdf
                  </Card.Text>
                </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )
    )
  }
}

export default SearchPage;
