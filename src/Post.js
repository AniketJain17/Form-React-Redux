import React from "react";
import { useDispatch } from "react-redux";

const Post = (props) => {
  const dispatch = useDispatch();

  const handleEditClick = () => {
    dispatch({
      type: "EDIT_POST",
      id: props.post.id
    });
  };
  const handleDeleteClick = () => {
    dispatch({
      type: "DELETE_POST",
      id: props.post.id
    });
  };

  return (
    <>
      <button
        style={{ borderRadius: "10px" ,backgroundColor: "#007bff"}}
        onClick={handleEditClick}
      >
        Update
      </button>
      {/* <button
        style={{ borderRadius: "10px", backgroundColor: "red" }}
        onClick={handleDeleteClick}
      >
        Delete
      </button> */}
    </>
  );
};

export default Post;
