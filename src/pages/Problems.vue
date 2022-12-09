<template>
  <q-page class="flex flex-center">
    <div class="q-gutter-y-md" style="max-width: 600px; width: 100%">

      <q-card>
        <q-tabs
          v-model="tab"
          class="bg-grey-3 text-grey-7"
          active-color="primary"
          indicator-color="purple"
          align="justify"
        >
          <q-tab name="easy" label="Easy"/>
          <q-tab name="medium" label="Medium"/>
          <q-tab name="hard" label="Hard"/>
        </q-tabs>

        <q-tab-panels v-model="tab" animated class="bg-white">
          <q-tab-panel name="easy">

          </q-tab-panel>
          <q-tab-panel name="medium">

          </q-tab-panel>
          <q-tab-panel name="hard">

          </q-tab-panel>

        </q-tab-panels>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>

import {ref} from "vue";

const tab = ref('signIn')

</script>

<style scoped>

</style>
