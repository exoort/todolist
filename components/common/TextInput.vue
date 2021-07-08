<template>
  <v-text-field
    v-bind="$attrs"
    dense
    clearable
    v-on="$listeners"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  name: 'TextInput',
  inheritAttrs: false
})
export default class TextInput extends Vue {
}
</script>

<style scoped>

</style>
