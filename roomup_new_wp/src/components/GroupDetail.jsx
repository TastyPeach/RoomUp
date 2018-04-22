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
            user_token:'1d441aca1002c863b724c4170ec7d7f793683ad0',
            modalOpen: false
        }

        this.generateGroupDetailsView=this.generateGroupDetailsView.bind(this);
        this.loadGroupProfile();
    }

    loadGroupProfile()
	{
        var config={"Authorization":"Token "+this.state.user_token};
		axios({
            url: 'http://18.219.12.38:8001/get_group_info?gid=3' ,
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
            <Table.Cell >{" "+response.data.group[0].admin_uid.gender}</Table.Cell>   
            {response.data.users.map((user,i) => <Table.Cell>{user.uid.username}</Table.Cell>)}
            {/* <Table.Cell>{" "+response.data.users[1].uid.username}</Table.Cell>  */}
        </Table.Row>
        </Table.Body>
        </Table>    

                )});
	}

    render(){
        console.log(this.props.params)
        return (
            <div className="searchComp">
            <h3>Group Details</h3>
            <Button.Group>
             <Link to={"/search"}> 
             <Button color="green">Back to Search</Button>
             </Link>
             </Button.Group>
             <div className="result_display" >
				 {this.state.GroupViewDetails}
             </div>
            </div>);
    }

    
    componentWillMount(){
        console.log("UserProfile Enter");
	}
}