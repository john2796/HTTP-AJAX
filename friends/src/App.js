import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import FriendsLists from "./components/FriendsLists";
import NavBar from "./components/Navbar";
import Friend from "./components/Friend";

import { Alert } from "reactstrap";
const URL = "http://localhost:5000/friends";
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
class App extends Component {
  state = {
    data: [],
    age: 0,
    name: "",
    email: "",
    modal: false,
    updateBtnClicked: false,
    errors: {},
    success: {}
  };
  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  submitHandler = (e, id, x) => {
    e.preventDefault();
    if (this.state.updateBtnClicked) {
      this.saveUpdatedPost(id, x);
    } else {
      this.addNewPost(x);
    }
  };

  addNewPost = x => {
    const { email, name, age } = this.state;
    let errors = this.state.errors;
    if (!name) {
      errors.message = "field is empty";
      this.setState({ errors });
      return;
    } else if (!validateEmail(email)) {
      errors.message = "email is not valid";
      this.setState({ errors });
      return;
    } else if (age <= 0) {
      errors.message = "age field is required";
      this.setState({ errors });
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
        this.setState({
          data: res.data,
          email: "",
          name: "",
          age: 0,
          errors: {},
          modal: !this.state.modal
        })
      )
      .then(() => x.history.push("/"))
      .catch(err => this.setState({ errors: err }));
  };
  componentWillMount() {
    localStorage.getItem("data") &&
      this.setState({ data: JSON.parse(localStorage.getItem("data")) });
  }
  componentDidMount() {
    if (!localStorage.getItem("data")) {
      this.fetchData();
    } else {
      console.log("Using data from localStorage");
    }
  }
  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem("data", JSON.stringify(nextState.data));
  }

  fetchData = () => {
    axios
      .get(`${URL}`)
      .then(res =>
        this.setState({
          data: res.data,
          errors: {}
        })
      )
      .catch(err =>
        this.setState({
          errors: err
        })
      );
  };
  deletePost = (id, x) => {
    let success = this.state.success;
    success.message = "post deleted successfuly";
    axios
      .delete(`${URL}/${id}`)
      .then(res => this.setState({ data: res.data, success }))
      .catch(err => this.setState({ errors: err }));
    x.history.push("/");
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      updateBtnClicked: false,
      errors: {}
    });
  };
  updatePost = data => {
    const friends = data;
    console.log(friends);
    this.setState({
      age: friends.age,
      name: friends.name,
      email: friends.email,
      updateBtnClicked: true,
      modal: true
    });
  };
  saveUpdatedPost = id => {
    let errors = this.state.errors;
    const { email, name, age } = this.state;
    if (!name) {
      errors.message = "field is empty";
      this.setState({ errors });
      return;
    } else if (!validateEmail(email)) {
      errors.message = "email is not valid";
      this.setState({ errors });
      return;
    } else if (age <= 0) {
      errors.message = "age field is required to update";
      this.setState({ errors });
      return;
    }
    const updatedPost = {
      name,
      email,
      age
    };
    console.log({ updatedPost, id });

    axios
      .put(`${URL}/${id}`, updatedPost)
      .then(res =>
        this.setState({
          data: res.data,
          modal: !this.state.modal,
          errors: {}
        })
      )
      .then(() => window.location.reload())
      .catch(err =>
        this.setState({
          errors: err
        })
      );
  };

  render() {
    const { data, errors, age, name, email, success } = this.state;
    return (
      <Router>
        <div className="App">
          <NavBar />
          {success && (
            <h3>
              <Alert color={!success && "success"}>{success.message}</Alert>
            </h3>
          )}
          {!data.length && (
            <img
              src="https://media.giphy.com/media/3ohzdL95gkIo73F3Vu/giphy.gif"
              alt="spinner loading"
            />
          )}
          <ul>
            <hr />
            <Route
              path="/"
              exact
              render={props => <FriendsLists {...props} data={data} />}
            />
            <Route
              path="/friend/:id"
              render={props => (
                <Friend
                  errors={errors}
                  deletePost={this.deletePost}
                  updatePost={this.updatePost}
                  updateBtnClicked={this.state.updateBtnClicked}
                  changeHandler={this.changeHandler}
                  age={age}
                  name={name}
                  email={email}
                  isOpen={this.state.modal}
                  toggle={this.toggle}
                  submitHandler={this.submitHandler}
                  {...props}
                />
              )}
            />
          </ul>
        </div>
      </Router>
    );
  }
}

export default App;
