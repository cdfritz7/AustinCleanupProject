import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';

//https://blog.mapbox.com/mapbox-gl-js-react-764da6cc074a

mapboxgl.accessToken = 'pk.eyJ1IjoiY2Rmcml0ejciLCJhIjoiY2sydzBmenM3MGF1djNrcWR3YzRmaGQ0aCJ9.y0TZwO3PN1sYjakT02t1fQ';

class MapBoxMapComponent extends Component {

  static defaultProps = {
    lng: 4,
    lat: 34,
    zoom: 10,
    onMove: undefined,
    events: []
  }

  constructor(props){
    super(props);

    this.state = {
      lng: props.lng,
      lat: props.lat,
      zoom: 10
    }

  }

  componentDidMount() {
    const {lng, lat, zoom} = this.state;

    console.log(this.props.events);

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });

    //changes latitude longitude state on move
    //and calls onMove method from parent component => used to update events in
    //parent
    map.on('move', ()=> {
      const {lng, lat} = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });

      if(this.props.onMove !== undefined){
        this.props.onMove(lat, lng);
      }

      /*
      this.props.events.forEach(function(event){
        console.log(event.name);
        const tooltip = new mapboxgl.Marker(<h1>e</h1>, {
          offset: [-120, 0]
        }).setLngLat([event.latitude, event.longitude]).addTo(map);
      });
      */

    });
  }

  render() {

    const {lng, lat, zoom} = this.state;

    const style = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '100%'
    };

    return <div style={style} ref={el => this.mapContainer = el} />;
  }
}

export default MapBoxMapComponent;
