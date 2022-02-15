<template>
  <q-page class="flex flex-center">
    <login></login>
  </q-page>
</template>
<script>
import { ref } from 'vue'
import Login from "components/Registrarion";

export default {
  setup () {
    return {
      model: ref(null)
    }
  },
  components: {
    Login
  }
}
</script>
