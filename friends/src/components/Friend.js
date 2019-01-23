import React, { Component } from "react";
import FriendCard from "./FriendCard";
import axios from "axios";
import { Button } from "reactstrap";
class Friend extends Component {
  state = {
    friends: null
  };

  componentDidMount() {
    this.fetchFriends(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProp) {
    if (this.props.match.params.id !== nextProp.match.params.id) {
      this.fetchFriends(nextProp.match.params.id);
    }
  }

  fetchFriends = id => {
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
    if (!this.state.friends) {
      return <div>Loading friends information...</div>;
    }
    return (
      <div>
        <FriendCard item={this.state.friends} />
      </div>
    );
  }
}

export default Friend;
