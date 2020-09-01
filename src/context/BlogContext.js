import React from "react";
import CreateDataContext from "./CreateDataContext";
import jsonServer from "../api/jsonServer";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "GET_POST":
      return action.payload;
    // case "ADD_POST":
    //   return [
    //     ...state,
    //     {
    //       id: Math.floor(Math.random() * 9999).toString(),
    //       title: action.payload.title,
    //       content: action.payload.content,
    //     },
    //   ];
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

const getBlogPost = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/blogposts");
    dispatch({ type: "GET_POST", payload: response.data });
  };
};
const addBlogPost = (dispatch) => {
  return async (title, content, callBack) => {
    try {
      return async () => {
        await jsonServer.post("/bloglogs", { title, content });
      };
      //await Axios.post("", { title, content });
      // dispatch({
      //   type: "ADD_POST",
      //   payload: { title: title, content: content },
      // });
      if (callBack) {
        callBack();
      }
    } catch (e) {}
  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`);
    dispatch({ type: "DELETE_POST", payload: id });
  };
};

const editBlogPost = (dispatch) => {
  return async (id, title, content, callBack) => {
    await jsonServer.put(`/blogposts/${id}`, { title, content });

    dispatch({ type: "UPDATE_POST", payload: { id, title, content } });
    if (callBack) {
      callBack();
    }
  };
};

export const { Context, Provider } = CreateDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPost },
  []
);
