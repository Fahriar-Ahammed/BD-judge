<template>
  <q-page class="flex flex-center">
    <div class="q-gutter-y-md" style="max-width: 1000px; width: 100%">
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
            <q-table
              title="Problems"
              :rows="rows"
              :columns="columns"
              row-key="id"
              :loading="tableLoading"
            >
              <template v-slot:body="props">
                <q-tr @click="viewProblem(props.row)" :props="props">
                  <q-td key="id" :props="props">{{ props.row.id }}</q-td>
                  <q-td key="title" :props="props">{{ props.row.title }}</q-td>
                  <q-td v-if="props.row.category_id === 1" key="level" :props="props">Easy</q-td>
                  <q-td v-if="props.row.category_id === 2" key="level" :props="props">Medium</q-td>
                  <q-td v-if="props.row.category_id === 3" key="level" :props="props">Hard</q-td>

                  <q-td key="score" :props="props">{{ props.row.score}}</q-td>

                </q-tr>
              </template>
            </q-table>
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

import {onMounted, ref} from "vue";
import {api} from "boot/axios";
import {useRouter} from "vue-router/dist/vue-router";

const router = useRouter()
const tab = ref('easy')

const columns = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: row => row.id,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'title', align: 'center', label: 'Title', field: 'title', sortable: true },
  { name: 'level', label: 'Level', field: 'level', sortable: true },
  { name: 'score', label: 'Score', field: 'score' }
]

let rows = []

let tableLoading = ref(false)

function fetchProblem(){
  tableLoading.value = true
  api.get('api/auth/problem/all?token='+localStorage.getItem("token"))
    .then(response => {
      rows = response.data
      tableLoading.value = false
    })
}

onMounted(() => {
  fetchProblem()
})

function viewProblem(row){
  console.log("row  ",row.id)
  router.push({name:'problem-details',params:{id:row.id}})
}

</script>

<style scoped>

</style>
