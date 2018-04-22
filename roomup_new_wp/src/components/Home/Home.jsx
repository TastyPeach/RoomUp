import React, { Component } from 'react'
import { Button, Menu, Dropdown, Card, Segment, Divider, Sidebar, Image, Icon, Header, Modal, Input,Form} from 'semantic-ui-react'
import propTypes from 'prop-types'
import styles from './Home.css'
import SubMenu from '../SubMenu.jsx'
import axios from 'axios'
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'

import SearchComp from '../SearchComp.jsx';
import GroupDetail from '../GroupDetail.jsx';
import UserProfile from '../UserProfile.jsx';
import AdvancedUserReg from '../AdvancedUserReg.jsx';
import GoAdvancedSuccess from '../GoAdvancedSuccess.jsx';
import CreateGroup from '../CreateGroup.jsx'



const inlineStyle={
	modal:{
		marginTop: '0px !important',
		marginLeft: 'auto',
		marginRight: 'auto'
	}
};


  export default class Home extends Component {
	constructor(){
		super();
	    this.state={
		login:false,
		user_token:'1d441aca1002c863b724c4170ec7d7f793683ad0',
		PMdisplay:<div></div>,
		sidebarVisible: false,
		regModalShow: false,
		fname:'',
		lname:'',
		email:'',
		username:'',
		password:'',
		loginModalShow: false};
		this.toggleSidebar=this.toggleSidebar.bind(this);
		this.loginOnClick=this.loginOnClick.bind(this);
		this.onReceivePM=this.onReceivePM.bind(this);
		this.onPMListChange=this.onPMListChange.bind(this);
		this.onClickDeletePMEntry=this.onClickDeletePMEntry.bind(this);
		this.toLogout=this.toLogout.bind(this);
		this.openRegModal=this.openRegModal.bind(this);
		this.closeRegModal=this.closeRegModal.bind(this);
		this.handleRegInputChange=this.handleRegInputChange.bind(this);
		this.onSubmitRegistration=this.onSubmitRegistration.bind(this);
		this.doLogin=this.doLogin.bind(this);
		this.openLoginModal=this.openLoginModal.bind(this);
		this.closeLoginModal=this.closeLoginModal.bind(this);
		this.handleLoginInputChange=this.handleLoginInputChange.bind(this);
		this.loginSubmit=this.loginSubmit.bind(this);
	}
	
	handleRegInputChange(e, { name, value })
	{this.setState({ [name]: value });}
	
	handleLoginInputChange(e, { name, value })
	{this.setState({ [name]: value });}
	  
	loginSubmit()
	{
		this.closeLoginModal();
		this.doLogin();
	}
	  
	
	openLoginModal()
	{
		this.setState({ loginModalShow: !this.state.loginModalShow });
	}
	
	closeLoginModal()
	{
		this.setState({ loginModalShow: !this.state.loginModalShow });
	}
	  
	  
	doLogin()
	{
	    var bodyFormData = new FormData();
		bodyFormData.set('username', this.state.username);
		bodyFormData.set('password', this.state.password);
		axios({
    		method: 'POST',
    		url: 'http://18.219.12.38:8001/login',
    		data: bodyFormData,
    		config: { headers: {
				'Content-Type': 'multipart/form-data',
				}},
			})
    .then((response)=>{
        //handle success
		this.setState({ login: !this.state.login });
		this.setState({ user_token: response.data.token });
		console.log("Login Success");
		console.log(this.state.user_token);
    })
    .catch(function (response) {
        //handle error
		console.log("Login Failed")
    });
		
	}
	
	onSubmitRegistration()
	{
	    var bodyFormData = new FormData();
		bodyFormData.set('username', this.state.username);
		bodyFormData.set('password', this.state.password);
		bodyFormData.set('first_name', this.state.fname);
		bodyFormData.set('last_name', this.state.lname);
		bodyFormData.set('email', this.state.email);
		axios({
    		method: 'POST',
    		url: 'http://18.219.12.38:8001/register',
    		data: bodyFormData,
    		config: { headers: {
				'Content-Type': 'multipart/form-data',
				}},
			})
		.then((response)=>{
			//handle success
			console.log("Registration Success");
			this.doLogin();
		})
		.catch(function (response) {
			//handle error
			console.log("Registration Failed")
			console.log(response);
		});
	}
	
	openRegModal()
	{
		this.setState({ regModalShow: !this.state.regModalShow });
	}
	
	closeRegModal()
	{
		this.setState({ regModalShow: !this.state.regModalShow });
	}
	
	toggleSidebar()
	{
		this.setState({ sidebarVisible: !this.state.sidebarVisible });
		console.log(this.state.sidebarVisible);
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
	 		<Button onClick={this.onClickDeletePMEntry} content='x' className={""+PMEntry.pid} primary/>
	 	</div>
	 </div>	
			
	 </Segment>)
  	);
  	return (
    	<Segment.Group horizontal>
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
					
			const { visible } = {visible: this.state.sidebarVisible};
			return(			
				<div>	
				<div className= "submenu">
				<SubMenu onClickLogout={this.toLogout} onClickShowSidebar={this.toggleSidebar}></SubMenu>
		   	    </div>
				<Divider fitted/>   		
			    <div>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='overlay' direction='top' visible={visible}>
				{this.state.PMdisplay}
          </Sidebar>
          <Sidebar.Pusher>
			  <div className="placeHolder"/>
          </Sidebar.Pusher>
        </Sidebar.Pushable>					
					
            <div className="MainComp">
                <h1>RoomUp</h1>
                <div className="child">
    		    <Switch>
                 <Route exact path="/" render={(props) => (<SearchComp login={this.state.login} user_token={this.state.user_token} onPMListChange={this.onPMListChange}{...props}/>)}></Route>
                 <Route exact path="/becomeAdvanced" render={(props) => (<AdvancedUserReg user_token={this.state.user_token} {...props}/>)}></Route>
				 <Route exact path="/UserProfile" render={(props) => (<UserProfile user_token={this.state.user_token} {...props}/>)}></Route>
				 <Route exact path="/CreateGroup" render={(props) => (<CreateGroup user_token={this.state.user_token} {...props}/>)}></Route>
				 <Route path="/:gid" render={(props) => <GroupDetail user_token={this.state.user_token} gid={props.match.params.gid} {...props} /> } />
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
					
		  <Modal style={inlineStyle.modal} open={this.state.regModalShow} onClose={this.closeRegModal} size={"large"}>
          <Modal.Header>
            Please Register
          </Modal.Header>
          <Modal.Content>
      <Form>
        <Form.Group widths='equal'>
          <Form.Field control={Input} label='First name' placeholder='First name' name='fname'  onChange={this.handleRegInputChange}/>
          <Form.Field control={Input} label='Last name' placeholder='Last name' name='lname'  onChange={this.handleRegInputChange}/>
        </Form.Group>
		 <Form.Group widths='equal'>
         <Form.Field control={Input} label='Username' placeholder='Username' name='username'  onChange={this.handleRegInputChange}/>
		 <Form.Field control={Input} label='Password' placeholder='Password' name='password'  onChange={this.handleRegInputChange}/>
	    </Form.Group>
		<Form.Field control={Input} label='Email' placeholder='Email' name='email' onChange={this.handleRegInputChange}/>
      </Form>
          </Modal.Content>
          <Modal.Actions>
			 <Button content='Cancel.' onClick={this.closeRegModal}/>
             <Button positive content='Submit' onClick={this.onSubmitRegistration}/>
          </Modal.Actions>
        </Modal>
					
					
		<Modal style={inlineStyle.modal} open={this.state.loginModalShow} onClose={this.closeLoginModal} size={"large"}>
          <Modal.Header>
            Not Logged in.
          </Modal.Header>
          <Modal.Content>
      <Form>
		 <Form.Group widths='equal'>
         <Form.Field control={Input} label='Username' placeholder='Username' name='username'  onChange={this.handleLoginInputChange}/>
		 <Form.Field control={Input} label='Password' placeholder='Password' name='password'  onChange={this.handleLoginInputChange}/>
	    </Form.Group>
      </Form>
          </Modal.Content>
          <Modal.Actions>
			 <Button content='Cancel.' onClick={this.closeLoginModal}/>
             <Button positive content='Login' onClick={this.loginSubmit}/>
          </Modal.Actions>
        </Modal>
					
			
			<div className= "div-right" >
			<Button.Group>	
				<Button  className = "ButtonGroup" basic onClick={this.openRegModal}>Register</Button>
				<Button  className = "ButtonGroup" basic onClick={this.openLoginModal}>Login</Button>
			</Button.Group>	
		   	</div>	
			<Divider fitted/>   
			<div>	
            <div className="MainComp">
                <h1>RoomUp</h1>
                <div className="child">
    		    <Switch>
                 <Route exact path="/" render={(props) => (<SearchComp login={this.state.login} user_token={this.state.user_token} onPMListChange={this.onPMListChange}{...props}/>)}></Route>
				 <Route path="/:gid" render={(props) => <GroupDetail gid={props.match.params.gid} {...props} /> } />
                </Switch>
                </div>
            </div>
			</div>
			</div>
        	);	
			}
	}
	
}


