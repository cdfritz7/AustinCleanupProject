import React, {Component} from 'react';
import {ListGroup, Button} from 'react-bootstrap';

/*
parent should pass a .setState() call as an onClick prop to show modal for
adding events
ex:
  <EventList events={this.state.events}
             onClick={(showevent, event)=>{this.setState(showevent, event)}}/>
*/

class EventItem extends Component {

  static defaultProps = {
    myRef: undefined,
    hightlight: false
  }

  constructor(props){
    super(props);
  }

  render(){
    var color = this.props.highlight ? "000000" : "FF0000";
    return (
      <div>
        <ListGroup.Item action key={this.props.my_event.id.toString()}
                               eventKey={this.props.my_event.id.toString()}
                               onClick={()=>{
                                 this.props.onClick({showViewEventModal:true, displayedEvent:this.props.my_event})
                               }}
                               ref={this.props.myRef}
                               style={{color:color}}
                               >
          <h3>{this.props.my_event.name}</h3>
        </ListGroup.Item>
      </div>
    )
  }
}

class EventList extends Component {

  static defaultProps = {
    events: [],
    eventRefs:[]
  }

  render(){
    var event_items = []

    for(var i=0; i<this.props.events.length; i++){
      var highlighted = this.props.highlightedEvent && this.props.highlightedEvent.id==this.props.events[i].id;

      if(this.props.eventRefs.length === 0){
        event_items.push(<EventItem my_event={this.props.events[i]}
                                    onClick={this.props.onClick}
                                    highlight={highlighted}/>);
      }else{
        event_items.push(<EventItem my_event={this.props.events[i]}
                                    myRef={this.props.eventRefs[i]}
                                    onClick={this.props.onClick}
                                    highlight={highlighted}/>);
      }
    }

    return (
      <div>
        <ListGroup style={{height:"50vh", overflow:'scroll'}}>
          {event_items}
        </ListGroup>
      </div>
    )
  }
}

export default EventList;
