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
        this.changeToPrevID=this.changeToPrevID.bind(this);
        this.changeToNextID=this.changeToNextID.bind(this);
    }

    render(){
        
        return (
            <div className="searchComp">
            <h3>Detail View</h3>
            <Button.Group>
             <Button onClick={this.changeToPrevID}>Prev in MovieID</Button>
             <Button.Or text='Or' />
             <Link to={"/searchComp"}> 
             <Button color="green">Back to Search</Button>
             </Link>
             <Button.Or text='Or' />
             <Button onClick={this.changeToNextID}>Next in MovieID</Button>
             </Button.Group>
                <div className="prompt">
                    {this.state.prompt}
                </div>
                <div className="result_display">
                    {this.state.result_display}
                </div>
            </div>);
    }
    
    changeToPrevID()
    {
        var results=[];
        var tempUrl=this.baseUrl+this.prev_id+this.apikey;
        let url = tempUrl;
        axios.get(url)
                .then((response) => {
                console.log(response);
        let results=response.data;
        let single_entry=this.generate_entry(results.original_title,results.poster_path,results.overview);
        let temp=this.prev_id;
       this.next_id=temp+1;
       this.prev_id=temp-1;
       console.log(this.next_id);
        this.setState({result_display:single_entry,
                       movie_id:temp
                      });
            });
    }

    changeToNextID()
    {
        console.log("detailView");
        console.log(this.props.match.params.movie_id);
        console.log(this.props.match.params.keyword);
        var results=[];
        var tempUrl=this.baseUrl+this.next_id+this.apikey;
        console.log(tempUrl);
        console.log("get");
        let url = tempUrl;
        axios.get(url)
                .then((response) => {
                console.log(response);
        let results=response.data;
        let single_entry=this.generate_entry(results.original_title,results.poster_path,results.overview);
        let temp=this.next_id;
       this.next_id=temp+1;
       this.prev_id=temp-1;
       console.log(this.next_id);
        this.setState({result_display:single_entry,
                       movie_id:temp
                      });
            });

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
        console.log("detailView");
        console.log(this.props.match.params.movie_id);
        var results=[];
        var tempUrl=this.baseUrl+this.props.match.params.movie_id+this.apikey;
        console.log(tempUrl);
        console.log("get");
        let url = tempUrl;
        axios.get(url)
                .then((response) => {
                console.log(response);
        let results=response.data;
        let single_entry=this.generate_entry(results.original_title,results.poster_path,results.overview);
        let temp=this.props.match.params.movie_id;
       this.next_id=Number(temp)+1;
       this.prev_id=Number(temp)-1;
       console.log(this.next_id);
        this.setState({result_display:single_entry,
                       movie_id:this.props.match.params.movie_id
                      });
            });

        }
}