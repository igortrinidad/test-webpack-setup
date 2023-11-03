import { populateList } from "./populateList";
export const loadPosts = () => {

  const postsList = document.querySelector('#posts-list');

  if (!postsList) throw new Error('Posts list not found');

  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => {
      populateList(postsList, json, 'li')
    })

}