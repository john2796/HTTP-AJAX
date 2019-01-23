import React from "react";
import Friend from "./Friend";

const FriendsLists = ({ data, deletePost, updatePost }) => {
  return (
    <div>
      {data.map(item => {
        return (
          <Friend
            item={item}
            key={item.id}
            deletePost={deletePost}
            updatePost={updatePost}
          />
        );
      })}
    </div>
  );
};

export default FriendsLists;
