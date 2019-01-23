import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

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
    email: "",
    modal: false
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
      .catch(err => this.setState({ errors: err }));
  };
  componentDidMount() {
    this.fetchData();
  }
  fetchData = () => {
    axios
      .get(`${URL}`)
      .then(res => this.setState({ data: res.data }))
      .catch(err => this.setState({ errors: err }));
  };
  deletePost = id => {
    axios
      .delete(`${URL}/${id}`)
      .then(res => this.setState({ data: res.data }))
      .catch(err => this.setState({ errors: err }));
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
      .catch(err => this.setState({ errors: err }));
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    const { data, errors, age, name, email } = this.state;
    return (
      <Router>
        <div className="App">
          <NavBar />
          <div>
            <Button color="primary" onClick={this.toggle}>
              Create a Post
            </Button>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className={this.props.className}
            >
              <ModalHeader toggle={this.toggle}>Form</ModalHeader>
              <ModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggle}>
                  Submit
                </Button>{" "}
                <Button color="secondary" onClick={this.toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
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
                updatePost={this.updatePost}
                deletePost={this.deletePost}
              />
            )}
          />
          {errors && <h3>{errors.message}</h3>}
          <ul>
            <hr />
            <Route
              path="/"
              exact
              render={props => <FriendsLists {...props} data={data} />}
            />
            <Route path="/friend/:id" render={props => <Friend {...props} />} />
          </ul>
        </div>
      </Router>
    );
  }
}

export default App;
