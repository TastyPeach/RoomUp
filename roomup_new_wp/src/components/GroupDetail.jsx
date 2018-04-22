import React from 'react';
import styles from './components.css'
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import { Container,Button, Select, Input,Dropdown, Checkbox ,Card ,Image, Message, Grid,Segment} from 'semantic-ui-react';
import propTypes from 'prop-types';
import axios from 'axios';

export default class GroupDetail extends React.Component{
    
    
    constructor(){
        super();
        this.state={
            GroupViewDetails:<div></div>,
			user_token:'1d441aca1002c863b724c4170ec7d7f793683ad0',
        }

        this.generateGroupDetailsView=this.generateGroupDetailsView.bind(this);
        this.loadGroupProfile();
    }

    loadGroupProfile()
	{
		var config={"Authorization":"Token "+this.state.user_token};
		axios({
    		url: 'http://18.219.12.38:8001/get_group_info?gid=1',
    		method: 'get',
    		headers: config
 			})
 		.then(response => {
		  console.log(response);
		  this.generateGroupDetailsView(response);
 		}) 
 		.catch(err => {
			//Error
    		console.log(err);
 		});	
	}

    generateGroupDetailsView(response)
	{
		this.setState({GroupViewDetails:(
		<Grid columns={1} divided>
    	<Grid.Row stretched>
      	<Grid.Column>
        	<Segment>Nickname:{" "+response.data.users.id}</Segment>
        	{/* <Segment>First Name:{" "+response.data.uid.first_name}</Segment>
			<Segment>Last Name:{" "+response.data.uid.last_name}</Segment> */}
      	</Grid.Column>
    	</Grid.Row>
  		</Grid>)});
	}

    render(){
        
        return (
            <div className="searchComp">
            <h3>Group Details</h3>
            <Button.Group>
             <Link to={"/search"}> 
             <Button color="green">Back to Search</Button>
             </Link>
             </Button.Group>
             <div className="result_display">
				 {this.state.GroupViewDetails}
             </div>
            </div>);
    }

    
    componentWillMount(){
        console.log("UserProfile Enter");
	}
}