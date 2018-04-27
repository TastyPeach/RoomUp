import React from "react"
import { compose, withProps, withStateHandlers} from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import axios from 'axios';
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");


const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAHs3vgmc8aGyqReVIjcgPkkNBi-QuQ4pE&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `700px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
   withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
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

const apikey1='AIzaSyDUGe_pljDYYjCTUe5QbdRFv4OqY4AIipY';
const apikey2='AIzaSyDliBDekfh79V7Grt8EiSZqC19Jxal10Hk';
const apikey3='AIzaSyAHs3vgmc8aGyqReVIjcgPkkNBi-QuQ4pE';


export default class MapComponent extends React.PureComponent {
	
    constructor(props)
	{
		super(props);
		this.state = { 
			isMarkerShown: false,
			markers:<div></div>,
			locations:[],
			group_names:[],
		}
		this.getUserToken=this.props.getUserToken;
		//this.getUserToken=this.getUserToken.bind(this);
		this.generatePMMarkers=this.generatePMMarkers.bind(this);
		this.onReceivePMList=this.onReceivePMList.bind(this);
		this.getPMList=this.getPMList.bind(this);
		this.addMarker=this.addMarker.bind(this);
		this.generateMarkers=this.generateMarkers.bind(this);
	}
	
	
	/*getUserToken()
	{
		if (document.cookie.indexOf('token') == -1 ) 
		{
				return ('');
		}
		else
		{
				return (document.cookie.split("=")[1]);
				
		}
	}*/
	
	addMarker(loc_info)
	{
		if(loc_info.loc!==undefined)
		{
		this.setState({locations: this.state.locations.concat([loc_info])});
		this.setState({markers: this.generateMarkers()});
		}
	}
	
	generateMarkers(){
	var gArray=this.state.locations;
	var listItems=gArray.map((locEntry,index) =>
    // Correct! Key should be specified inside the array.
    (
	 <Marker key={index} position={locEntry.loc}>
	  <InfoBox
        options={{ closeBoxURL: ``, enableEventPropagation: true }}
      >
        <div style={{ backgroundColor: `while`, opacity: 1.00, padding: `3px`, color:'black'}}>
          <div style={{ fontSize: `12px`, fontColor: `#08233B` }}>
             {locEntry.gname}
          </div>
        </div>
      </InfoBox>	
	 </Marker>
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
		var i;
		var temp=[];
		for (i = 0; i < response.data.length; i++)
		{
			temp=temp.concat([response.data[i].gid.group_name]);
		}
		var the_same=true;
		if(temp.length!==this.state.group_names.length)
	       the_same=false;
		for(i=0;i<temp.length;i++)
			if(temp[i]!==this.state.group_names[i])
				the_same=false;
		
		if(the_same===false)
		{
			
		this.setState({group_names: temp});	
		this.setState({locations:[]})
		response.data.forEach(
			(listItem, index)=>{
		    var baseURL='https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
			var addr = listItem.gid.aid.address;
		    addr = addr.split(' ').join('+');
		    addr = addr+ "+champaign+urbana"
			baseURL=baseURL+addr;
			baseURL=baseURL+'&key='+apikey3;
			axios({
    			url: baseURL,
    			method: 'get',
				dataType: 'jsonp'
 			})
 			.then(response => {
				var gname= this.state.group_names[index];
				if(response.data.results[0].geometry==undefined)
					console.log(gname);
				this.addMarker({loc:response.data.results[0].geometry.location,gname: gname});
 			}) 
 			.catch(err => {
				//Error
    			console.log(err);
 			});
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
		if(this.getUserToken()!=='')
		{
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
	}


  componentDidMount() {
    //this.delayedShowMarker()
	//this.getPMList();
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