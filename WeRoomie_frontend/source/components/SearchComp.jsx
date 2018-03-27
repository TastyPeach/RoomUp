import React from 'react';
import styles from './components.scss'
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import {Header, Container,Button, Select, Input,Dropdown, Checkbox, List, Segment, Grid, Divider,Sidebar,Card, Modal} from 'semantic-ui-react';
import propTypes from 'prop-types';
import axios from 'axios';
import { browserHistory } from 'react-router';


/*
To do: 
Delete/Like button
Pass Down of User information
*/

//test_only
var jsonResults=[
    {"addr":"Apt#101, 1010 University Avenue","gID":16001,"memberName":["apple"]},
    {"addr":"Apt#102, 1010 University Avenue","gID":16002,"memberName":["banana","peach"]},
    {"addr":"Apt#103, 1010 University Avenue","gID":16003,"memberName":["blackberries"]}
  ];

const searchOptions = [
  { key: 'Apt', text: 'Apt', value: 'Apt' },
  { key: 'User', text: 'User', value: 'User' },
]

const petOptions = [
  { key: 'a', text: 'They can have pets.', value: '1' },
  { key: 'na', text: 'I don\'t like pets', value: '0' }
]

const genderOptions = [
  { key: 'm', text: 'All Male', value: '1' },
  { key: 'fm', text: 'All Female', value: '0' },
  { key: 'mfm', text: 'Mixed Gender Group', value: '2' }
]


const quietnessOptions = [
  { key: '4', text: 'Extremely Quiet', value:'4' },
  { key: '3', text: 'Very Quiet', value: '3' },
  { key: '2', text: 'I\'m OK with some noise.', value: '2' },
  { key: '1', text: 'I also make noise.', value: '1' },
  { key: '0', text: 'Noise? I don\'t care now.', value: '0' }
]

const sanitaryOptions = [
  { key: '4', text: 'Fan of housekeeping', value:'4' },
  { key: '3', text: 'Extremely Clean', value: '3' },
  { key: '2', text: 'Clean', value: '2' },
  { key: '1', text: 'Somewhat Clean', value: '1' },
  { key: '0', text: 'Sanitary? I don\'t care now.', value: '0' }
]

const timetobedOptions = [
  { key: '0', text: 'Go to bed before 9pm.', value:'0' },
  { key: '1', text: 'Go to bed before 11pm.', value: '1' },
  { key: '2', text: 'Go to bed before 1am', value: '2' },
  { key: '3', text: 'Go to bed before 3pm', value: '3' },
  { key: '4', text: 'No need to sleep.', value: '4' }
]

export default class SearchComp extends React.Component{
    
    constructor(props){
        super(props);   
        this.state={
            result_display:<div></div>,
            search_mode:"Apt",
            search_input:"",
            user_filter:{
                pet:0,
                gender:0,
                quietness:4,
                sanitary:1,
                timetobed:2
            },
			login:this.props.login,
			user_token:this.props.user_token,
			modalShow:false
        }
		this.createRequestURLForFilterGroup=this.createRequestURLForFilterGroup.bind(this);
		this.searchInputChange=this.searchInputChange.bind(this);
		this.generateEntriesForTest=this.generateEntriesForTest.bind(this);
		this.generateEntriesForFilterGroup=this.generateEntriesForFilterGroup.bind(this);
		this.searchSubmit=this.searchSubmit.bind(this);
		this.onChangeMode=this.onChangeMode.bind(this);
		this.saveButtonOnClick=this.saveButtonOnClick.bind(this);
		
		this.onChangeGender=this.onChangeGender.bind(this);
		this.onChangePet=this.onChangePet.bind(this);
		this.onChangeQuietness=this.onChangeQuietness.bind(this);
		this.onChangeSanitary=this.onChangeSanitary.bind(this);
		this.onChangeTimetobed=this.onChangeTimetobed.bind(this);
		
		this.closeModal=this.closeModal.bind(this);
		this.onPMListChange=this.props.onPMListChange;
		console.log(this.props);
		
	}
	
	closeModal()
	{
		this.setState({modalShow:false});
	}
	
	onChangeGender(e,d)
	{
		var new_user_filter=this.state.user_filter;
		new_user_filter.gender=d.value;
		this.setState({user_filter:new_user_filter});
	}
	onChangePet(e,d)
	{
	    var new_user_filter=this.state.user_filter;
		new_user_filter.pet=d.value;
		this.setState({user_filter:new_user_filter});
	}
	onChangeQuietness(e,d)
	{
        var new_user_filter=this.state.user_filter;
		new_user_filter.quietness=d.value;
		this.setState({user_filter:new_user_filter});
	}
	onChangeSanitary(e,d)
	{
	    var new_user_filter=this.state.user_filter;
		new_user_filter.sanitary=d.value;
		this.setState({user_filter:new_user_filter});
	}
	onChangeTimetobed(e,d)
	{
	    var new_user_filter=this.state.user_filter;
		new_user_filter.timetobed=d.value;
		this.setState({user_filter:new_user_filter});
	}
	
	//under test usage
	createRequestURLForFilterGroup(){
		//http://18.219.12.38:8000/filter_group?gender=1&quietness=5&sanitary=5&timetobed=5&pet=1
		var baseUrl="http://18.219.12.38:8001/filter_group?";
		
		var tempUrl=baseUrl+'&gender='+this.state.user_filter.gender;
		tempUrl=tempUrl+'&quietness='+this.state.user_filter.quietness;
		tempUrl=tempUrl+'&sanitary='+this.state.user_filter.sanitary;
		tempUrl=tempUrl+'&timetobed='+this.state.user_filter.timetobed;
		tempUrl=tempUrl+'&pet='+this.state.user_filter.pet;
		
		console.log(tempUrl);
		
		/*test group*/
		/*tempUrl=baseUrl+'&gender='+0;
		tempUrl=tempUrl+'&quietness='+4;
		tempUrl=tempUrl+'&sanitary='+1;
		tempUrl=tempUrl+'&timetobed='+2;
		tempUrl=tempUrl+'&pet='+0;
		console.log(tempUrl)*/
		
		return tempUrl;
	}
	
	searchSubmit(e){
        if(this.state.search_mode=="User"){
		
		if(this.state.login==true)
		{
		var config={"Authorization":"Token "+this.state.user_token};
		var tempURL=this.createRequestURLForFilterGroup();
	    axios({
    		url: tempURL,
    		method: 'get',
			headers: config
 			})
 		.then(response => {
			var resultView=this.generateEntriesForFilterGroup(response);
            this.setState({result_display:resultView});
 		}) 
 		.catch(err => {
			//Error
    		console.log(err.response.status);
 		});
		}
		else
			{
				this.setState({modalShow:true});
			}
        }
        else{
			//Mode is Apt
			if(this.state.search_input=="")
			  this.setState({result_display:<div></div>});
			else
			{
			  var resultView=this.generateEntriesForTest();
              this.setState({result_display:resultView});
			}
        }
	}
	
	saveButtonOnClick(e,d)
	{
		//var func=this.props.onPMListChange;
		var gid=parseInt(d.className);
		console.log(gid);
		var bodyFormData = new FormData();
		bodyFormData.set('gid', d.className);
		axios({
    		method: 'post',
    		url: 'http://18.219.12.38:8001/add_potential_match',
    		data: bodyFormData,
    		config: { headers: {
				'Content-Type': 'multipart/form-data',
				}},
			headers:{'Authorization':"Token "+this.state.user_token}
			})
    .then((response)=>{
        //handle success
		console.log("add potential match success");
		this.props.onPMListChange();
    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });
    }
	
	generateEntriesForFilterGroup(response){
		console.log(response);
		var gArray=response.data.group;
	var listItems=gArray.map((gEntry,index) =>
    // Correct! Key should be specified inside the array.
    (
	 <Segment vertical key={index}>
	 <div className="entry_row">
	 	<div className="user_column1">
	 		  <Button content='Details' primary/>
     	</div>
	 	<div className="user_column2">
		    <div>Group Name: {gEntry.group_name}</div>
			<div>Apt: {gEntry.aid.name}</div>
	 	</div>
		<div className="user_column3">
	 		<Button className={""+gEntry.gid} onClick={this.saveButtonOnClick} content='Save' primary/>
            <Button content='Add to Group' primary/>
	 	</div>
	 </div>
	</Segment>
	)
  	);
  	return (
    	<Segment.Group>
      	{listItems}
    	</Segment.Group>
  	);
    }
    
    generateEntriesForTest(){ 
    
	var listItems;
    if(this.state.search_mode=="User")
    {
    listItems= jsonResults.map((addrEntry,index) =>
    (
	 <Segment vertical key={index}>
	 <div className="entry_row">
	 	<div className="user_column1">
	 		  <Button content='Details' primary/>
     	</div>
	 	<div className="user_column2">
	 	<div>{addrEntry.addr}</div>
	 	</div>
		<div className="user_column3">
	 		<Button content='Save' primary/>
            <Button content='Add to Group' primary/>
	 	</div>
	 </div>
	</Segment>
	)
  	);
  	return (
    	<Segment.Group>
      	{listItems}
    	</Segment.Group>
  	);
    }
    else{
    listItems= jsonResults.map((addrEntry,index) =>
    // Correct! Key should be specified inside the array.
    (
	 <Segment vertical key={index}>
    
    <div className="entry_row">
	 	<div className="apt_column1">
	 		  <Button content='Details' primary/>
     	</div>
	 	<div className="apt_column2">
	 	<div>{addrEntry.addr}</div>
	 	</div>
	 </div>
            
	</Segment>
	)
  	);
  	return (
    	<Segment.Group>
      	{listItems}
    	</Segment.Group>
  	);
    }
		
    }
   
    searchInputChange(e){
        if(e.target.value!="")
        {
			this.setState({search_input:e.target.value});
		}
        else
		{
           this.setState({search_input:e.target.value,result_display:<div></div>});
        }
    }
	
	onChangeMode(e,d){
        if(this.state.search_mode=="User"){
            //setstate
            this.setState({search_mode:d.value,result_display:<div></div>});
        }
        else{
            this.setState({search_mode:d.value,result_display:<div></div>});
        }
	}
	
	render(){ 
        if(this.state.search_mode=="Apt")
        {
        return (
           <div className="searchComp">
                <h3>Find an Apartment</h3>
                <div className="search_panel">
                    <div className="searchInput">
                    <Input onChange={this.searchInputChange} size='small' type='text' placeholder='Search Apartments' action>
					<input />
    				<Select compact options={searchOptions} defaultValue='Apt' onChange={this.onChangeMode}/>
					<Button type='submit' onClick={this.searchSubmit}>Search</Button>
					</Input>
                    </div>
                </div>
            	<div className="result_display">
                 {this.state.result_display}
            	</div>
			</div>
        
            );
        }
        else{
        return (
            <div className="searchComp">
		  <Modal open={this.state.modalShow} onClose={this.closeModal}>
          <Modal.Header>
            Not Logged in.
          </Modal.Header>
          <Modal.Content>
            <p>Search by User group is an advanced function. You have to log in to proceed.</p>
          </Modal.Content>
          <Modal.Actions>
             <Button positive content='Sure I will do.' onClick={this.closeModal}/>
          </Modal.Actions>
        </Modal>
            <h3>Find Your Dear Roomates</h3>
                <div className="search_panel">
                    <div className="searchInput">
                    <Input onChange={this.searchInputChange} size='small' type='text' placeholder='Search Roomates' action>
					<input />
    				<Select compact options={searchOptions} defaultValue='User' onChange={this.onChangeMode}/>
    				<Button type='submit' onClick={this.searchSubmit}>Search</Button>
					</Input>
                    </div>
                </div>
                <div className="filter_field">
                     <Dropdown placeholder='Gender' onChange={this.onChangeGender} compact selection options={genderOptions}  defaultValue={"0"}/>
                     <Dropdown placeholder='Quietness Degree' onChange={this.onChangeQuietness} compact selection options={quietnessOptions} defaultValue={"4"}/>
                     <Dropdown placeholder='Sanitary Degree' onChange={this.onChangeSanitary} compact selection options={sanitaryOptions} defaultValue={"1"}/>
                     <Dropdown placeholder='Time go to bed' onChange={this.onChangeTimetobed} compact selection options={timetobedOptions} defaultValue={"2"}/>
                     <Dropdown placeholder='Pet?' onChange={this.onChangePet} compact selection options={petOptions} defaultValue={"0"}/>
                </div>
            	<div className="result_display">
                 {this.state.result_display}
            	</div>
			</div>);
        }
    }
    
    componentWillMount(){
        console.log("Search Component Mount");
    }
}


