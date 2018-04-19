import React, { Component } from 'react'
import { Button, Menu, Dropdown } from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'

export default class SubMenu extends Component {
  constructor(props)
	{
		super(props);
		this.state = { activeItem: 'likes' }
	}
  
  render() {
    const { activeItem } = this.state
    return (
    <Dropdown text='You' pointing className='link item'>
      <Dropdown.Menu>
        <Dropdown.Header>Matching</Dropdown.Header>
        <Dropdown.Item>Likes</Dropdown.Item>
        <Dropdown.Item>Messages</Dropdown.Item>
        <Dropdown.Divider/>
        <Dropdown.Header>Settings</Dropdown.Header>
		<Dropdown.Item>
			<Link to={`/UserProfile`}>UserProfile</Link>
		</Dropdown.Item>
        <Dropdown.Item>
        <Link to={`/becomeAdvanced`}>GoAdvanced</Link>
        </Dropdown.Item>
		<Dropdown.Item onClick={this.props.onClickLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    )
  }
}