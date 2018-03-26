import React, { Component } from 'react'
import { Button, Menu, Dropdown, Card, Segment} from 'semantic-ui-react'
import propTypes from 'prop-types'
import styles from './Home.scss'
import SubMenu from '../SubMenu.jsx'
import axios from 'axios'
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'

//test_only
var jsonResults=[
    {"addr":"Apt#101, 1010 University Avenue","gID":16001,"memberName":["apple"]},
    {"addr":"Apt#102, 1010 University Avenue","gID":16002,"memberName":["banana","peach"]},
    {"addr":"Apt#103, 1010 University Avenue","gID":16003,"memberName":["blackberries"]}
  ];

export default class Home extends Component {
	constructor()
	{
		super();
	    this.state={
		login:false,
		default_token:'1d441aca1002c863b724c4170ec7d7f793683ad0',
		PMdisplay:<div></div>};
		this.loginOnClick=this.loginOnClick.bind(this);
		this.onReceivePM=this.onReceivePM.bind(this);
	}
	generatePMList(response){
	var listItems=response.data.map((addrEntry,index) =>
    (<Segment vertical key={index}  textAlign="center">
		<Link to={"/"+addrEntry.gid.gid}>{addrEntry.gid.group_name}</Link>
	 </Segment>)
  	);
  	return (
    	<Segment.Group>
      	{listItems}
    	</Segment.Group>
  	);
	}
	
	onReceivePM(response)
	{
		if(response.data.length!=0)
		{
		  this.setState({PMdisplay:this.generatePMList(response)});
		}
		else{
		this.setState({PMdisplay:
		 <Segment.Group>
         <Segment>It's empty.</Segment>
         </Segment.Group>})
		}
	}
	
	
	loginOnClick(){
		this.setState({login:true});
		
		//get potential match
		var config={"Authorization":"Token "+this.state.default_token};
		axios({
    		url: 'http://18.219.12.38:8001/get_potential_match',
    		method: 'get',
    		headers: config
 			})
 		.then(response => {
		this.onReceivePM(response);
 		}) 
 		.catch(err => {
			//Error
    		console.log(err);
 		});
	}
	
    render() {
		if(this.state.login==false){
			return(
			<div>
			<div className="userMenu" >
				<Button onClick={this.loginOnClick}>Login</Button>
		   	</div>
            <div className="Home">
                <h1>WeRoomie</h1>
                <div className="child">
                {this.props.children}
                </div>
            </div>
			</div>
        	)
		}
		else{
        return(
			<div>
            <Card className="PMList">
                <Card.Content>
                <Card.Header>
                    PotentialMatch List
                </Card.Header>
                </Card.Content>
            <Card.Content>  
				{this.state.PMdisplay}
            </Card.Content>
            </Card>
			<div className="userMenu" >
				<SubMenu></SubMenu>
		   	</div>
            <div className="Home">
                <h1>WeRoomie</h1>
                <div className="child">
                {this.props.children}
            </div>
            </div>
			</div>
        )
    	}
	}
	
}
