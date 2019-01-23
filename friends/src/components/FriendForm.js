import React from "react";

const FriendForm = ({ submitHandler, age, name, email, changeHandler }) => {
  return (
    <div>
      <form onSubmit={submitHandler}>
        <p>Form</p>
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={changeHandler}
          value={name}
        />{" "}
        <br />
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={changeHandler}
          value={email}
        />{" "}
        <br />
        <input
          type="number"
          min="0"
          max="100"
          name="age"
          placeholder="age"
          onChange={changeHandler}
          value={age}
        />{" "}
        <br />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default FriendForm;
