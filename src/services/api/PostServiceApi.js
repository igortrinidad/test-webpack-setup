

export default class PostServiceApi {

  static get () {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
  }
  
}