<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            lg5
            md8
            sm12
            xs12
          >
            <nuxt />
          </v-flex>
        </v-layout>
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
  async created(): Promise<void> {
    await todosStore.loadTodos();
  }
}
</script>

<style scoped>

</style>
