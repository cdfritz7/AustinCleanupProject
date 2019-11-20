import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { renderToString } from 'react-dom/server';

//https://blog.mapbox.com/mapbox-gl-js-react-764da6cc074a
//---MAPBOX API---
//https://docs.mapbox.com/mapbox-gl-js/api/#popup.event:open

//--fontawesome react icons--
//https://fontawesome.com/how-to-use/on-the-web/using-with/react

mapboxgl.accessToken = 'pk.eyJ1IjoiY2Rmcml0ejciLCJhIjoiY2sydzBmenM3MGF1djNrcWR3YzRmaGQ0aCJ9.y0TZwO3PN1sYjakT02t1fQ';

class MapBoxMapComponent extends Component {

  static defaultProps = {
    lng: 4,
    lat: 34,
    zoom: 10,
    onMove: undefined,
    events: [],
    eventRefs: []
  }

  constructor(props){
    super(props);

    this.state = {
      lng: props.lng,
      lat: props.lat,
      zoom: 10
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.markers = [];
  }

  componentDidMount() {

    const {lng, lat, zoom} = this.state;

    console.log(this.props.events);
    console.log(this.props.testprop);

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });

    this.map = map;

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
    }});
  }

  render() {
    const {lng, lat, zoom} = this.state;

    //remove old markers
    for(var i = 0; i<this.markers.length; i++){
      this.markers[i].remove();
    }

    this.markers = [];

    //add new markers
    const onclick = this.props.onClick;
    const onmousein = this.props.onMouseIn;
    const onmouseout = this.props.onMouseOut;

    for(var i = 0; i<this.props.events.length; i++){
      let evnt = this.props.events[i];
      let evnt_ref = this.props.eventRefs[i];

      let popup = new mapboxgl.Popup()
        .setHTML(`<h5>${evnt.name}</h5><p>${evnt.description}</p>`);

      var el = document.createElement('div');
      el.innerHTML = renderToString(<FontAwesomeIcon icon={faMapMarkerAlt}
                                                     size="2x"
                                                     color="#00B0B0"/>);
      el.id = 'marker';

      let marker = new mapboxgl.Marker(el, {offset:[-25, -25]})
        .setLngLat([evnt.longitude, evnt.latitude])
        .setPopup(popup)
        .addTo(this.map);

      el.addEventListener('mouseenter', () => {evnt_ref.current.scrollIntoView({behavior: 'smooth', block: 'start'})});
      el.addEventListener('click', ()=>{onclick({showViewEventModal:true, displayedEvent:evnt})});

      this.markers.push(marker);
    }

    const style = {
      position:'absolute',
      top:0,
      bottom:0,
      width:'100%',
      height:'100%',
      overflow: 'hidden'
    };

    return <div style={style} ref={el => this.mapContainer = el} />;
  }
}

export default MapBoxMapComponent;
