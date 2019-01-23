import React from "react";

const Friend = ({ item, deletePost, updatePost }) => {
  return (
    <li key={item.id}>
      <p>{item.name}</p>
      <p>{item.email}</p>
      <p>{item.age}</p>
      <button onClick={() => deletePost(item.id)}>delete</button>
      <button onClick={() => updatePost(item.id)}>update</button>
    </li>
  );
};

export default Friend;
