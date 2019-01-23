import React, { Component } from "react";
import FriendCard from "./FriendCard";
import axios from "axios";

class Friend extends Component {
  state = {
    friends: null
  };

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProp) {
    if (this.props.match.params.id !== nextProp.match.params.id) {
      this.fetchMovie(nextProp.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/friends/${id}`)
      .then(response => {
        this.setState(() => ({ friends: response.data }));
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <div>
        <FriendCard item={this.state.friends} />
      </div>
    );
  }
}

export default Friend;
