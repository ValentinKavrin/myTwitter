<template>
  <q-card class="q-ma-xl q-py-lg" style="width: 700px; height: 100%">
    <q-card-section>
      <h4 class="q-ma-none text-bold">Profile</h4>
      <p class="text-subtitle1 text-grey-8">Click on field to edit</p>
    </q-card-section>
    <q-card-section style="width: 60%">
      <q-field borderless class="text-h6" label="Login" stack-label>
        <template v-slot:control>
          <div class="self-center full-width no-outline text-h6" tabindex="0">
            {{ username }}
          </div>
        </template>
      </q-field>
    </q-card-section>
    <q-card-section style="width: 60%">
      <q-field label="First Name" stack-label>
        <template v-slot:control>
          <div class="self-center full-width no-outline text-h6" tabindex="0">
            {{ name }}
            <q-popup-edit class="profile__input" v-model="name" auto-save v-slot="scope" fit>
              <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
            </q-popup-edit>
          </div>
        </template>
      </q-field>
    </q-card-section>
    <q-card-section style="width: 60%;">
      <q-field label="Last Name" stack-label>
        <template v-slot:control>
          <div class="self-center full-width no-outline text-h6" tabindex="0">
            {{ surname }}
            <q-popup-edit class="profile__input" v-model="surname" auto-save v-slot="scope">
              <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
            </q-popup-edit>
          </div>
        </template>
      </q-field>
    </q-card-section>
    <q-card-actions class="q-mt-md">
      <q-btn @click="logOut" label="Log out" icon="logout" class="q-mr-auto q-ml-sm"/>
      <q-btn @click="handleDeleteUser" label="Delete account" class="q-ml-auto q-mr-md" color="negative" padding="sm lg" />
      <q-btn @click="onSubmit" class="q-ml-auto q-mr-md" label="Save" color="primary" padding="sm lg" :disable="!isChanged"/>
    </q-card-actions>
  </q-card>
</template>

<script>
import {useStore} from "vuex";
import {computed, toRefs} from "vue";
import {ref} from 'vue'
import {useRouter} from "vue-router";

export default {
  name: "ProfileInfo",
  props: ["userData"],
  setup(props) {
    const store = useStore()
    const router = useRouter()

    const username = ref(props.userData.username)
    const name = ref(props.userData.name)
    const surname = ref(props.userData.surname)

    const updateUserData = (data) => store.dispatch('user/updateUserData', data)
    const resetUserData = () => store.dispatch('user/deleteUserData')
    const deleteUser = () => store.dispatch('user/deleteUser')

    const isChanged = computed(() =>name.value !== props.userData.name || surname.value !== props.userData.surname)

    return {
      username,
      name,
      surname,
      isChanged,

      onSubmit() {
        if (name.value.trim() !== "" && surname.value.trim() !== "") {
          updateUserData({name: name.value, surname: surname.value})
        }
      },
      logOut() {
        resetUserData()
        router.push('/')
      },
      handleDeleteUser() {
        deleteUser()
        .then(() => {
          router.push('/')
        })
      }
    }



  },
}
</script>

<style>
.profile__input input {
  font-size: 20px !important;
}
</style>
