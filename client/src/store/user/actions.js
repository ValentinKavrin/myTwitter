import {api} from "boot/axios";
import router from '../../router/index'

export const getUserData = async ({commit}, userId) => {
  await api.get(`/api/user/${userId}`)
    .then(response => {
      if (response.status === 200) {
        commit('setUserData', response.data)
      }
    })
    .catch(error => {
      if (error.response.status === 403) {
        router.push({path: '/auth'})
      }
    })
}

export const updateUserData = async ({commit}, payload) => {
  await api.put(`/api/user`, payload)
    .then(response => {
      if (response.status === 201) {
        commit('setUserData', payload)
      }
    })
    .catch(error => {
      if (error.response.status === 403) {
        router.push({path: '/auth'})
      }
    })
}

export const deleteUserData = ({commit}) => {
  localStorage.removeItem('token')
  commit('setUserData', {})
}

export const deleteUser = async ({dispatch}) => {
  await api.delete(`/api/user`)
  dispatch('deleteUserData')
}



