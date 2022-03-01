<template>
  <div class="posts__grid">
    <q-card
      class="posts__card"
      v-for="post in postsList"
      :key="post.id_post"
      style="height: 400px; overflow: hidden;"
    >
      <q-card-section>
        <h4 class="q-my-none">{{ post.title }}</h4>
      </q-card-section>
      <q-card-section style="height: 144px">
        <p class="text-body1 posts__description">{{ post.content }}</p>
      </q-card-section>
      <q-separator />
      <q-card-actions class="column">
        <div class="row wrap text-grey-7" style="width: 50%">
          <q-icon class="q-mr-sm" name="mode_edit" size="1.2rem"/>
          <p class="text-body1 q-mb-none posts__description" style="flex: 1">{{ post.name + ' ' + post.surname[0].toUpperCase() + '.' }}</p>
        </div>
        <div class="row wrap text-grey-7" style="width: 50%">
          <q-icon class="q-mr-sm" name="today" size="1.2rem"/>
          <p class="text-body1 q-mb-none posts__description" style="flex: 1">{{ post.date }}</p>
        </div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'PostsList',
  props: ['postsList'],

  setup () {
    return {}
  }
}
</script>

<style lang="scss">
.posts__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  box-sizing: border-box;
  padding: 24px;
}

.posts__description {
  width: 100%;
  -webkit-line-clamp: 4; /* Число отображаемых строк */
  display: -webkit-box; /* Включаем флексбоксы */
  -webkit-box-orient: vertical; /* Вертикальная ориентация */
  overflow: hidden; /* Обрезаем всё за пределами блока */

}
</style>

