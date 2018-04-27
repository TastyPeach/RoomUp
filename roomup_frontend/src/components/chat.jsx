import React from 'react';
import styles from './components.css'
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import { Container,Button, Select, Input,Dropdown, Checkbox ,Card ,Image, Message, Grid,Segment, Header, Table} from 'semantic-ui-react';
import propTypes from 'prop-types';
import axios from 'axios';
import Iframe from 'react-iframe';

export default class Chat extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
			gid: this.props.gid,
			user_token: this.user_token,
			loaded:false,
			fname: "Unknown"
        }
		console.log("Start Chat with Group:"+this.props.gid);
		this.loadUserProfile=this.loadUserProfile.bind(this);
		this.getUserToken=this.props.getUserToken;
		this.loadUserProfile();
		
    }
	
	loadUserProfile()
	{
		var config={"Authorization":"Token "+this.getUserToken()};
		axios({
    		url: 'http://18.219.12.38:8001/get_personal_info',
    		method: 'get',
    		headers: config
 			})
 		.then(response => {
		  console.log(response);
		  this.setState({fname:response.data.uid.first_name});
		  this.setState({loaded:true});
 		}) 
 		.catch(err => {
			//Error
    		console.log(err);
 		});	
	}
	
    render(){
		
		var baseURL="http://18.219.12.38:8080/"+this.state.gid+"/chat_room/?fname="+this.state.fname;
		console.log(baseURL)
		
        return (
            <div className="chat">
			{this.state.loaded&&
			<div>
			
			 <Segment className="chatHeader">
		     <h3>Chat Now</h3>
			 <Button.Group>
             <Link to={""}> 
             <Button color="green">Back to Search</Button>
             </Link>
             </Button.Group>
			 </Segment>
			  
			
		    <Iframe url= {"http://18.219.12.38:8080/"+this.state.gid+"/chat_room/?fname="+this.state.fname}
        	width="1000px"
        	height="600px"
        	id="myId"
			className="chatFrame"
        	position="relative"
			styles={{left: "10%"}}
        	allowFullScreen/>
					
		   </div>}
            </div>
			);
    }

    componentWillMount(){
        console.log("Chat Enter");
	}
}