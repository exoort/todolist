<template>
  <div>
    {{ content }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component({
  name: 'TextTodoCardContent'
})
export default class TextTodoCardContent extends Vue {
  @Prop({
    required: true,
    type: String,
  })
  readonly content!: string
}
</script>

<style scoped>

</style>
