import React, {Component} from 'react';
import {ListGroup, Button} from 'react-bootstrap';

/*
parent should pass a .setState() call as an onClick prop to show modal for
adding events
ex:
  <EventList events={this.state.events}
             onClick={(showevent, event)=>{this.setState(showevent, event)}}/>
*/
class EventList extends Component {
  render(){
    var event_list = this.props.events.map(my_event =>
      <ListGroup.Item key={my_event.id.toString()} eventKey={my_event.id.toString()}>
       <Button onClick={()=>this.props.onClick({showViewEventModal:true, displayedEvent:my_event})}>
        {my_event.name}
       </Button>
      </ListGroup.Item>
    )

    return (
      <div>
        <ListGroup>
          {event_list}
        </ListGroup>
      </div>
    )
  }
}

export default EventList;
