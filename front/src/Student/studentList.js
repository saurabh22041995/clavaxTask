import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import axios from 'axios';


class StudentList extends Component {
    state = {
        allStudents: [],
        allStudentsArray: [],
        count: 0
    }

    componentDidMount() {
        axios.get('http://localhost:8000/students/allstudents', { headers: { "Content-Type": "application/json" } })
            .then(res => {
                // console.log(res);
                this.setState({
                    allStudents: res.data,
                    allStudentsArray: res.data,
                    count: res.data.length
                }, () => {
                    this.state.allStudents.length>0 && this.state.allStudents.map((ele, index) => (
                        ele.sNo = index+1
                    ))
                    this.getData(0)
                })
            })
            .catch(err => console.log(err))
    }

    getData = async (pageNo) => {
        let noOfRecordsPerPage = 4
        let startLimit = pageNo*noOfRecordsPerPage
        let endLimit = startLimit+noOfRecordsPerPage
        // let allStudents = [...this.state.allStudents]
        await this.setState({
            allStudents: this.state.allStudentsArray.slice(startLimit, endLimit)
        })
        
    }

    render() {
        let { allStudents, count } = this.state
        return (
            <React.Fragment>
                <div style={{ "width": "800px" }}>
                    <div >
                        <h1>Enrollment App</h1>
                    </div>
                    <div style={{ "float": "right" }}>
                        <button style={{ "fontSize": "30px" }}><Link to="/form">New Student</Link></button>
                    </div>
                    <div >
                        <table>

                            <thead>
                                <tr>
                                    <th scope="col">S.No.</th>
                                    <th scope="col">Student Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Class</th>
                                    <th scope="col">Marks</th>
                                    <th scope="col">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allStudents.length > 0 && allStudents.map((ele, index) => (
                                        <tr key={index}>
                                            <td>{ele.sNo}</td>
                                            <td>{ele.student_name}</td>
                                            <td>{ele.Email}</td>
                                            <td>{ele.phone}</td>
                                            <td>{ele.class}</td>
                                            <td>{ele.marks}</td>
                                            <td><Link to={
                                                {
                                                    pathname: '/form',
                                                    state: {
                                                        id: ele._id
                                                    }
                                                }
                                            }>Edit</Link></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination page-space" >
                        <ul >
                            {
                                count > 4
                                    ?
                                    Array.from({ length: Math.ceil(count / 4) }).map((item, index) => (
                                        <li className="active" key={index} onClick={() => this.getData(index)} style={{ "cursor": "pointer" }}>
                                            <button>{index + 1}</button>
                                        </li>
                                    ))
                                    :
                                    count === 0
                                        ?
                                        null
                                        :
                                        <li className="active" style={{ "cursor": "pointer" }}>
                                            <button>{1}</button>
                                        </li>
                            }
                        </ul>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}

export default StudentList