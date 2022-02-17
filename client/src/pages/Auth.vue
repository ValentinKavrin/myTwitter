<template>
  <q-page class="flex flex-center">
    <registration v-if="currentForm === 1" @goToLogin="setCurrentForm(2)"></registration>
    <login v-else-if="currentForm === 2" @goToRegistration="setCurrentForm(1)"></login>
  </q-page>
</template>
<script>
import { ref } from 'vue'
import Registration from "components/Registrarion";
import Login from "components/Login";

export default {
  setup () {
    return {
      model: ref(null)
    }
  },
  components: {
    Registration,
    Login
  },
  data() {
    return {
      currentForm: 1
      // 1 - registration
      // 2 - login
    }
  },
  methods: {
    setCurrentForm(formId) {
      this.currentForm = formId
    }
  }
}
</script>
