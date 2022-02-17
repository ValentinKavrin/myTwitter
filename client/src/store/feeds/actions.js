import {api} from 'boot/axios'
import router from '../../router/index'


export const getAllPosts = async ({commit, dispatch, getters}) => {
  await api.get(`/api/posts`)
    .then(response => {
      if (response.status === 200) {
        commit('setTasksList', response.data)
      }
    })
    .catch(error => {
      if (error.response.status === 403) {
        router.push({path: '/auth'})
      }
    })
}

export const addNewPost = async ({commit}, payload) => {
  console.log(payload)
  await api.post(`/api/post`, payload)
    .then(response => {
      if (response.status === 201) {
        commit('addPost', payload)
      }
    })
    .catch(error => {
      if (error.response.status === 403) {
        router.push({path: '/auth'})
      }
    })
}


