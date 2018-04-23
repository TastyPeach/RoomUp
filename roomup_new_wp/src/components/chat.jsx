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
  
			gid: this.props.gid
        }
		console.log(this.props.gid);

    }

    
    render(){
        return (
            <div className="searchComp">
            <h3>Chat</h3>
            <Button.Group>
             <Link to={""}> 
             <Button color="green">Back to Search</Button>
             </Link>
             </Button.Group>

            </div>);
    }

    
    componentWillMount(){
        console.log("GroupDetail Enter");
	}
}