<template>
  <q-page class="flex flex-center">
    <profile-info v-if="!isLoading" :userData="userData" :userId="id"/>
  </q-page>
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";
import {onMounted} from "vue";
import { ref } from 'vue'
import ProfileInfo from "components/ProfileInfo";

export default {
  name: 'Profile',
  components: {
    ProfileInfo
  },

  setup() {

    const store = useStore()

    const id = JSON.parse(atob(localStorage.getItem("token").split(".")[1])).id

    const getUserData = () => store.dispatch('user/getUserData', id)

    const isLoading = ref(true)

    onMounted(() => {
      getUserData()
      .then(() => {
        isLoading.value = false
      })
    })

    return {
      userData: computed(() => store.getters["user/USER_DATA"]),
      id,
      isLoading
    }
  },
}
</script>
