import React from 'react';
import styles from './components.css'
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import { Button,Grid,Segment, Form, Icon} from 'semantic-ui-react';
import axios from 'axios';


const options = [
	{ key: 'm', text: 'Male', value: '0' },
	{ key: 'f', text: 'Female', value: '1' },
  ]
  
  const options1 = [
	  { key: 'q0', text: '0-Very Quiet', value: '0' },
	  { key: 'q1', text: '1', value: '1' },
	  { key: 'q2', text: '2', value: '2' },
	  { key: 'q3', text: '3', value: '3' },
	  { key: 'q4', text: '4', value: '4' },
	  { key: 'q5', text: '5-Very Noisy', value: '5' },
	  ]
  
  const options2 = [
	  { key: 's0', text: '0-Very Clean', value: '0' },
	  { key: 's1', text: '1', value: '1' },
	  { key: 's2', text: '2', value: '2' },
	  { key: 's3', text: '3', value: '3' },
	  { key: 's4', text: '4', value: '4' },
	  { key: 's5', text: '5-Very Sloppy', value: '5' },
	  ]    
  
  const options3 = [
	  { key: 't0', text: '0-Very Early', value: '0' },
	  { key: 't1', text: '1', value: '1' },
	  { key: 't2', text: '2', value: '2' },
	  { key: 't3', text: '3', value: '3' },
	  { key: 't4', text: '4', value: '4' },
	  { key: 't5', text: '5-Very Late', value: '5' },
	  ]  
  
  const options4 = [
	  { key: 'p0', text: 'Love Pet', value: '0' },
	  { key: 'p1', text: 'Naw ;(', value: '1' },
	  ]  

export default class AdvancedUserReg extends React.Component{
    
    
    constructor(props){
        super(props);
        this.state={
			user_filter:{
                pet:0,
                gender:0,
                quietness:4,
                sanitary:1,
                timetobed:2,
                age:0,
                ethinicity:'Ethinicity TBD',
                graduationyear:0,
				major:'Major TBD',
				// note:'TBD',
	            },
			user_token:this.props.user_token,
			gid:null
		}
		this.onChangeGender=this.onChangeGender.bind(this);
		this.onChangePet=this.onChangePet.bind(this);
		this.onChangeQuietness=this.onChangeQuietness.bind(this);
		this.onChangeSanitary=this.onChangeSanitary.bind(this);
        this.onChangeTimetobed=this.onChangeTimetobed.bind(this);
        this.onChangeAge=this.onChangeAge.bind(this);
		this.onChangeGraduationYear=this.onChangeGraduationYear.bind(this);
		this.onChangeEthinicity=this.onChangeEthinicity.bind(this);
        this.onChangeMajor=this.onChangeMajor.bind(this);
        // this.onChangeNote=this.onChangeNote.bind(this);
        this.createRequestURLForBecomeAdvancedUser=this.createRequestURLForBecomeAdvancedUser.bind(this);
		console.log(this.props.user_token);
    }



    onChangeGender(e,d)
	{
		var new_user_filter=this.state.user_filter;
		new_user_filter.gender=d.value;
		this.setState({user_filter:new_user_filter});
	}
	onChangePet(e,d)
	{
	    var new_user_filter=this.state.user_filter;
		new_user_filter.pet=d.value;
		this.setState({user_filter:new_user_filter});
	}
	onChangeQuietness(e,d)
	{
        var new_user_filter=this.state.user_filter;
		new_user_filter.quietness=d.value;
		this.setState({user_filter:new_user_filter});
	}
	onChangeSanitary(e,d)
	{
	    var new_user_filter=this.state.user_filter;
		new_user_filter.sanitary=d.value;
		this.setState({user_filter:new_user_filter});
	}
	onChangeTimetobed(e,d)
	{
	    var new_user_filter=this.state.user_filter;
		new_user_filter.timetobed=d.value;
		this.setState({user_filter:new_user_filter});
    }
    onChangeAge(e,d)
	{
	    var new_user_filter=this.state.user_filter;
		new_user_filter.age=d.value;
		this.setState({user_filter:new_user_filter});
    }
    onChangeGraduationYear(e,d)
	{
	    var new_user_filter=this.state.user_filter;
		new_user_filter.graduationyear=d.value;
		this.setState({user_filter:new_user_filter});
    }   
    onChangeMajor(e,d)
	{
	    var new_user_filter=this.state.user_filter;
		new_user_filter.major=d.value;
		this.setState({user_filter:new_user_filter});
    }
    onChangeEthinicity(e,d)
	{
	    var new_user_filter=this.state.user_filter;
		new_user_filter.ethinicity=d.value;
		this.setState({user_filter:new_user_filter});
    }
    // onChangeNote(e,d)
	// {
	//     var new_user_filter=this.state.user_filter;
	// 	new_user_filter.note=d.value;
	// 	this.setState({user_filter:new_user_filter});
	// }
    

    createRequestURLForBecomeAdvancedUser(){
        var baseUrl="http://18.219.12.38:8001/become_advance";

        console.log(this.state.user_filter);
		
		var gender = this.state.user_filter.gender;
		var quietness = this.state.user_filter.quietness;
		var sanitary = this.state.user_filter.sanitary;
		var timetobed = this.state.user_filter.timetobed;
        var pet = this.state.user_filter.pet;
        var age = this.state.user_filter.age;
		var graduationyear = this.state.user_filter.graduationyear;
		var major = this.state.user_filter.major;
		var ethinicity = this.state.user_filter.ethinicity;
        
        var bodyFormData = new FormData();
		bodyFormData.set('gender', gender);
		bodyFormData.set('quietness', quietness);
		bodyFormData.set('sanitary', sanitary);
		bodyFormData.set('timetobed', timetobed);
		bodyFormData.set('pet', pet);
		bodyFormData.set('age', age);
		bodyFormData.set('graduationyear', graduationyear);
		bodyFormData.set('major', major);
		bodyFormData.set('ethinicity', ethinicity);

		console.log(bodyFormData.get('gender'))
		console.log(bodyFormData.get('quietness'))
		console.log(bodyFormData.get('timetobed'))
		console.log(bodyFormData.get('sanitary'))
		console.log(bodyFormData.get('pet'))
		console.log(bodyFormData.get('age'))
		console.log(bodyFormData.get('graduationyear'))
		console.log(bodyFormData.get('timetobed'))
		console.log(bodyFormData.get('major'))
		console.log(bodyFormData.get('ethinicity'))



        axios({
    		method: 'post',
    		url: baseUrl,
    		data: bodyFormData,
    		config: { headers: {
				'Content-Type': 'multipart/form-data',
				}},
			headers:{'Authorization':"Token "+this.state.user_token}
			})
        .then((response)=>{
			//handle success
			console.log(response.data.quietness)
			alert("BecomeAdvanced Success");
			
        })
        .catch(function (response) {
            //handle error
            console.log(response);
			alert("BecomeAdvanced Failed");
        });
		}
	
    searchSubmit(e){
        console.log("Submit Button Hit");
	}


  render() {
    return (
	  <div className="searchComp">	
	  <Button.Group>
             <Link to={"/"}> 
             <Button color="green">Back to Search</Button>
             </Link>
      </Button.Group>
	  <h3>Become Advanced User and Enjoy more Services ;)</h3>	
	  <div className="result_display" >
	   		<Form>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Age' onChange={this.onChangeAge} placeholder='Age' />
          <Form.Input fluid label='Ethnicity' onChange={this.onChangeEthinicity} placeholder='Ethnicity' />
          <Form.Select fluid label='Gender' onChange={this.onChangeGender} options={options} placeholder='Gender' />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Major' onChange={this.onChangeMajor} placeholder='Major' />
          <Form.Input fluid label='Graduation Year' onChange={this.onChangeGraduationYear} placeholder='Graduation Year' />
          <Form.Select fluid label='Pet or Not' onChange={this.onChangePet} options={options4} placeholder='Pet or Not' />
        </Form.Group>
        <Form.Group widths='equal'>
            <Form.Select fluid label='Quietness' onChange={this.onChangeQuietness} options={options1} placeholder='0-5' />
            <Form.Select fluid label='Sanitation' onChange={this.onChangeSanitary} options={options2} placeholder='0-5' />
            <Form.Select fluid label='Time2Bed' onChange={this.onChangeTimetobed} options={options3} placeholder='0-5' />
        </Form.Group>
        <Form.TextArea label='UserNote' onChange={this.onChangeNote} placeholder='Tell us more about you, eg.your hobbies ;)' />
        <Form.Checkbox label='I agree to the Terms and Conditions' />
		<Link to={"/"}>
        <Form.Button type='submit' onClick={this.createRequestURLForBecomeAdvancedUser}> 
		<Icon name='yellow hand pointer' />
		Submit </Form.Button>
		</Link>
      </Form>
      </div>	
	  </div>
    )
  }
}