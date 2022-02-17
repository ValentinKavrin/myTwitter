export const setTasksList = (state, posts) => {
  state.postsList = posts;
}

export const addPost = (state, post) => {
  state.postsList.push(post)
}
