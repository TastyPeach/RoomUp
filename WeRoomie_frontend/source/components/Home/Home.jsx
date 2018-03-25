import React, { Component } from 'react'
import { Button, Menu, Dropdown} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'
import styles from './Home.scss'
import SubMenu from '../SubMenu.jsx'

export default class Home extends Component {
	constructor()
	{
		super();
	    this.state={login:false};
		this.loginOnClick=this.loginOnClick.bind(this);
	}
	loginOnClick()
	{
		this.setState({login:!this.state.login});
	}
    render() {
		if(this.state.login==false){
			return(
			<div>
			<div className="userMenu" >
				<Button onClick={this.loginOnClick}>Login</Button>
		   	</div>
            <div className="Home">
                <h1>WeRoomie</h1>
                <div className="child">
                {this.props.children}
            </div>
            </div>
			</div>
        	)
		}
		else{
        return(
			<div>
			<div className="userMenu" >
				<SubMenu></SubMenu>
		   	</div>
            <div className="Home">
                <h1>WeRoomie</h1>
                <div className="child">
                {this.props.children}
            </div>
            </div>
			</div>
        )
    	}
	}

}
