import React, { Component } from 'react'
import { Button, Menu, Dropdown, Card, Segment} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'
import styles from './Home.scss'
import SubMenu from '../SubMenu.jsx'

//test_only
var jsonResults=[
    {"addr":"Apt#101, 1010 University Avenue","gID":16001,"memberName":["apple"]},
    {"addr":"Apt#102, 1010 University Avenue","gID":16002,"memberName":["banana","peach"]},
    {"addr":"Apt#103, 1010 University Avenue","gID":16003,"memberName":["blackberries"]}
  ];

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
            <Card className="likeList">
                <Card.Content>
                <Card.Header>
                    Like List
                </Card.Header>
                </Card.Content>
            <Card.Content>  
                <Segment.Group>
                <Segment><a>Group1</a></Segment>
                <Segment><a>Group2</a></Segment>
                </Segment.Group>
            </Card.Content>
            </Card>
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
