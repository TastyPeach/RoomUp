import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import axios from 'axios';

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDUGe_pljDYYjCTUe5QbdRFv4OqY4AIipY&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `700px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>(
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: props.lat, lng:  props.lng }}
  >
    {props.markers}
  </GoogleMap>
))

//{props.isMarkerShown && <Marker position={{ lat: props.lat, lng:  props.lng }} onClick={props.onMarkerClick} />}
//https://maps.googleapis.com/maps/api/place/textsearch/json?query=123+main+street&key=YOUR_API_KEY
/*
var str = 'a b c';
var replaced = str.split(' ').join('+');
*/
//lat: 40.116421, lng:  -88.243385


export default class MapComponent extends React.PureComponent {
	
    constructor(props)
	{
		super(props);
		this.state = { 
			isMarkerShown: false,
			markers:<div></div>,
			locations:[]
		}
		this.getUserToken=this.props.getUserToken;
		this.generatePMMarkers=this.generatePMMarkers.bind(this);
		this.onReceivePMList=this.onReceivePMList.bind(this);
		this.getPMList=this.getPMList.bind(this);
		this.addMarker=this.addMarker.bind(this);
		this.generateMarkers=this.generateMarkers.bind(this);
		this.getPMList();
	}
	
	addMarker(location)
	{
		if(location!==undefined)
		{
		var lat=location.lat;
		var lng=location.lng;
		this.setState({locations: this.state.locations.concat([location])});
		console.log(this.state.locations);
		this.setState({markers: this.generateMarkers()});
		}
	}
	
	
	generateMarkers(){
	var gArray=this.state.locations;
	var listItems=gArray.map((locEntry,index) =>
    // Correct! Key should be specified inside the array.
    (
	 <Marker key={index} position={locEntry}/>
	)
  	);
  	return (
    	<div>
      	{listItems}
    	</div>
  	);
    }
	
	generatePMMarkers(response)
	{
		console.log(response.data.length);
		var i;
		for (i = 0; i < response.data.length; i++) { 
			var baseURL='https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
			var addr = response.data[i].gid.aid.address;
		    addr = addr.split(' ').join('+');
			baseURL=baseURL+addr;
			baseURL=baseURL+'&key=AIzaSyDUGe_pljDYYjCTUe5QbdRFv4OqY4AIipY';
			axios({
    			url: baseURL,
    			method: 'get',
 			})
 			.then(response => {
				console.log(response.data.results[0].geometry.location);
				this.addMarker(response.data.results[0].geometry.location);
 			}) 
 			.catch(err => {
				//Error
    			console.log(err);
 			});
		
		}
	}
	
	
	onReceivePMList(response)
	{
		if(response.data.length!==0)
		{
		  this.generatePMMarkers(response);
		}
		else{
		  //empty: no marks
		}
	}
	
	
    getPMList()
	{
		console.log("getPMList")
	    var config={"Authorization":"Token "+this.getUserToken()};
		axios({
    		url: 'http://18.219.12.38:8001/get_potential_match',
    		method: 'get',
    		headers: config
 			})
 		.then(response => {
		this.onReceivePMList(response);
 		}) 
 		.catch(err => {
			//Error
    		console.log(err);
 		});
	}


  componentDidMount() {
    //this.delayedShowMarker()
	 setInterval(this.getPMList, 3000);
  }
 
 

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }
  
  render() {
    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
		lat={40.116421}
		lng={-88.243385}
		markers={this.state.markers}
      />
    )
  }
}