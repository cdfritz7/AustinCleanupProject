 import React, {Component} from 'react';
import {Form,
        Container,
        Row,
        Col,
        Card,
        Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import './css/SearchPage.css';
import APIRequest from './APIRequests.js';

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

    //performs geocoding to transform search string into latitude longitude
    //https://docs.mapbox.com/api/search/
    const search = this.state.search.split(" ").join("%20");
    const token = 'pk.eyJ1IjoiY2Rmcml0ejciLCJhIjoiY2sydzBmenM3MGF1djNrcWR3YzRmaGQ0aCJ9.y0TZwO3PN1sYjakT02t1fQ';
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${token}`).then(function(response){
        if(response.ok){
          return response.json();
        }else{
          throw new Error('Error in searchpage.handleSubmit');
        }
    }).then(json=>{
      var lat = json["features"][0]["geometry"]["coordinates"][1];
      var lng = json["features"][0]["geometry"]["coordinates"][0];
      this.setState({toMapPage:true, latitude:lat, longitude:lng});
    });
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
        <div style={{textAlign:"center"}}>
            <div className="centered titleText">
              SOJOIN4
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Control style={{width:'66vw', height:'6vh'}}
                         placeholder="Search!"
                         onChange={this.handleChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                Go!
                </Button>
              </Form>
            </div>
          </div>

    )
  }
  }
}

export default SearchPage;
