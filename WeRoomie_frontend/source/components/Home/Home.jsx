import React, { Component } from 'react'
import { Button, Menu, Dropdown} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'
import styles from './Home.scss'
import SubMenu from '../SubMenu.jsx'

export default class Home extends Component {

    render() {
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
