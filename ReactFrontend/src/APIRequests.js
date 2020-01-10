class APIRequest {
  static getAPIBase(){
    //production
    return 'http://sojoin-api.us-east-2.elasticbeanstalk.com:8080/';
    //development
    //return 'http://localhost:8080/';
  }
}

export default APIRequest;
