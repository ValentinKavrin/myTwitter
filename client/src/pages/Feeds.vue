<template>
  <q-page>
    <div class="q-mx-auto q-my-md column align-end" style="width: 1000px; flex: 1">
      <posts-creation-modal />
      <posts-list :postsList="postsList"/>
    </div>
  </q-page>
</template>

<script>
import {computed, defineComponent} from "vue";
import {onMounted} from "vue";
import { useStore } from 'vuex'
import PostsList from "components/PostsList";
import PostsCreationModal from "components/PostsCreationModal";



export default defineComponent({
  name: "PageIndex",
  components: {
    PostsList,
    PostsCreationModal
  },

  setup() {

    const store = useStore()

    const getTasks = () => store.dispatch('feeds/getAllPosts')



    onMounted(() => {
        getTasks()
    })

    return {
      postsList: computed(() => store.getters["feeds/POSTS_LIST"])
    }
  }
});
</script>
