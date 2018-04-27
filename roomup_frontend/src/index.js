/*import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App >, document.getElementById('root'));
registerServiceWorker();*/

//import './index.css';
//import App from './App';
//import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';


// Include your new Components here
import Home from './components/Home/Home.jsx';

// Include any new stylesheets here
// Note that components' stylesheets should NOT be included here.
// They should be 'require'd in their component class file.
require('./styles/main.scss');

ReactDOM.render(<Router>
        <Home>
        </Home>
    </Router>, document.getElementById('root'));
				
//ReactDOM.render(<App/>, document.getElementById('root'));
//registerServiceWorker();


