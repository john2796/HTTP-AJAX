import React from "react";
import { Link } from "react-router-dom";
import FriendCard from "./FriendCard";

const FriendsLists = ({ data }) => {
  return (
    <div>
      {data.map(item => {
        return (
          <Link to={`/friend/${item.id}`} key={item.id}>
            <FriendCard item={item} />
          </Link>
        );
      })}
    </div>
  );
};

export default FriendsLists;
