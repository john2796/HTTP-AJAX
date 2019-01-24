import React, { Component } from "react";
import FriendCard from "./FriendCard";
import axios from "axios";
import { Button } from "reactstrap";
import ModalComponent from "./Modal";

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
      return <div>friend info is not available</div>;
    }
    const {
      age,
      name,
      email,
      isOpen,
      toggle,
      submitHandler,
      changeHandler,
      updateBtnClicked,
      errors
    } = this.props;

    return (
      <div
        style={{
          display: "flex",
          margin: "0 auto",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <Button color="primary" onClick={toggle}>
          Create a Post
        </Button>
        <hr />

        <FriendCard item={this.state.friends} />
        <div>
          <Button
            style={{ marginRight: "25px" }}
            onClick={() =>
              this.props.deletePost(this.props.match.params.id, {
                ...this.props
              })
            }
          >
            delete
          </Button>
          <Button onClick={() => this.props.updatePost(this.state.friends)}>
            update
          </Button>
          <ModalComponent
            age={age}
            name={name}
            email={email}
            isOpen={isOpen}
            toggle={toggle}
            errors={errors}
            submitHandler={e =>
              submitHandler(e, this.props.match.params.id, { ...this.props })
            }
            changeHandler={changeHandler}
            updateBtnClicked={updateBtnClicked}
          />
        </div>
      </div>
    );
  }
}

export default Friend;
