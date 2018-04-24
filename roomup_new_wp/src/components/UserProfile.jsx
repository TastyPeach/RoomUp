import React from 'react';
import styles from './components.css'
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link,} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import { Button,Grid,Segment, Icon} from 'semantic-ui-react';
import axios from 'axios';

export default class UserProfile extends React.Component{
    
    
    constructor(props){
        super(props);
        this.state={
			UserDetailsView:<div></div>,
			user_token: this.props.user_token,
			gid:null
        }
		this.generateUserDetailsView=this.generateUserDetailsView.bind(this);
		this.leaveGroupButtonOnClick=this.leaveGroupButtonOnClick.bind(this);
		this.loadUserProfile=this.loadUserProfile.bind(this);
		this.loadUserProfile();
	    console.log(this.props);
		console.log(this.props.user_token);
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
		if(response.data.gid!==undefined)
		{
			gid_string=""+response.data.gid;
			if(response.data.gid!==null)
			{
			gid_segment=(<Grid columns={2} divided>
    			<Grid.Row stretched>
      			<Grid.Column>
				<Button className = "borderlessbutton" basic as={Link} to={'/'+response.data.gid}>GID:{gid_string}</Button>
				</Grid.Column>
				<Grid.Column>
				{/* <Button basic onClick={this.leaveGroupButtonOnClick}>Leave Group</Button>	 */}

                <Button className = "borderlessbutton" animated basic onClick={this.leaveGroupButtonOnClick}>
                <Button.Content visible>Leave Group</Button.Content>
		        <Button.Content hidden>
			    <Icon name='yellow frown' />
		        </Button.Content>
		        </Button>

				</Grid.Column>
					</Grid.Row>
				</Grid>);




			}
			else
				{
				gid_segment=(<Grid columns={2} divided>
    			<Grid.Row stretched>
      			<Grid.Column>
				<Button className = "borderlessbutton" basic as={Link} to='/'>GID:You don't belong to any group</Button>
				</Grid.Column>
				<Grid.Column>
				<Button className = "borderlessbutton" animated basic as={Link} to='/'>
                <Button.Content visible>Go and add one!</Button.Content>
		        <Button.Content hidden>
			    <Icon name='yellow hand peace' />
		        </Button.Content>
		        </Button>
				</Grid.Column>
					</Grid.Row>
				</Grid>);
				}
		this.setState({UserDetailsView:(
		<Grid columns={1} divided>
    	<Grid.Row stretched>
      	<Grid.Column>
        	<Segment><Icon name='blue id card outline ' />Nickname:{" "+response.data.uid.username}</Segment>
        	<Segment>First Name:{" "+response.data.uid.first_name}</Segment>
			<Segment>Last Name:{" "+response.data.uid.last_name}</Segment>
        	<Segment>
				{gid_segment}
			</Segment>
      	</Grid.Column>
    	</Grid.Row>
  		</Grid>)});
		}
		else
		{
			
			// gid_string="You are not an Advanced User";
			// gid_segment=(<Grid columns={2} divided>
    		// 	<Grid.Row stretched>
      		// 	<Grid.Column>
			// 		<Segment>GID:{gid_string}</Segment>
			// 	</Grid.Column>
			// 	<Grid.Column>
			// 	<Link to={"/becomeAdvanced"}> 
			// 	<Button basic>Go and Become an Advanced User</Button>	
			// 	</Link>
			// 	</Grid.Column>
			// 		</Grid.Row>
			// 	</Grid>);
			gid_segment=(<Grid columns={2} divided>
    			<Grid.Row stretched>
      			<Grid.Column>
				<Button className = "borderlessbutton" basic as={Link} to='/becomeAdvanced'>You are not an Advanced User</Button>
				</Grid.Column>
				<Grid.Column>
				<Button className = "borderlessbutton" animated basic as={Link} to='/becomeAdvanced'>
                <Button.Content visible>Become an Advanced User</Button.Content>
		        <Button.Content hidden>
			    <Icon name='yellow hand peace' />
		        </Button.Content>
		        </Button>
				</Grid.Column>
					</Grid.Row>
				</Grid>);


				this.setState({UserDetailsView:(
				<Grid columns={1} divided>
				<Grid.Row stretched>
				<Grid.Column>
					<Segment>Nickname:{" "+response.data.username}</Segment>
					<Segment>First Name:{" "+response.data.first_name}</Segment>
					<Segment>Last Name:{" "+response.data.last_name}</Segment>
					<Segment>
						{gid_segment}
					</Segment>
				</Grid.Column>
				</Grid.Row>
				</Grid>)});
		}
	}

    render(){
        
        return (
            <div className="searchComp">
            <h3>User Profile</h3>
            <Button.Group>
             <Link to={"/"}> 
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