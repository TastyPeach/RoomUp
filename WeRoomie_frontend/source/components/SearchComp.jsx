import React from 'react';
import styles from './components.scss'
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import {Header,Container,Button, Select, Input,Dropdown, Checkbox ,Card ,Image, Message,List,Segment,Icon} from 'semantic-ui-react';
import propTypes from 'prop-types';
import axios from 'axios';


var jsonResults=[
    {"addr":"Apt#101, 1010 University Avenue","gID":16001,"memberName":["apple"]},
    {"addr":"Apt#102, 1010 University Avenue","gID":16002,"memberName":["banana","peach"]},
    {"addr":"Apt#103, 1010 University Avenue","gID":16003,"memberName":["blackberries"]}
  ];

const options = [
  { key: 'Apt', text: 'Apt', value: 'Apt' },
  { key: 'User', text: 'User', value: 'User' },]



export default class SearchComp extends React.Component{
    
    constructor(){
        super();   
        this.state={
            result_display:<div></div>
        }
        this.search_target="";
		this.createRequestURL=this.createRequestURL.bind(this);
		this.searchInputChange=this.searchInputChange.bind(this);
		this.generateEntries=this.generateEntries.bind(this);
		this.searchSubmit=this.searchSubmit.bind(this);
		this.onChangeMode=this.onChangeMode.bind(this);
	}
	onChangeMode(e)
	{
		console.log("Mode Change");
	}
	searchSubmit(e)
	{
		var resultView=this.generateEntries();
		this.setState({result_display:resultView});
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
        if(e.target.value!="")
        {
        var requestURL=this.createRequestURL(e.target.value);
        this.search_target=e.target.value;
		
        console.log("Input Change");
        
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
		
		console.log(jsonResults);
		var resultView=this.generateEntries();
		this.setState({result_display:resultView});
		
		}
        else
		{
           this.setState({result_display:<div></div>});
        }
    }
	

	
	render(){    
        return (
            <div className="searchComp">
            <h3>Find an Apartment</h3>
                <div className="search_panel">
                    <div className="searchInput">
                    <Input onChange={this.searchInputChange} size='small' type='text' placeholder='Search...' action>
					<input />
    				<Select compact options={options} defaultValue='Apt' onChange={this.onChangeMode}/>
    				<Button type='submit' onClick={this.searchSubmit}>Search</Button>
					</Input>
                    </div>
                </div>
            	<div className="result_display">
                 {this.state.result_display}
            	</div>
			</div>);
    }
    
    componentWillMount(){
        console.log("start");
        //nothing
    }
}

