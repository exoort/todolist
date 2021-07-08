<template>
  <v-textarea
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  name: 'TextArea',
  inheritAttrs: false
})
export default class TextArea extends Vue {
}
</script>

<style scoped>

</style>
