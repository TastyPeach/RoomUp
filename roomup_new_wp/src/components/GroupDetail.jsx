import React from 'react';
import styles from './components.css'
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import { Container,Button, Select, Input,Dropdown, Checkbox ,Card ,Image, Message, Grid,Segment, Header, Table} from 'semantic-ui-react';
import propTypes from 'prop-types';
import axios from 'axios';

export default class GroupDetail extends React.Component{
    
    
    constructor(props){
        super(props);
        this.state={
            GroupViewDetails:<div></div>,
            user_token:this.props.user_token,
            modalOpen: false,
			gid: this.props.gid
        }
		console.log(this.props.gid);
        this.generateGroupDetailsView=this.generateGroupDetailsView.bind(this);
        this.loadGroupProfile();
    }

    loadGroupProfile()
	{
		var urlAddr='http://18.219.12.38:8001/get_group_info?gid='+this.state.gid;
        var config={"Authorization":"Token "+this.state.user_token};
		axios({
            url: urlAddr,
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

        var ad_gender = response.data.group[0].admin_uid.gender;
        var ad_quietness = response.data.group[0].admin_uid.quietness;
        var ad_sanitary = response.data.group[0].admin_uid.sanitary;
        var gender = ['Male', 'Female'];
        var quietness = ['Extremely Quiet', 'Very Quiet', 'Medium Quiet', 'Noisy', 'Very Noisy']
        var sanitary = ['Extremely Clean', 'Very Clean', 'Medium Clean', 'Sloppy', 'Very Sloppy']


		this.setState({GroupViewDetails:(
        <Table celled padded>
        <Table.Header>
        <Table.Row textAlign='center'>
            <Table.HeaderCell singleLine>Group ID</Table.HeaderCell>
            <Table.HeaderCell>Group Name</Table.HeaderCell>
            <Table.HeaderCell>Capaticy</Table.HeaderCell>
            <Table.HeaderCell>Space Left</Table.HeaderCell>
        </Table.Row>
        </Table.Header>

        <Table.Body>
        <Table.Row textAlign='center'>
            <Table.Cell>{" "+response.data.group[0].gid}</Table.Cell>
            <Table.Cell>{" "+response.data.group[0].group_name}</Table.Cell>
            <Table.Cell>{" "+response.data.group[0].capacity}</Table.Cell>
            <Table.Cell>{" "+response.data.group[0].peopleleft}</Table.Cell>
        </Table.Row>
        </Table.Body>

        <Table.Header>
        <Table.Row textAlign='center'>
            <Table.HeaderCell>Apartment Name</Table.HeaderCell>
            <Table.HeaderCell>Monthly Rent</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Floor Plan</Table.HeaderCell>
        </Table.Row>
        </Table.Header>

        <Table.Body>
        <Table.Row textAlign='center'>
            <Table.Cell>{" "+response.data.group[0].aid.name}</Table.Cell>
            <Table.Cell>{" "+response.data.group[0].aid.price}</Table.Cell>
            <Table.Cell>{" "+response.data.group[0].aid.address}</Table.Cell>
            <Table.Cell>{" "+response.data.group[0].aid.floorplan}</Table.Cell>

        </Table.Row>
        </Table.Body>

        <Table.Header>
        <Table.Row textAlign='center'>
            <Table.HeaderCell>Administor Name</Table.HeaderCell>
            <Table.HeaderCell>Group Member</Table.HeaderCell>
            <Table.HeaderCell>Group Member</Table.HeaderCell>
            <Table.HeaderCell>Group Member</Table.HeaderCell>
        </Table.Row>
        </Table.Header>

        <Table.Body> 
        <Table.Row textAlign='center'>
            <Table.Cell>{" "+response.data.group[0].admin_uid.uid.username}</Table.Cell>   
            {response.data.users.map((user,i) => <Table.Cell>{user.uid.username}</Table.Cell>)}
            {/* <Table.Cell>{" "+response.data.users[1].uid.username}</Table.Cell>  */}
        </Table.Row>
        </Table.Body>
        <Table.Body> 
        <Table.Row textAlign='center'>
            <Table.Cell>Gender: {" "+gender[ad_gender]}</Table.Cell>   
            {response.data.users.map((user,i) => <Table.Cell>Gender:{gender[user.gender]}</Table.Cell>)}
            {/* <Table.Cell>{" "+response.data.users[1].uid.username}</Table.Cell>  */}
        </Table.Row>
        </Table.Body>

        <Table.Body> 
        <Table.Row textAlign='center'>
            <Table.Cell>Quietness: {" "+quietness[ad_quietness]}</Table.Cell>   
            {response.data.users.map((user,i) => <Table.Cell>Quietness:{quietness[user.quietness]}</Table.Cell>)}
            {/* <Table.Cell>{" "+response.data.users[1].uid.username}</Table.Cell>  */}
        </Table.Row>
        </Table.Body>

        <Table.Body> 
        <Table.Row textAlign='center'>
            <Table.Cell>Sanitation: {" "+sanitary[ad_sanitary]}</Table.Cell>   
            {response.data.users.map((user,i) => <Table.Cell>Sanitation: {sanitary[user.sanitary]}</Table.Cell>)}
            {/* <Table.Cell>{" "+response.data.users[1].uid.username}</Table.Cell>  */}
        </Table.Row>
        </Table.Body>

        <Table.Body> 
        <Table.Row textAlign='center'>
            <Table.Cell>Major: {" "+response.data.group[0].admin_uid.major}</Table.Cell>   
            {response.data.users.map((user,i) => <Table.Cell>Major: {user.major}</Table.Cell>)}
            {/* <Table.Cell>{" "+response.data.users[1].uid.username}</Table.Cell>  */}
        </Table.Row>
        </Table.Body>

        </Table>  
 
		)});
	}

    render(){
        return (
            <div className="searchComp">
            <h3>Group Details</h3>
            <Button.Group>
             <Link to={""}> 
             <Button color="green">Back to Search</Button>
             </Link>
             </Button.Group>
             <div className="result_display" >
				 {this.state.GroupViewDetails}
             </div>
            </div>);
    }

    
    componentWillMount(){
        console.log("GroupDetail Enter");
	}
}