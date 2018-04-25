import React, { Component } from 'react'
import { Button, Menu, Dropdown, Icon } from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
import styles from './components.css'

export default class SubMenu extends Component {
  constructor(props)
	{
		super(props);
		this.state = { 
			activeItem: 'likes',
			notAdvanced: this.props.notAdvanced
		}
	}
  
  render() {
    const { activeItem } = this.state
    return (
      <div>
        <Dropdown text='You' pointing className='link item'>
          <Dropdown.Menu>
            <Dropdown.Header>Settings</Dropdown.Header>
            <Dropdown.Item as={Link} to='/UserProfile'>UserProfile</Dropdown.Item>
            <Dropdown.Item as={Link} to='/CreateGroup'>CreateGroup</Dropdown.Item>
            <Dropdown.Item as={Link} to='/' onClick={this.props.onClickLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
            <Button.Group>	
            <Button basic onClick={this.props.onClickShowSidebar} animated='vertical' size='mini'>
            <Button.Content hidden>Likes</Button.Content>
            <Button.Content visible>
              <Icon name='heart' />
            </Button.Content>
          </Button>
        </Button.Group>	
      </div>  
    )
  }
}

//{this.state.notAdvanced && <Dropdown.Item as={Link} to='/becomeAdvanced'>GoAdvanced</Dropdown.Item>}
///<Link to={`/UserProfile`}>UserProfile</Link>