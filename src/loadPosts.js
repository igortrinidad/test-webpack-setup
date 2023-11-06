import { populateList } from "./populateList";
import PostServiceApi from './services/api/PostServiceApi';

export const loadPosts = () => {

  const postsList = document.querySelector('#posts-list');

  if (!postsList) throw new Error('Posts list not found');

  PostServiceApi.get()
    .then(json => {
      populateList(postsList, json, 'li')
  });
}