<template>
  <div class="q-pa-md" style="width: 500px">
    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      animated
    >
      <q-step
        :name="1"
        title="Registration"
        icon="settings"
        :done="step > 1"
      >
        <q-form>
          <q-input
            filled
            v-model="login"
            label="Login"
            lazy-rules
            :rules="[ val => val && val.length > 2 || 'Login should be 3 symbols at least']"
          />
          <q-input
            filled
            type="password"
            v-model="password"
            label="Password"
            hint="8 symbol at least, 1 number"
            lazy-rules
            :rules="[ val => passwordRegEx.test(val) || 'Type valid password']"
          />
          <p class="q-pt-md text-body1">
            <span>Already a member?</span>
            <span class="text-primary text-weight-bold" style="cursor: pointer" @click="$emit('goToLogin')"> Sign in</span>
          </p>
        </q-form>
      </q-step>

      <q-step
        :name="2"
        title="One last step"
        icon="password"
        :done="step > 2"
      >
        <q-form>
          <q-input
            filled
            v-model="firstName"
            label="Your first name"
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || 'Please type your name',
            ]"
          />

          <q-input
            filled
            v-model="lastName"
            label="Your last name"
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || 'Please type your name',
            ]"
          />
        </q-form>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn @click="handleNextPage" type="submit" color="primary" :disable="!isValid" :label="step === 2 ? 'Start' : 'Next'"/>
          <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm"/>
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<script>
import {ref} from 'vue'
import {useQuasar} from "quasar";
import { api } from 'boot/axios'

export default {
  setup() {

    const $q = useQuasar()


    const login = ref(null)
    const firstName = ref(null)
    const lastName = ref(null)
    const password = ref(null)

    return {
      step: ref(1),
      login,
      firstName,
      lastName,
      password,



      showErrorNotify() {
        $q.notify({
          color: 'red-5',
          textColor: 'white',
          position: 'top',
          icon: 'warning',
          message: 'Incorrect login data'
        })
      },

      showSuccessNotify() {
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          position: 'top',
          icon: 'cloud_done',
          message: 'Signed up successfully'
        })
      }
    }
  },
  data() {
    return {
      passwordRegEx: new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{8,})")
    }
  },
  computed: {
    isValid() {
      if (this.step == 1) {
        return this.login !== null && this.login.trim().length > 2 && this.passwordRegEx.test(this.password);
      } else {
        return this.firstName !== null && this.firstName !== ""  && this.lastName !== null && this.lastName !== ""
      }
    }
  },
  methods: {
    handleNextPage() {
      if (this.step == 1) {
        this.$refs.stepper.next()
      } else {
        api.post('/auth/registration', {
          userName: this.login,
          name: this.firstName,
          surname: this.lastName,
          password: this.password
        })
          .then((response) => {
            if (response.status === 201) {
              this.$emit('goToLogin')
              this.showSuccessNotify()
            }
          })
          .catch(() => {
            this.showErrorNotify()
          })
      }
      }
    },

}
</script>

