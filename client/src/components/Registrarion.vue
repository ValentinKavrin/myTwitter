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




      onSubmit() {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
      },
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
        console.log(this.login)
      }
    },
  }

}
</script>

