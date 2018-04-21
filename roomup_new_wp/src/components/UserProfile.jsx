import React from 'react';
import styles from './components.css'
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import { Button,Grid,Segment} from 'semantic-ui-react';
import propTypes from 'prop-types';
import axios from 'axios';

export default class UserProfile extends React.Component{
    
    
    constructor(){
        super();
        this.state={
			UserDetailsView:<div></div>,
			user_token:'1d441aca1002c863b724c4170ec7d7f793683ad0',
			gid:null
        }
		this.generateUserDetailsView=this.generateUserDetailsView.bind(this);
		this.leaveGroupButtonOnClick=this.leaveGroupButtonOnClick.bind(this);
		this.loadUserProfile=this.loadUserProfile.bind(this);
		this.loadUserProfile();
    }
	loadUserProfile()
	{
		var config={"Authorization":"Token "+this.state.user_token};
		axios({
    		url: 'http://18.219.12.38:8001/get_personal_info',
    		method: 'get',
    		headers: config
 			})
 		.then(response => {
		  console.log(response);
		  this.setState({gid:response.data.gid});
		  this.generateUserDetailsView(response);
 		}) 
 		.catch(err => {
			//Error
    		console.log(err);
 		});	
	}
	
	leaveGroupButtonOnClick(e)
	{
		var gid=this.state.gid;
		console.log(gid);
		var bodyFormData = new FormData();
		bodyFormData.set('gid', gid);
		axios({
    		method: 'post',
    		url: 'http://18.219.12.38:8001/leave_from_group',
    		data: bodyFormData,
    		config: { headers: {
				'Content-Type': 'multipart/form-data',
				}},
			headers:{'Authorization':"Token "+this.state.user_token}
			})
    .then((response)=>{
        //handle success
		console.log("leave group success");
		this.loadUserProfile();
    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });
		
	}
	
	generateUserDetailsView(response)
	{
		var gid_string;
		var gid_segment;
		if(response.data.gid==null)
		{
			gid_string=" You haven't add to any group.";
			gid_segment=("GID:You haven't add to any group.");
		}
	    else
		{
			gid_string=""+response.data.gid;
			gid_segment=(<Grid columns={2} divided>
    			<Grid.Row stretched>
      			<Grid.Column>
					<Segment>GID:{gid_string}</Segment>
				</Grid.Column>
				<Grid.Column>
				<Button color="blue" onClick={this.leaveGroupButtonOnClick}>Leave Group</Button>	
				</Grid.Column>
					</Grid.Row>
				</Grid>);
		}
		this.setState({UserDetailsView:(
		<Grid columns={1} divided>
    	<Grid.Row stretched>
      	<Grid.Column>
        	<Segment>Nickname:{" "+response.data.uid.username}</Segment>
        	<Segment>First Name:{" "+response.data.uid.first_name}</Segment>
			<Segment>Last Name:{" "+response.data.uid.last_name}</Segment>
        	<Segment>
				{gid_segment}
			</Segment>
      	</Grid.Column>
    	</Grid.Row>
  		</Grid>)});
	}

    render(){
        
        return (
            <div className="searchComp">
            <h3>User Profile</h3>
            <Button.Group>
             <Link to={"/search"}> 
             <Button color="green">Back to Search</Button>
             </Link>
             </Button.Group>
             <div className="result_display">
				 {this.state.UserDetailsView}
             </div>
            </div>);
    }

    
    componentWillMount(){
        console.log("UserProfile Enter");
	}
}