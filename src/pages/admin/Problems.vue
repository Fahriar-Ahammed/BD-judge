<template>
  <div id="q-app">
    <div class="q-pa-sm q-gutter-sm">
      <q-table
        title="Treats"
        :rows="rows"
        :columns="columns"
        row-key="id"
        :loading="tableLoading"
      >
        <template v-slot:top>
          <q-btn flat outline dense color="primary" label="Add row" @click="showDialog = true" ></q-btn>

          <div class="q-pa-sm q-gutter-sm">
            <q-dialog v-model="showDialog">
              <q-card style="width: 800px;max-width: 1000px">
                <q-card-section>
                  <div class="text-h6">Add new Problem</div>
                </q-card-section>

                <q-card-section>
                  <div>
                    <q-select
                      class="q-ma-sm"
                      outlined
                      v-model="editedItem.category_id"
                      :options="categoryOption"
                      emit-value
                      label="Complexity Type" />
                    <q-input outlined class="q-ma-sm" v-model="editedItem.title" label="title"></q-input>
                    <div class="q-ma-sm">
                      <label>Problem Description</label>
                      <q-editor  v-model="editedItem.description" label="description"></q-editor>
                    </div>
                     <q-input outlined class="q-ma-sm" v-model="editedItem.sample_input" label="sample input"></q-input>
                    <q-input outlined class="q-ma-sm" v-model="editedItem.sample_output" label="sample output"></q-input>
                    <q-input outlined class="q-ma-sm" v-model="editedItem.score" label="score"></q-input>
                  </div>
                </q-card-section>

                <div v-if="loading">
                  <q-linear-progress  indeterminate color="secondary" class="q-mt-sm"/>
                  <br/>
                </div>

                <q-card-actions align="right">
                  <q-btn flat label="Create" color="primary"  @click="addProblem" ></q-btn>
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>

        </template>

        <template v-slot:body="props">
          <q-tr :props="props">  <!--@click="viewProblem(props.row)"-->
            <q-td key="id" :props="props">{{ props.row.id }}</q-td>
            <q-td key="title" :props="props">{{ props.row.title }}</q-td>
            <q-td v-if="props.row.category_id === 1" key="level" :props="props">Easy</q-td>
            <q-td v-if="props.row.category_id === 2" key="level" :props="props">Medium</q-td>
            <q-td v-if="props.row.category_id === 3" key="level" :props="props">Hard</q-td>

            <q-td key="score" :props="props">{{ props.row.score}}</q-td>

            <q-td key="actions" :props="props">
              <q-btn  color="blue" class="glossy q-mr-sm" push round icon="edit"  @click="editItem(props.row)" size=sm></q-btn>
              <q-btn color="red" class="glossy q-mr-sm" push round icon="delete"  @click="deleteItem(props.row)" size=sm></q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>


    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import {api} from "boot/axios";

let editedItem = reactive({
  category_id: "",
  title: "",
  description: "",
  sample_input: "",
  sample_output: "",
  score: 0,
})

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
  { name: 'score', label: 'Score', field: 'score' },
  { name: 'actions', label: 'Actions', field: 'actions' }
]

let rows = []

const categoryOption = [
  {label:'Easy',value:1},
  {label:'Medium',value:2},
  {label:'Hard',value:3},
]

let showDialog = ref(false)

let loading = ref(false)
let tableLoading = ref(false)

function fetchProblems(){
  tableLoading.value = true
  api.get('api/auth/problems/all?token='+localStorage.getItem("token"))
    .then(response => {
      rows = response.data
      tableLoading.value = false
    })
}

onMounted(() => {
  fetchProblems()
})

function addProblem(){
  loading.value = true
  api.post('api/auth/problems/create?token='+localStorage.getItem("token"),editedItem)
    .then(response => {
      fetchProblems()
      loading.value = false
      showDialog.value = false
    })
}

function deleteItem(item) {
  const index = this.data.indexOf(item);
  confirm("Are you sure you want to delete this item?") &&
  this.data.splice(index, 1);
}

function editItem(item) {
  editedItem = Object.assign({}, item);
  showDialog.value = true
}



</script>

<style scoped>

</style>
