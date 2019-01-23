import React, { Component } from "react";
import "./App.css";
import axios from "axios";

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

  render() {
    const { data } = this.state;

    const items = data.map(item => {
      return (
        <li key={item.id}>
          <p>{item.name}</p>
          <p>{item.email}</p>
          <p>{item.age}</p>
          <button onClick={() => this.deletePost(item.id)}>delete</button>
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
            value={this.state.name}
          />{" "}
          <br />
          <input
            type="text"
            name="email"
            placeholder="email"
            onChange={this.changeHandler}
            value={this.state.email}
          />{" "}
          <br />
          <input
            type="number"
            min="0"
            max="100"
            name="age"
            placeholder="age"
            onChange={this.changeHandler}
            value={this.state.age}
          />{" "}
          <br />
          <button type="submit">submit</button>
        </form>
        <ul>
          <hr />
          <h1>Lambda Friends</h1>
          {items}
        </ul>
      </div>
    );
  }
}

export default App;
