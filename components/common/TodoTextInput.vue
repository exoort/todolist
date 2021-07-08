<template>
  <text-area
    v-model="input"
    placeholder="Type text"
    prepend-icon="mdi-delete-outline"
    auto-grow
    clearable
    rows="1"
    @click:prepend="remove"
  />
</template>

<script lang="ts">
import { Component, Emit, Prop, VModel, Vue } from 'nuxt-property-decorator';
import TextArea from '~/components/common/TextArea.vue';

@Component({
  name: 'TodoTextInput',
  components: {
    TextArea
  }
})
export default class TodoTextInput extends Vue {
  @Prop({
    required: true,
    type: Number
  })
  readonly inputId!: number

  @VModel()
  input!: string

  @Emit()
  remove (): number {
    return this.inputId;
  }
}
</script>

<style scoped>

</style>
