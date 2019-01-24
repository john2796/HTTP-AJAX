import React from "react";
import { InputGroup, InputGroupText, InputGroupAddon, Input } from "reactstrap";

const FriendForm = ({ age, name, email, changeHandler }) => {
  return (
    <div>
      <form>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>name</InputGroupText>
          </InputGroupAddon>
          <Input
            type="text"
            name="name"
            onChange={changeHandler}
            value={name}
          />
        </InputGroup>
        <br />
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>email</InputGroupText>
          </InputGroupAddon>
          <Input
            type="text"
            name="email"
            onChange={changeHandler}
            value={email}
          />
        </InputGroup>
        <br />
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>age</InputGroupText>
          </InputGroupAddon>
          <Input
            type="number"
            min="0"
            max="100"
            name="age"
            onChange={changeHandler}
            value={age}
          />
        </InputGroup>
        <br />
      </form>
    </div>
  );
};

export default FriendForm;
