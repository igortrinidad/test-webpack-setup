
export const populateList = (element, posts, childElementTag = 'li') => {
  const fragment = document.createDocumentFragment()
  posts.forEach(post => {
    const childElement = document.createElement(childElementTag)
    childElement.textContent = post.title
    fragment.appendChild(childElement)
  })
  element.appendChild(fragment)
}