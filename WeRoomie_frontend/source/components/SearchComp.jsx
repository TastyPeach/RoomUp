import React from 'react';
import styles from './components.scss'
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import {Header, Container,Button, Select, Input,Dropdown, Checkbox, List,Segment,Grid, Divider} from 'semantic-ui-react';
import propTypes from 'prop-types';
import axios from 'axios';


var jsonResults=[
    {"addr":"Apt#101, 1010 University Avenue","gID":16001,"memberName":["apple"]},
    {"addr":"Apt#102, 1010 University Avenue","gID":16002,"memberName":["banana","peach"]},
    {"addr":"Apt#103, 1010 University Avenue","gID":16003,"memberName":["blackberries"]}
  ];

const searchOptions = [
  { key: 'Apt', text: 'Apt', value: 'Apt' },
  { key: 'User', text: 'User', value: 'User' },]

const petOptions = [
  { key: 'a', text: 'They can have pets.', value: '1' },
  { key: 'na', text: 'I don\'t like pets', value: '0' }
]

const quietnessOptions = [
  { key: 'a', text: 'They can have pets.', value: '1' },
  { key: 'na', text: 'I don\'t like pets', value: '0' }
]

const genderOptions = [
  { key: 'a', text: 'They can have pets.', value: '1' },
  { key: 'na', text: 'I don\'t like pets', value: '0' }
]

const sanitaryOptions = [
  { key: 'a', text: 'They can have pets.', value: '1' },
  { key: 'na', text: 'I don\'t like pets', value: '0' }
]

const timetobedOptions = [
  { key: 'a', text: 'They can have pets.', value: '1' },
  { key: 'na', text: 'I don\'t like pets', value: '0' }
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
        this.search_target="";
		this.createRequestURL=this.createRequestURL.bind(this);
		this.searchInputChange=this.searchInputChange.bind(this);
		this.generateEntries=this.generateEntries.bind(this);
		this.searchSubmit=this.searchSubmit.bind(this);
		this.onChangeMode=this.onChangeMode.bind(this);
	}
	onChangeMode(e,d)
	{
		console.log("Mode Change to ");
        console.log(d)
        if(this.state.search_mode=="User"){
            //setstate
            this.setState({search_mode:d.value,result_display:<div></div>});
        }
        else{
            this.setState({search_mode:d.value,result_display:<div></div>});
        }
	}
	searchSubmit(e)
	{
        /*console.log(requestURL);
		let url = requestURL;
        axios.get(url)
         	.then((response) => {
        var results=response.data.array;
        for(var i=0;i<results.length;i++)
        {
           results.push(response.data.results[i]);
        }
		console.log(results);
        //this.setState({result_display:multi_entries});
        });*/
        if(this.state.search_input!=""){
            var resultView=this.generateEntries();
            this.setState({result_display:resultView});
        }
        else{
            this.setState({result_display:<div></div>});
        }
	}
	
	//under test usage
	createRequestURL(inputAddr)
	{
		var baseUrl="http://localhost:8080/testdata";
		var tempUrl=baseUrl+'&addr='+this.Addr;
		return tempUrl;
	}
	
    
    generateEntries()
    { 
    
	const listItems = jsonResults.map((addrEntry,index) =>
    // Correct! Key should be specified inside the array.
    (
	 <Segment vertical key={index}>
	 <div className="entry_row">
	 	<div className="entry_column">
	 		  <Button content='Likes' primary/>
     	</div>
	 	<div className="entry_column">
	 	<div>{addrEntry.addr}</div>
	 	</div>
		<div className="entry_column">
	 		<Button content='Details' primary/>
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
	
	
   
    searchInputChange(e){
        console.log(e.target.value);
        if(e.target.value!="")
        {
        var requestURL=this.createRequestURL(e.target.value);
        this.search_target=e.target.value;
        console.log("Input Change");
		var resultView=this.generateEntries();
		this.setState({search_input:e.target.value});
		}
        else
		{
           this.setState({result_display:<div></div>});
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
			</div>);
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


