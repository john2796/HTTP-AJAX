import React from "react";
import FriendCard from "./FriendCard";

const FriendsLists = ({ data, deletePost, updatePost }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        margin: "0 auto",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {data.map(item => {
        return (
          <div key={item.id}>
            <FriendCard
              item={item}
              deletePost={deletePost}
              updatePost={updatePost}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FriendsLists;
