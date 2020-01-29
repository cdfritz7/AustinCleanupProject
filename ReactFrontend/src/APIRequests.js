class APIRequest {
  static getAPIBase(){
    //production
    return 'https://sojoinapi.net:443/';
    //development
    //return 'http://localhost:8080/';
  }
}

export default APIRequest;
