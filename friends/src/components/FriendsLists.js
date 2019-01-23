import React from "react";
import { Link } from "react-router-dom";
import FriendCard from "./FriendCard";

const FriendsLists = ({ data, deletePost, updatePost }) => {
  return (
    <div>
      {data.map(item => {
        return (
          <Link to={`/friend/${item.id}`}>
            <FriendCard
              item={item}
              key={item.id}
              deletePost={deletePost}
              updatePost={updatePost}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default FriendsLists;
