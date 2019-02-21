import React from "react";
import FriendForm from "./FriendForm";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert
} from "reactstrap";
const ModalComponent = ({
  age,
  name,
  email,
  isOpen,
  toggle,
  submitHandler,
  changeHandler,
  updateBtnClicked,
  className,
  errors
}) => {
  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Form</ModalHeader>
        <ModalBody>
          <FriendForm
            changeHandler={changeHandler}
            age={age}
            name={name}
            email={email}
          />
          {errors && <h3>{errors.message}</h3>}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={submitHandler}>
            {updateBtnClicked ? "Save" : "AddPost"}
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalComponent;
