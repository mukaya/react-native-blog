import React from "react";
import CreateDataContext from "./CreateDataContext";
import Axios from "axios";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "ADD_POST":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 9999).toString(),
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
    case "DELETE_POST":
      return state.filter((blogPost) => blogPost.id !== action.payload);

    case "UPDATE_POST":
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    default:
      return state;
  }
};
const addBlogPost = (dispatch) => {
  return async (title, content, callBack) => {
    try {
      //await Axios.post("", { title, content });
      dispatch({
        type: "ADD_POST",
        payload: { title: title, content: content },
      });
      if (callBack) {
        callBack();
      }
    } catch (e) {}
  };
};

const deleteBlogPost = (dispatch) => {
  return (id) => {
    dispatch({ type: "DELETE_POST", payload: id });
  };
};

const editBlogPost = (dispatch) => {
  return (id, title, content, callBack) => {
    dispatch({ type: "UPDATE_POST", payload: { id, title, content } });
    if (callBack) {
      callBack();
    }
  };
};

export const { Context, Provider } = CreateDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost },
  []
);
