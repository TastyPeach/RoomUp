import React from 'react';
import styles from './components.scss'
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import { Container,Button, Select, Input,Dropdown, Checkbox ,Card ,Image, Message} from 'semantic-ui-react';
import propTypes from 'prop-types';
import axios from 'axios';

export default class GroupDetail extends React.Component{
    
    
    constructor(){
        super();
        this.baseUrl='https://api.themoviedb.org/3/movie/'
        this.apikey='?api_key=11ed5ad7b3eec295ef96c0ab0266446f';
        this.state={
            movie_id:0,
            prompt:<div></div>,
            result_display:<div></div>
        }
        this.next_id=0;
        this.prev_id=0;
        this.changeToPrevGroup=this.changeToPrevGroup.bind(this);
        this.changeToNextGrup=this.changeToNextGroup.bind(this);
    }

    render(){
        
        return (
            <div className="searchComp">
            <h3>Detail View</h3>
            <Button.Group>
             <Button onClick={this.changeToPrevGroup}>Your Previous Group</Button>
             <Button.Or text='Or' />
             <Link to={"/search"}> 
             <Button color="green">Back to Search</Button>
             </Link>
             <Button.Or text='Or' />
             <Button onClick={this.changeToNextGroup}>Your Next Group</Button>
             </Button.Group>
             <div className="result_display">
                    Some More Details Here
             </div>
            </div>);
    }
    
    changeToPrevGroup()
    {
    }

    changeToNextGroup()
    {
    }
    
    generate_entry(m_original_title,m_poster_path,m_overview)
    { 
        return(
            <div className="entry">
            <Container Text>
            <h2 className="entry_title">{m_original_title}</h2>
            <div className="entry_image">
              <Image fluid src={"https://image.tmdb.org/t/p/w500" + m_poster_path}></Image>
            </div>
            <div className="entry_overview">{m_overview}</div>
                </Container>
            </div>
        );
    }
    
    componentWillMount(){
        console.log("DetailView Enter");
	}
}