import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
const FriendCard = ({ item, deletePost, updatePost }) => {
  return (
    <Card>
      <CardImg
        top
        width="100%"
        src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
        alt="Card image cap"
      />
      <CardBody>
        <CardTitle>{item.name}</CardTitle>
        <CardSubtitle>{item.email}</CardSubtitle>
        <CardText>{item.age}</CardText>
        <Button onClick={() => deletePost(item.id)}>delete</Button>
        <Button onClick={() => updatePost(item.id)}>update</Button>
      </CardBody>
    </Card>
  );
};

export default FriendCard;
