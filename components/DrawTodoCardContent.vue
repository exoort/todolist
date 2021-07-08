<template>
  <div>
    <img
      :src="content"
      alt=""
      class="draw-image"
    >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component({
  name: 'DrawTodoCardContent'
})
export default class DrawTodoCardContent extends Vue {
  @Prop({
    required: true,
    type: String
  })
  readonly content!: string
}
</script>

<style scoped>
.draw-image {
  width:100%;
  max-width: 500px;
}
</style>
