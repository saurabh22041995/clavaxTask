import React, { Component } from 'react'
import StudentList from './Student/studentList';
import StudentForm from './Student/studentForm';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";




class Routes extends Component {
   
    render() {
        return (
            <React.Fragment>
                <Router>
                    <Switch>
                            <Route exact path="/" component={StudentList} />
                            <Route exact path="/form" component={StudentForm} />
                    </Switch>
                </Router>
            </React.Fragment>
        )
    }
}

export default Routes;