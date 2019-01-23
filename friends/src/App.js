import React, { Component } from "react";
import "./App.css";
import axios from "axios";

const URL = "http://localhost:5000/friends";
class App extends Component {
  state = {
    data: [],
    errors: {},
    age: "",
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
    const newPost = {
      age: this.state.age,
      name: this.state.name,
      email: this.state.email
    };
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

  render() {
    const { data } = this.state;
    const items = data.map(item => {
      return (
        <li key={item.id}>
          <p>{item.age}</p>
          <p>{item.email}</p>
          <p>{item.name}</p>
        </li>
      );
    });
    return (
      <div className="App">
        <form onSubmit={this.submitHandler}>
          <p>Form</p>
          <input
            type="text"
            name="name"
            placeholder="name"
            onChange={this.changeHandler}
          />{" "}
          <br />
          <input
            type="text"
            name="email"
            placeholder="email"
            onChange={this.changeHandler}
          />{" "}
          <br />
          <input
            type="text"
            name="age"
            placeholder="age"
            onChange={this.changeHandler}
          />{" "}
          <br />
        </form>
        <ul>{items}</ul>
      </div>
    );
  }
}

export default App;
