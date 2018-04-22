
import React, { Component } from 'react'
import { Button, Menu, Dropdown } from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
import styles from './components.css'

export default class SubMenu extends Component {
  constructor(props)
	{
		super(props);
		this.state = { activeItem: 'likes' }
	}
  
  render() {
    const { activeItem } = this.state
    return (
      <div>
        <Dropdown text='You' pointing className='link item'>
          <Dropdown.Menu>
            <Dropdown.Header>Matching</Dropdown.Header>
            <Dropdown.Item>Likes</Dropdown.Item>
            <Dropdown.Item>Messages</Dropdown.Item>
            <Dropdown.Divider/>
            <Dropdown.Header>Settings</Dropdown.Header>
		    <Dropdown.Item as={Link} to='/UserProfile'>UserProfile</Dropdown.Item>
            <Dropdown.Item as={Link} to='/becomeAdvanced'>GoAdvanced</Dropdown.Item>
        <Dropdown.Item as={Link} to='/' onClick={this.props.onClickLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button.Group>	
        <Button basic >Messages</Button>
		<Button basic onClick={this.props.onClickShowSidebar}>SavedMatch</Button>
        </Button.Group>	
      </div>  
    )
  }
}