import React from 'react';
import styles from './components.scss'
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import {Header, Container,Button, Select, Input,Dropdown, Checkbox, List,Segment,Grid, Divider,Sidebar} from 'semantic-ui-react';
import propTypes from 'prop-types';
import axios from 'axios';
import { browserHistory } from 'react-router';


/*
To do: 
Add API
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

const quietnessOptions = [
  { key: '0', text: 'Extremely Quiet', value:'0' },
  { key: '1', text: 'Very Quiet', value: '1' },
  { key: '2', text: 'I\'m OK with some noise.', value: '2' },
  { key: '3', text: 'I also make noise.', value: '3' },
  { key: '4', text: 'Noise? I don\'t care now.', value: '4' }
]

const genderOptions = [
  { key: 'm', text: 'All Male', value: '1' },
  { key: 'fm', text: 'All Female', value: '0' },
  { key: 'mfm', text: 'Mixed Gender Group', value: '2' }
]

const sanitaryOptions = [
  { key: '0', text: 'Fan of housekeeping', value:'0' },
  { key: '1', text: 'Extremely Clean', value: '1' },
  { key: '2', text: 'Clean', value: '2' },
  { key: '3', text: 'Somewhat Clean', value: '3' },
  { key: '4', text: 'Sanitary? I don\'t care now.', value: '4' }
]

const timetobedOptions = [
  { key: '0', text: 'Go to bed before 9pm.', value:'0' },
  { key: '1', text: 'Go to bed before 11pm.', value: '1' },
  { key: '2', text: 'Go to bed before 1am', value: '2' },
  { key: '3', text: 'Go to bed before 3pm', value: '3' },
  { key: '4', text: 'No need to sleep.', value: '4' }
]



export default class SearchComp extends React.Component{
    
    constructor(){
        super();   
        this.state={
            result_display:<div></div>,
            search_mode:"Apt",
            search_input:"",
            user_filter:{
                pet:0,
                gender:0,
                quietness:0,
                sanitary:0,
                pet:0
            }
        }
		this.createRequestURL=this.createRequestURL.bind(this);
		this.searchInputChange=this.searchInputChange.bind(this);
		this.generateEntries=this.generateEntries.bind(this);
		this.searchSubmit=this.searchSubmit.bind(this);
		this.onChangeMode=this.onChangeMode.bind(this);
	}
	
	//under test usage
	createRequestURL(inputAddr){
		var baseUrl="http://localhost:8080/testdata";
		var tempUrl=baseUrl+'&addr='+this.Addr;
		return tempUrl;
	}
	
	searchSubmit(e){
        if(this.state.search_input!=""){
            var resultView=this.generateEntries();
            this.setState({result_display:resultView});
        }
        else{
            this.setState({result_display:<div></div>});
        }
	}	
    
    generateEntries(){ 
    
	var listItems;
    if(this.state.search_mode=="User")
    {
    listItems= jsonResults.map((addrEntry,index) =>
    // Correct! Key should be specified inside the array.
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
                     <Dropdown placeholder='Gender' compact selection options={genderOptions}/>
                     <Dropdown placeholder='Quietness Degree' compact selection options={quietnessOptions}/>
                     <Dropdown placeholder='Sanitary Degree' compact selection options={sanitaryOptions}/>
                     <Dropdown placeholder='Time go to bed' compact selection options={timetobedOptions}/>
                     <Dropdown placeholder='Pet?' compact selection options={petOptions}/>
                </div>
            	<div className="result_display">
                 {this.state.result_display}
            	</div>
			</div>);
        }
    }
    
    componentWillMount(){
        console.log("start");
        //nothing
    }
}


