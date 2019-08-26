package hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.Optional;
import org.json.JSONObject;

@Controller    // This means that this class is a Controller
@RequestMapping(path="/austinCleanupAPI") // This means URL's start with /demo (after Application path)
public class MainController {

	/*
	------------------------------------------------------------
	User Repository Interactions
	------------------------------------------------------------
	 */

	@Autowired // This means to get the bean called userRepository
	           // Which is auto-generated by Spring, we will use it to handle the data
	private UserRepository userRepository;

	@PostMapping(path="/addUser") // Map ONLY POST Requests
	public @ResponseBody String addNewUser (@RequestParam String name
			, @RequestParam String email
			, @RequestParam String username
			, @RequestParam String password) {

		// @ResponseBody means the returned String is the response, not a view name
		// @RequestParam means it is a parameter from the GET or POST request

		User n = new User();
		n.setName(name);
		n.setEmail(email);
		n.setUsername(username);
		n.setPassword(password);
		userRepository.save(n);
		return "User Saved";
	}

	@PostMapping("/deleteUserById")
	public @ResponseBody String deleteUser(@RequestParam String id){
		userRepository.deleteById(Integer.parseInt(id));
		return "User Deleted";
	}

	@CrossOrigin(origins = "http://localhost:3000") //so we can make requests from react when in development revisit
	@GetMapping(path="/allUsers")
	public @ResponseBody Iterable<User> getAllUsers() {
		// This returns a JSON or XML with the users
		return userRepository.findAll();
	}

	@GetMapping(path="/userById")
	public @ResponseBody Optional<User> getUserById(@RequestParam String id){
		//returns info about an individual user by id
		return userRepository.findById(Integer.parseInt(id));
	}


	/*
	------------------------------------------------------------
	Event Repository Interactions
	------------------------------------------------------------
	 */

	@Autowired //get the bean called eventRepository, we will use it to handle event data
	private EventRepository eventRepository;

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/addEvent")
	public @ResponseBody String addEvent(@RequestBody String jsonStr){

		JSONObject jObject = new JSONObject(jsonStr);
		System.out.println(jObject);

		Event n = new Event();
		n.setName(jObject.getString("name"));
		n.setAddress(jObject.getString("address"));
		n.setLatitude(Double.parseDouble(jObject.getString("latitude")));
		n.setLongitude(Double.parseDouble(jObject.getString("longitude")));
		n.setDescription(jObject.getString("description"));
		eventRepository.save(n);

		return "Event Saved";
	}

	@PostMapping("/deleteEventById")
	public @ResponseBody String deleteEvent(@RequestParam String id){
		eventRepository.deleteById(Integer.parseInt(id));
		return "Event Deleted";
	}

	@CrossOrigin(origins = "http://localhost:3000") //so we can make requests from react when in development revisit
	@GetMapping("/allEvents")
	public @ResponseBody Iterable<Event> getAllEvents(){
		return eventRepository.findAll();
	}

	@CrossOrigin(origins = "http://localhost:3000") //so we can make requests from react when in development revisit
	@GetMapping("/eventById")
	public @ResponseBody Optional<Event> getEventById(@RequestParam String id){
		return eventRepository.findById(Integer.parseInt(id));
	}

	//not done, get list of events in a 10 mile radius of a latitude and longitude
	@CrossOrigin(origins = "http://localhost:3000") //so we can make requests from react when in development revisit
	@GetMapping("/eventsByLatLong")
	public @ResponseBody Iterable<Event> getEventsByLatLng(@RequestParam String lat, @RequestParam String lng){
		Iterable<Event> allEvents = eventRepository.findAll();
		ArrayList<Event> closeEvents = new ArrayList<Event>();

		Double in_lat = Double.parseDouble(lat);
		Double in_lng = Double.parseDouble(lng);

		//this is not perfect, ideally we would want to calculate by distance,
		//but the distance between longitudes at different latitudes is not constant
		//this will work for our small scale in texas
		Double DISTANCE_THRESHOLD = 10.0;
		for(Event event: allEvents){
			Double event_lat = event.getLatitude();
			Double event_lng = event.getLongitude();
			Double distance = Math.sqrt((event_lat-in_lat)*(event_lat-in_lat)+(event_lng-in_lng)*(event_lng-in_lng));
			if(distance < DISTANCE_THRESHOLD){
				closeEvents.add(event);
			}
		}

		return closeEvents;
  }

	/*
	------------------------------------------------------------
	UserEvent Repository Interactions
	This repository holds information about which users are associated
	with which events
	------------------------------------------------------------
	 */

	@Autowired
	private UserEventMapRepository userEventRepository;

	@PostMapping("/addUserEvent")
	public @ResponseBody String addUserEventInteraction(@RequestParam String userId,
														@RequestParam String eventId,
														@RequestParam String isOrganizer){
		UserEvent ue = new UserEvent();
		ue.setUserId(Integer.parseInt(userId));
		ue.setEventId(Integer.parseInt(eventId));
		ue.setOrganizer(Boolean.parseBoolean(isOrganizer));

		userEventRepository.save(ue);
		return "User/Event Mapping Saved";
	}

	@PostMapping("/deleteUserEventById")
	public @ResponseBody String deleteUserEventInteraction(@RequestParam String id){
		userEventRepository.deleteById(Integer.parseInt(id));
		return "User/Event Mapping Deleted";
	}

	@GetMapping("/allUserEvents")
	public @ResponseBody Iterable<UserEvent> getAllUserEvents(){
		return userEventRepository.findAll();
	}

	@GetMapping("/userEventById")
	public @ResponseBody Optional<UserEvent> getUserEventById(@RequestParam String id){
		return userEventRepository.findById(Integer.parseInt(id));
	}

}
