import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
const Friend = ({ item }) => {
  return (
    <React.Fragment>
      <Card style={{ maxWidth: "300px", margin: "20px" }}>
        <Link to={`/friend/${item.id}`} key={item.id}>
          <CardImg
            top
            width="100%"
            src={
              !item
                ? "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                : item.src
            }
            alt="Card image cap"
          />
        </Link>
        <CardBody>
          <CardTitle>{item.name}</CardTitle>
          <CardSubtitle>{item.email}</CardSubtitle>
          <CardText>{item.age}</CardText>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Friend;
