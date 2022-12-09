<template>
  <q-page class="flex flex-center">
    <div class="q-gutter-y-md" style="max-width: 600px; width: 100%">
      <q-card>
        <div class="row">
          <div class="col">
            <h5>{{}}</h5>
          </div>
          <div class="col">

          </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>

import {computed, onMounted, ref} from "vue";
import {api} from "boot/axios";
import {useRoute} from "vue-router/dist/vue-router";

const problem = ref()
const route = useRoute();
/*let id = route.params.id*/
const id = computed(() => route.params.id);
console.log("id  === "+id,route.params)
let tableLoading = ref(false)
function fetchProblem() {
  tableLoading.value = true

  api.get('api/auth/problem/view/'+id+'?token='+localStorage.getItem("token"))
    .then(response => {
      problem.value = response.data
      tableLoading.value = false
    })
}

onMounted(() =>{
  fetchProblem()
})

</script>

<style scoped>

</style>
