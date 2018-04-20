import React, { Component } from 'react'
import { Button, Menu, Dropdown, Card, Segment, Divider} from 'semantic-ui-react'
import propTypes from 'prop-types'
import styles from './Home.css'
import SubMenu from '../SubMenu.jsx'
import axios from 'axios'
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'


import SearchComp from '../SearchComp.jsx';
import GroupDetail from '../GroupDetail.jsx';
import UserProfile from '../UserProfile.jsx';



//test_only
var jsonResults=[
    {"addr":"Apt#101, 1010 University Avenue","gID":16001,"memberName":["apple"]},
    {"addr":"Apt#102, 1010 University Avenue","gID":16002,"memberName":["banana","peach"]},
    {"addr":"Apt#103, 1010 University Avenue","gID":16003,"memberName":["blackberries"]}
  ];



export default class Home extends Component {
	constructor(){
		super();
	    this.state={
		login:false,
		user_token:'1d441aca1002c863b724c4170ec7d7f793683ad0',
		PMdisplay:<div></div>};
		this.loginOnClick=this.loginOnClick.bind(this);
		this.onReceivePM=this.onReceivePM.bind(this);
		this.onPMListChange=this.onPMListChange.bind(this);
		this.onClickDeletePMEntry=this.onClickDeletePMEntry.bind(this);
		this.toLogout=this.toLogout.bind(this);
	}
	
	toLogout()
	{
		this.setState({login:false});
	}
	
	onClickDeletePMEntry(e,d)
	{
		var pid=parseInt(d.className);
		console.log("Delete Button Hit ON PID:"+pid);
		
		var bodyFormData = new FormData();
		bodyFormData.set('pid', d.className);
		axios({
    		method: 'DELETE',
    		url: 'http://18.219.12.38:8001/delete_potential_match',
    		data: bodyFormData,
    		config: { headers: {
				'Content-Type': 'multipart/form-data',
				}},
			headers:{'Authorization':"Token "+this.state.user_token}
			})
    .then((response)=>{
        //handle success
		console.log("DELETE potential match success");
		this.onPMListChange();
    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });
		
	}
	
	onPMListChange()
	{
	    var config={"Authorization":"Token "+this.state.user_token};
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
	
	generatePMList(response){
	var listItems=response.data.map((PMEntry,index) =>
    (<Segment vertical key={index}  textAlign="center">
			
	   <div className="entry_row">
	 	<div className="PMList_column1">
			<Link to={"/"+PMEntry.gid.gid}>{PMEntry.gid.group_name}</Link>
	 	</div>
		<div className="PMList_column2">
	 		<Button onClick={this.onClickDeletePMEntry} content='Delete' className={""+PMEntry.pid} primary/>
	 	</div>
	 </div>	
			
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
		var config={"Authorization":"Token "+this.state.user_token};
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
		if(this.state.login==true)
		{
			return(			
				<div>	
				<div className= "submenu">
				<SubMenu onClickLogout={this.toLogout}></SubMenu>
		   	    </div>
				<Divider fitted/>   		
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
            <div className="MainComp">
                <h1>RoomUp</h1>
                <div className="child">
    		    <Switch>
                 <Route exact path="/" render={(props) => (<SearchComp login={this.state.login} user_token={this.state.user_token} onPMListChange={this.onPMListChange}{...props}/>)}></Route>
                 <Route exact path="/becomeAdvanced" component={SearchComp}></Route>
				 <Route exact path="/UserProfile" component={UserProfile}></Route>
				 <Route path="/:gid" component={GroupDetail}></Route>
                </Switch>
                </div>
            </div>
			</div>
			</div>
        	);
	     }
		else
			{
		    return(			
			<div>
			<div className= "div-right" >
			<Button.Group>	
				<Button  className = "ButtonGroup" basic onClick={this.loginOnClick}>Register</Button>
				<Button  className = "ButtonGroup" basic onClick={this.loginOnClick}>Login</Button>
			</Button.Group>	
		   	</div>	
			<Divider fitted/>   
			<div>
            <div className="MainComp">
                <h1>RoomUp</h1>
                <div className="child">
    		    <Switch>
                 
                 <Route exact path="/" render={(props) => (<SearchComp login={this.state.login} user_token={this.state.user_token} onPMListChange={this.onPMListChange}{...props}/>)}></Route>
                 <Route exact path="/becomeAdvanced" component={SearchComp}></Route>
				 <Route exact path="/UserProfile" component={UserProfile}></Route>
				 <Route path="/:gid" component={GroupDetail}></Route>
                </Switch>
                </div>
            </div>
			</div>
			</div>
        	);	
			}
	}
	
}
