import React from 'react';
import styles from './components.css'
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import { Container,Button, Select, Input,Dropdown, Checkbox ,Card ,Image, Message, Grid,Segment, Header, Table, Icon} from 'semantic-ui-react';
import propTypes from 'prop-types';
import axios from 'axios';

export default class GroupDetail extends React.Component{
    
    
    constructor(props){
        super(props);
        this.state={
            GroupViewDetails:<div></div>,
            modalOpen: false,
            gid: this.props.gid,
            user_token: this.props.user_token
        }
        this.generateGroupDetailsView=this.generateGroupDetailsView.bind(this);
        this.loadGroupProfile();
    }

    loadGroupProfile()
    {
		if(this.state.user_token!=='')
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
    }



        generateGroupDetailsView(response)
        {
        var ad_gender = response.data.group[0].admin_uid.gender;
        var ad_quietness = response.data.group[0].admin_uid.quietness;
        var ad_sanitary = response.data.group[0].admin_uid.sanitary;
        var ad_pet = response.data.group[0].admin_uid.pet;


        var gender = ['Male', 'Female'];
        var quietness = ['Extremely Quiet', 'Very Quiet', 'Medium Quiet', 'Noisy','Very Noisy']
        var sanitary = ['Extremely Clean', 'Very Clean', 'Medium Clean', 'Sloppy', 'Very Sloppy']
        var pet = [ 'Love Pet','Naw, No Pet']
        //console.log(gender[gender_id]);

        console.log()

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
            <Link to = {"/chat/"+response.data.group[0].gid}><Table.Cell>{" "+response.data.group[0].gid}<Icon name='talk outline'/></Table.Cell></Link>
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
            <Table.Cell>{" "+gender[ad_gender]}</Table.Cell>   
            {response.data.users.map((user,i) => <Table.Cell>{gender[user.gender]}</Table.Cell>)}
            {/* <Table.Cell>{" "+response.data.users[1].uid.username}</Table.Cell>  */}
        </Table.Row>
        </Table.Body>


                <Table.Body> 
        <Table.Row textAlign='center'>
            <Table.Cell>{" "+quietness[ad_quietness]}</Table.Cell>   
            {response.data.users.map((user,i) => <Table.Cell>{quietness[user.quietness]}</Table.Cell>)}
            {/* <Table.Cell>{" "+response.data.users[1].uid.username}</Table.Cell>  */}
        </Table.Row>
        </Table.Body>

        <Table.Body> 
        <Table.Row textAlign='center'>
            <Table.Cell>{" "+sanitary[ad_sanitary]}</Table.Cell>   
            {response.data.users.map((user,i) => <Table.Cell>{sanitary[user.sanitary]}</Table.Cell>)}
            {/* <Table.Cell>{" "+response.data.users[1].uid.username}</Table.Cell>  */}
        </Table.Row>
        </Table.Body>

        <Table.Body> 
        <Table.Row textAlign='center'>
            <Table.Cell>{" "+response.data.group[0].admin_uid.major}</Table.Cell>   
            {response.data.users.map((user,i) => <Table.Cell>{user.major}</Table.Cell>)}
            {/* <Table.Cell>{" "+response.data.users[1].uid.username}</Table.Cell>  */}
        </Table.Row>
        </Table.Body>


        <Table.Body> 
        <Table.Row textAlign='center'>
            <Table.Cell>{" "+pet[ad_pet]}</Table.Cell>   
            {response.data.users.map((user,i) => <Table.Cell>{pet[user.pet]}</Table.Cell>)}
            {/* <Table.Cell>{" "+response.data.users[1].uid.username}</Table.Cell>  */}
        </Table.Row>
        </Table.Body>

        <Table.Body> 
        <Table.Row textAlign='center'>
            <Table.Cell>{" "+response.data.group[0].admin_uid.ethinicity}</Table.Cell>   
            {response.data.users.map((user,i) => <Table.Cell>{user.ethinicity}</Table.Cell>)}
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
			{this.props.user_token==''&& <h3>You don't have access, please log in.</h3>}
             <div className="result_display" >
                 {this.state.GroupViewDetails}
             </div>
				
            </div>);
    }

    
    componentWillMount(){
        console.log("GroupDetail Enter");
    }
}