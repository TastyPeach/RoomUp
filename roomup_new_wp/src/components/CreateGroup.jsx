import React from 'react';
import styles from './components.css'
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import { Icon, Container,Button, Select, Input,Dropdown, Checkbox ,Card ,Image, Message, Grid,Segment, Header, Table, Form} from 'semantic-ui-react';
import propTypes from 'prop-types';
import axios from 'axios';



export default class CreateGroup extends React.Component{
    constructor(props){
        super(props);
        this.state={
			user_filter:{
                name:'',
                price:0,
                address:'',
                floorplan:'',
                group_name:'aa',
                occupied: 0,
                capacity:2,
			},
			user_token:this.props.user_token,
		}

		this.onChangeName=this.onChangeName.bind(this);
		this.onChangePrice=this.onChangePrice.bind(this);
		this.onChangeAddress=this.onChangeAddress.bind(this);
		this.onChangeFloorplan=this.onChangeFloorplan.bind(this);
        this.onChangeGroupName=this.onChangeGroupName.bind(this);
        this.onChangeOccupied=this.onChangeOccupied.bind(this);
		this.onChangeCapacity=this.onChangeCapacity.bind(this);

        this.createRequestURLForCreateGroup=this.createRequestURLForCreateGroup.bind(this);
					
    }



    onChangeName(e,d)
	{
		var new_user_filter=this.state.user_filter;
		new_user_filter.name=d.value;
		this.setState({user_filter:new_user_filter});
	}
	onChangePrice(e,d)
	{
	    var new_user_filter=this.state.user_filter;
		new_user_filter.price=d.value;
		this.setState({user_filter:new_user_filter});
	}
	onChangeAddress(e,d)
	{
        var new_user_filter=this.state.user_filter;
		new_user_filter.address=d.value;
		this.setState({user_filter:new_user_filter});
	}
	onChangeFloorplan(e,d)
	{
	    var new_user_filter=this.state.user_filter;
		new_user_filter.floorplan=d.value;
		this.setState({user_filter:new_user_filter});
	}
	onChangeGroupName(e,d)
	{
	    var new_user_filter=this.state.user_filter;
		new_user_filter.group_name=d.value;
		this.setState({user_filter:new_user_filter});
    }
    onChangeOccupied(e,d)
	{
	    var new_user_filter=this.state.user_filter;
		new_user_filter.occupied=d.value;
		this.setState({user_filter:new_user_filter});
    }
    onChangeCapacity(e,d)
	{
	    var new_user_filter=this.state.user_filter;
		new_user_filter.capacity=d.value;
		this.setState({user_filter:new_user_filter});
    }   


    
    createRequestURLForCreateGroup(){
        var baseUrl="http://18.219.12.38:8001/create_group";

		var name = this.state.user_filter.name;
		var price = this.state.user_filter.price;
		var address = this.state.user_filter.address;
		var floorplan = this.state.user_filter.floorplan;
        var group_name = this.state.user_filter.group_name;
        var occupied = this.state.user_filter.occupied;
		var capacity = this.state.user_filter.capacity;

        var bodyFormData = new FormData();
		bodyFormData.set('name', name);
		bodyFormData.set('price', price);
		bodyFormData.set('address', address);
		bodyFormData.set('floorplan', floorplan);
		bodyFormData.set('group_name', group_name);
		bodyFormData.set('occupied', occupied);
		bodyFormData.set('capacity', capacity);
        axios({
    		method: 'post',
    		url: baseUrl,
    		data: bodyFormData,
    		config: { headers: {
				'Content-Type': 'multipart/form-data',
				}},
			headers:{'Authorization':"Token "+this.state.user_token}
			})
        .then((response)=>{
			//handle success
            console.log("success");
            console.log(response);
			alert("CreateGroup Success");
			
        })
        .catch(function (response) {
            //handle error
            console.log("failing");
			console.log(response);
			alert("CreateGroup Failed");
        });
		}
		
    searchSubmit(e){
        console.log("Submit Button Hit");
	}

	render() {
		return (
		<div className="searchComp">	
		<Button.Group>
				<Link to={""}> 
				<Button color="green">Back to Search</Button>
				</Link>
		</Button.Group>
		<h3>Create a Group and Bind Up!</h3>	

		<div className="result_display" >
		<Form>
			<Form.Group widths='equal'>
			<Form.Input fluid label='Group Name' onChange={this.onChangeGroupName} placeholder='Group Name' />
			<Form.Input fluid label='Capacity' onChange={this.onChangeCapacity} placeholder='Capacity' />
            <Form.Input fluid label='Address' onChange={this.onChangeAddress} placeholder='Address' />
			</Form.Group>

			<Form.Group widths='equal'>
			<Form.Input fluid label='Apartment Name' onChange={this.onChangeName} placeholder='Apartment Name' />
			<Form.Input fluid label='Floor Plan' onChange={this.onChangeFloorplan} placeholder='Floor Plan' />
			<Form.Input fluid label='Price' onChange={this.onChangePrice} placeholder='Price' />
			</Form.Group>

			<Form.Group widths='equal'>
			</Form.Group>
			<Form.Checkbox label='I agree to the Terms and Conditions' />
			<Link to={"/"}>
			<Form.Button type='submit' onClick={this.createRequestURLForCreateGroup}> 
			<Icon name='yellow hand pointer' />Submit </Form.Button>
			</Link>
		</Form>
		</div>
		</div>
	)
  }
}