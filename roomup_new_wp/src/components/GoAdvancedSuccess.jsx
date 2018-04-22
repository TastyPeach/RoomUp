import React from 'react';
import styles from './components.css'
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import { Button,Grid,Segment,Step,Icon} from 'semantic-ui-react';
import propTypes from 'prop-types';
import axios from 'axios';

export default class UserProfile extends React.Component{
    
    render(){
        
        return (
            <div className="searchComp">
            <h3>User Status</h3>
            <Button.Group>
             <Link to={""}> 
             <Button color="green">Back to Search</Button>
             </Link>
            </Button.Group>
            <div className='successicon'>
            <Step.Group>
            <Step completed>
            <Icon name='credit card' />
            <Step.Content>
                <Step.Title>Congrates;)</Step.Title>
                <Step.Description>You are Advanced User Now!</Step.Description>
            </Step.Content>
            </Step>
            </Step.Group>
            </div>

            </div>);
    }
    componentWillMount(){
        console.log("UserProfile Enter");
	}
}