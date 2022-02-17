<template>
  <q-btn class="q-ml-auto q-mr-lg" color="secondary" @click="dialogRef.show()">New post</q-btn>
  <q-dialog ref="dialogRef" @hide="onDialogHide" :no-backdrop-dismiss="true">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-h6">New post</div>
      </q-card-section>
      <q-card-section>
        <q-form
          class="q-gutter-md"
        >
          <q-input
            class="q-pt-md"
            filled
            v-model="title"
            label="Title"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Title is required']"
          />

          <q-input
            filled
            type="textarea"
            v-model="content"
            label="Description"
            lazy-rules
            :rules="[ val => val !== null  && val.length > 0 || 'Description is required']"
          />
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" label="Publish" @click="onOKClick" />
        <q-btn color="negative" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from 'quasar'
import { useQuasar } from 'quasar'
import {ref} from 'vue'
import { useStore} from 'vuex'

export default {
  name: "PostsCreationModal",

  emits: [
    ...useDialogPluginComponent.emits
  ],

  setup () {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    const $q = useQuasar()
    const title = ref(null)
    const content = ref(null)
    const store = useStore()

    const sendTaskData = (payload) => store.dispatch('feeds/addNewPost', payload)

    return {
      title,
      content,
      dialogRef,
      onDialogHide,

      async onOKClick () {
        try {
          await sendTaskData({title: title.value, content: content.value})
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            position: 'top',
            icon: 'cloud_done',
            message: `Post created`
          })
          onDialogOK()
        } catch (err) {
          if (err.response.status === 401) {
            $q.notify({
              color: 'red-5',
              textColor: 'white',
              position: 'top',
              icon: 'warning',
              message: 'You need to log in'
            })
          } else {
            $q.notify({
              color: 'red-5',
              textColor: 'white',
              position: 'top',
              icon: 'warning',
              message: 'Something went wrong'
            })
          }

        }
        onDialogOK()
      },

      onCancelClick: onDialogCancel
    }
  }
}
</script>

<style scoped>

</style>
