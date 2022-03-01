<template>
  <div class="q-pa-md" style="width: 500px">
    <q-card>
      <q-card-section>
        <h6 class="q-ma-none text-primary text-weight-bold">Login</h6>
        <q-separator class="q-my-lg"/>
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >
          <q-input
            class="q-pt-md"
            filled
            v-model="login"
            label="Your login"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Enter your login']"
          />

          <q-input
            filled
            type="password"
            v-model="password"
            label="Password"
            lazy-rules
            :rules="[ val => val !== null  && val.length > 0 || 'Enter your password']"
          />
          <p class="q-pt-md text-body1">
            <span>Don't have an account?</span>
            <span class="text-primary text-weight-bold" style="cursor: pointer" @click="$emit('goToRegistration')"> Sign up</span>
          </p>
          <div>
            <q-btn label="Login" type="submit" :disable="!isValid" color="primary"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import {useQuasar} from 'quasar'
import {useRoute, useRouter} from 'vue-router'
import {ref} from 'vue'
import {api} from 'boot/axios'

export default {
  setup() {
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    const login = ref(null)
    const password = ref(null)

    return {
      login,
      password,

      onSubmit() {
        if (login.value && login.value.trim().length !== 0 && password.value && password.value.trim().length !== 0) {
          api.post(`/auth/login`, {userName: login.value, password: password.value})
            .then(response => {
              if (response.status === 200) {
                localStorage.setItem('token', response.data.token)
                console.log(localStorage.getItem('token'))
                const toPath = route.query.to || '/feeds'
                router.push(toPath)
                $q.notify({
                  color: 'green-4',
                  textColor: 'white',
                  position: 'top',
                  icon: 'cloud_done',
                  message: `Welcome, ${login.value}`
                })
              }
            })
            .catch((err) => {
              if (err.response && err.response.status === 400) {
                $q.notify({
                  color: 'red-5',
                  textColor: 'white',
                  position: 'top',
                  icon: 'warning',
                  message: 'Incorrect login data'
                })
              } else {
                $q.notify({
                  color: 'red-5',
                  textColor: 'white',
                  position: 'top',
                  icon: 'warning',
                  message: 'Something went wrong...'
                })
              }
            })
        }
      }
    }
  },
  computed: {
    isValid() {
      return this.login !== null && this.login.trim().length !== 0 && this.password !== null && this.password.trim().length !== 0
    }
  },
}
</script>
