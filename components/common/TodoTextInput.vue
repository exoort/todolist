<template>
  <text-input
    v-model="input"
    placeholder="Type text"
    prepend-icon="mdi-delete-outline"
    @click:prepend="remove"
  />
</template>

<script lang="ts">
import { Component, Emit, Prop, VModel, Vue } from 'nuxt-property-decorator';
import TextInput from './TextInput.vue';

@Component({
  name: 'TodoTextInput',
  components: { TextInput }
})
export default class TodoTextInput extends Vue {
  @Prop({ required: true, type: Number })
  readonly inputId!: number;

  @VModel()
  input!: string

  @Emit()
  remove(): number {
    return this.inputId;
  }
}
</script>

<style scoped>

</style>
