import React, { Component } from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'

export default class SubMenu extends Component {
  constructor()
	{
		super();
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
        <Dropdown.Item>Profile</Dropdown.Item>
        <Dropdown.Item>Preference</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    )
  }
}