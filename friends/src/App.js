import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import axios from "axios";
import FriendForm from "./components/FriendForm";
import FriendsLists from "./components/FriendsLists";
import NavBar from "./components/Navbar";
import Friend from "./components/Friend";
const URL = "http://localhost:5000/friends";

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
class App extends Component {
  state = {
    data: [],
    errors: {},
    age: 0,
    name: "",
    email: ""
  };
  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  submitHandler = e => {
    e.preventDefault();
    const { email, name, age } = this.state;
    if (!name) {
      alert("field is empty");
      return;
    } else if (!validateEmail(email)) {
      alert("email is not valid");
      return;
    } else if (age <= 0) {
      alert("age field is required");
      return;
    }
    const newPost = {
      name,
      email,
      age
    };
    axios
      .post(`${URL}`, newPost)
      .then(res =>
        this.setState({ data: res.data, email: "", name: "", age: 0 })
      )
      .then(() => alert("message has been added"))
      .catch(err => this.setState({ errors: err.response.data }));
  };
  componentDidMount() {
    this.fetchData();
  }
  fetchData = () => {
    axios
      .get(`${URL}`)
      .then(res => this.setState({ data: res.data }))
      .catch(err => this.setState({ errors: err.response.data }));
  };
  deletePost = id => {
    axios
      .delete(`${URL}/${id}`)
      .then(res => this.setState({ data: res.data }))
      .catch(err => this.setState({ errors: err.response.data }));
  };
  updatePost = id => {
    const { email, name, age } = this.state;
    if (!name) {
      alert("field is empty");
      return;
    } else if (!validateEmail(email)) {
      alert("email is not valid");
      return;
    } else if (age <= 0) {
      alert("age field is required to update");
      return;
    }
    const updatePost = {
      name,
      email,
      age
    };
    axios
      .put(`${URL}/${id}`, updatePost)
      .then(res => this.setState({ data: res.data }))
      .catch(err => this.setState({ errors: err.response.data }));
  };

  render() {
    const { data, errors, age, name, email } = this.state;
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Route
            path="/form"
            render={props => (
              <FriendForm
                {...props}
                submitHandler={this.submitHandler}
                changeHandler={this.changeHandler}
                age={age}
                name={name}
                email={email}
              />
            )}
          />
          {errors && <h3>{errors.message}</h3>}
          <ul>
            <hr />
            <Route
              path="/"
              exact
              render={props => (
                <FriendsLists
                  {...props}
                  data={data}
                  deletePost={this.deletePost}
                  updatePost={this.updatePost}
                />
              )}
            />
            <Route path="/friend/:id" render={props => <Friend {...props} />} />
          </ul>
        </div>
      </Router>
    );
  }
}

export default App;
