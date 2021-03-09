import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import axios from 'axios';


class StudentForm extends Component {
    state = {
        student_name: "",
        father_name: "",
        dob: "",
        address: "",
        city: "",
        state: "",
        pin: "",
        phone: "",
        Email: "",
        class: "",
        marks: "",
        enrollDate: "",
        student_nameError: false,
        father_nameError: false,
        dobError: false,
        addressError: false,
        cityError: false,
        stateError: false,
        pinError: false,
        phoneError: false,
        EmailError: false,
        classError: false,
        marksError: false,
        enrollDateError: false,
        id: ''
    }

    componentDidMount() {
        let id = this.props.location?.state?.id
        if (id) {
            axios.get(`http://localhost:8000/students/student/${id}`)
                .then(res => {
                    console.log(res);
                    let data = res.data
                    this.setState({
                        student_name: data.student_name,
                        father_name: data.father_name,
                        dob: data.dob,
                        address: data.address,
                        city: data.city,
                        state: data.state,
                        pin: data.pin,
                        phone: data.phone,
                        Email: data.Email,
                        class: data.class,
                        marks: data.marks,
                        enrollDate: data.enrollDate,
                        id: data._id
                    })
                })
                .catch(error => console.log(error))
        }
    }

    validateForm = async () => {
        let { student_name, father_name, address, pin, phone, dob, city, state, Email, marks, enrollDate } = this.state
        let isValid = true
        let student_namereg = /^[a-zA-Z ]{2,30}$/
        let emailreg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        // let zipcodereg = /(^\d{6}$)|(^\d{5}-\d{4}$)/
        if (student_name.length < 1 || !student_namereg.test(student_name)) {
            isValid = false
            await this.setState({
                student_nameError: true
            })
        }
        if (father_name.length < 1 || !student_namereg.test(father_name)) {
            isValid = false
            await this.setState({
                father_nameError: true
            })
        }
        if (Email.length < 1 || !emailreg.test(String(Email).toLowerCase())) {
            isValid = false
            await this.setState({
                EmailError: true
            })
        }
        if (address.length < 1) {
            isValid = false
            await this.setState({
                addressError: true
            })
        }
        if (!Number(pin)) {
            isValid = false
            await this.setState({
                pinError: true
            })
        }
        if (!Number(phone)) {
            isValid = false
            await this.setState({
                phoneError: true
            })
        }
        if (city.length < 1) {
            isValid = false
            await this.setState({
                cityError: true
            })
        }
        if (state.length < 1) {
            isValid = false
            await this.setState({
                stateError: true
            })
        }
        if (!Number(marks)) {
            isValid = false
            await this.setState({
                marksError: true
            })
        }
        if (enrollDate.length < 1) {
            isValid = false
            await this.setState({
                enrollDateError: true
            })
        }
        if (dob.length < 1) {
            isValid = false
            await this.setState({
                dobError: true
            })
        }
        return isValid
    }

    handlechange = (e) => {
        let { name, value } = e.target
        if (name && value) {
            this.setState({
                [name]: value
            })
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        let { student_name, father_name, address, pin, phone, dob, city, state, Email, marks, enrollDate } = this.state
        let isvalid = await this.validateForm()
        if(this.state.id){
            if (isvalid) {
                let obj = {
                    student_name: student_name,
                    father_name: father_name,
                    dob: dob,
                    address: address,
                    city: city,
                    state: state,
                    pin: pin,
                    phone: phone,
                    Email: Email,
                    class: this.state.class,
                    marks: parseInt(marks),
                    enrollDate: enrollDate,
                }
                axios.put(`http://localhost:8000/students/updateStudent/${this.state.id}`, obj, {
                    headers: {
                        "Content-Length": 300,
                        "Content-Type": "application/json",
                        "Accept": "*/*"
                    }
                })
                    .then(res => {
                        let { data } = res
                        if (data) {
                            for (const key in obj) {
                                this.setState({
                                    [key]: ""
                                })
                            }
                            this.props.history.push('/')
                        }
                    })
                    .catch(error => console.log(error))
            } else {
                // alert('not valid')
            }
        }else{

            if (isvalid) {
                let obj = {
                    student_name: student_name,
                    father_name: father_name,
                    dob: dob,
                    address: address,
                    city: city,
                    state: state,
                    pin: pin,
                    phone: phone,
                    Email: Email,
                    class: this.state.class,
                    marks: parseInt(marks),
                    enrollDate: enrollDate,
                }
                axios.post('http://localhost:8000/students/poststudent', obj)
                    .then(res => {
                        let { data } = res
                        if (data) {
                            for (const key in obj) {
                                this.setState({
                                    [key]: ""
                                })
                            }
                            this.props.history.push('/')
                        }
                    })
                    .catch(error => console.log(error))
            } else {
                // alert('not valid')
            }
        }
    }

    render() {
        let { student_name, father_name, address, pin, phone, dob, city, state, Email, marks, enrollDate } = this.state
        return (
            <React.Fragment>
                <div >
                    <h2 >Student Form</h2>
                    <div style={{ "display": "flex", alignItems: "center", justifyContent: "center" }}>
                        <form >
                            <div class="form-row">
                                <div class="col-md-4 mb-3">
                                    <label for="validationDefault01">Student name : </label>
                                    <input type="text" class="form-control" id="validationDefault01" placeholder="Student name" name="student_name" onChange={this.handlechange} required value={student_name} />
                                    {
                                        this.state.student_nameError
                                        ?
                                        <span className="text-danger">Field Error</span>
                                        :
                                        null
                                    }
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="validationDefault02">Father name : </label>
                                    <input type="text" class="form-control" id="validationDefault02" placeholder="Father name" name="father_name" onChange={this.handlechange} required value={father_name} />
                                    {
                                        this.state.father_nameError
                                        ?
                                        <span className="text-danger">Field Error</span>
                                        :
                                        null
                                    }
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="validationDefaultUsername">DOB : </label>
                                    <input type="date" class="form-control" max="2017-12-31" id="validationDefaultUsername" placeholder="DOB" name="dob" onChange={this.handlechange} aria-describedby="inputGroupPrepend2" required value={dob} />
                                    {
                                        this.state.dobError
                                        ?
                                        <span className="text-danger">Field Error</span>
                                        :
                                        null
                                    }
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-md-6 mb-3">
                                    <label for="validationDefault03">Address : </label>
                                    <input type="text" class="form-control" id="validationDefault03" placeholder="Address" onChange={this.handlechange} name="address" required value={address} />
                                    {
                                        this.state.addressError
                                        ?
                                        <span className="text-danger">Field Error</span>
                                        :
                                        null
                                    }
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="validationDefault03">City : </label>
                                    <input type="text" class="form-control" id="validationDefault03" placeholder="City" onChange={this.handlechange} name="city" required value={city} />
                                    {
                                        this.state.cityError
                                        ?
                                        <span className="text-danger">Field Error</span>
                                        :
                                        null
                                    }
                                </div>
                                <div class="col-md-3 mb-3">
                                    <label for="validationDefault04">State : </label>
                                    <input type="text" class="form-control" id="validationDefault04" placeholder="State" onChange={this.handlechange} name="state" required value={state} />
                                    {
                                        this.state.stateError
                                        ?
                                        <span className="text-danger">Field Error</span>
                                        :
                                        null
                                    }
                                </div>
                                <div class="col-md-3 mb-3">
                                    <label for="validationDefault05">Pincode : </label>
                                    <input type="text" class="form-control" id="validationDefault05" maxLength="6" placeholder="Pincode" onChange={this.handlechange} name="pin" required value={pin} />
                                    {
                                        this.state.pinError
                                        ?
                                        <span className="text-danger">Field Error</span>
                                        :
                                        null
                                    }
                                </div>
                                <div class="col-md-3 mb-3">
                                    <label for="validationDefault05">Phone no. : </label>
                                    <input type="text" class="form-control" id="validationDefault05" maxLength="10" placeholder="Phone no." onChange={this.handlechange} name="phone" required value={phone} />
                                    {
                                        this.state.phoneError
                                        ?
                                        <span className="text-danger">Field Error</span>
                                        :
                                        null
                                    }
                                </div>
                                <div class="col-md-3 mb-3">
                                    <label for="validationDefault05">Email : </label>
                                    <input type="text" class="form-control" id="validationDefault05" placeholder="Email" onChange={this.handlechange} name="Email" required value={Email} />
                                    {
                                        this.state.EmailError
                                        ?
                                        <span className="text-danger">Field Error</span>
                                        :
                                        null
                                    }
                                </div>
                                <div class="col-md-3 mb-3">
                                    <label for="validationDefault05">Class : </label>
                                    <select type="text" class="form-control" id="validationDefault05" placeholder="Class" onChange={this.handlechange} name="class" required value={this.state.class}>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                    </select>
                                    {
                                        this.state.classError
                                        ?
                                        <span className="text-danger">Field Error</span>
                                        :
                                        null
                                    }
                                </div>
                                <div class="col-md-3 mb-3">
                                    <label for="validationDefault05">Marks : </label>
                                    <input type="number" class="form-control" id="validationDefault05" placeholder="Marks %" onChange={this.handlechange} name="marks" required value={marks} />
                                    {
                                        this.state.marksError
                                        ?
                                        <span className="text-danger">Field Error</span>
                                        :
                                        null
                                    }
                                </div>
                                <div class="col-md-3 mb-3">
                                    <label for="validationDefault05">Date Enrolled : </label>
                                    <input type="date" class="form-control" id="validationDefault05" max="2017-12-31" placeholder="Date Enrolled" onChange={this.handlechange} name="enrollDate" required value={enrollDate} />
                                    {
                                        this.state.enrollDateError
                                        ?
                                        <span className="text-danger">Field Error</span>
                                        :
                                        null
                                    }
                                </div>
                            </div>
                            <button class="btn btn-primary" type="submit" onClick={this.handleSubmit}>Submit form</button>
                        </form>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}

export default StudentForm