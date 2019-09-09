 import React, {Component} from 'react';
import {Form,
        Container,
        Row,
        Col,
        Card,
        Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import './css/SearchPage.css';

class SearchPage extends Component{

  constructor(props){
    super(props);
    this.state={search:'',
                latitude:'30.27',
                longitude:'-97.74',
                toMapPage: false,
                isValidSearchStr: false};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  isLocationValid(searchStr){
    //add something for geocoding
    return true;
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Submitted');

    //convert to latitude longitude
    var latlng = this.state.search.split(" ");
    var lat = latlng[0];
    var lng = latlng[1];

    this.setState({toMapPage:true, latitude:lat, longitude:lng});
  }

  handleChange(event){
    this.setState({search:event.target.value});
    if(this.isLocationValid(event.target.value)){
      this.setState({isValidSearchStr:true});
    }
  }

  render(){
    console.log('test')
    if(this.state.toMapPage){
      var redirectURL = `/MapPage/?lat=${this.state.latitude}&lng=${this.state.longitude}`;
      return <Redirect to={redirectURL}/>
    }else{
    return (
        <div>
          <div className="bg">
            <img src={require("./imgs/bridge_background.jpeg")} className="bg_img"/>
            <div className="centered titleText">
              Austin Cleanup Project
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Control style={{width:'66vw', height:'6vh'}}
                         placeholder="Type in latitude longitude"
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
  }
  }
}

export default SearchPage;
