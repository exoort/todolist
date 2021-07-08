<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { todosStore } from '~/utils/store-accessor';

@Component({
  name: 'DefaultLayout'
})
export default class DefaultLayout extends Vue {
  created(): void {
    todosStore.loadTodos();
  }
}
</script>

<style scoped>

</style>
