<template>
  <q-page class="flex flex-center">
    <div class="q-gutter-y-md q-pa-md">

        <div class="row">
          <div class="col">
            <q-card>
              <q-card-section>
                <h5>{{problem.title}}</h5>
                <p v-html="problem.description"></p>
              </q-card-section>
            </q-card>

          </div>
          <div class="col">
            <q-card>
              <q-select outlined v-model="language" :options="options" label="Language" @update:model-value="languageChange()"
                        style="max-width: 300px"/>
              <br/>
              <codemirror
                v-model="code"
                placeholder="Code goes here..."
                :style="{ height: '400px' }"
                :autofocus="true"
                :indent-with-tab="true"
                :tab-size="2"
                :extensions="extensions"
                @ready="handleReady"
              />

              <q-btn color="secondary" v-on:click="submit()">Submit</q-btn>
            </q-card>
          </div>
        </div>

    </div>
  </q-page>
</template>

<script setup>
import {Codemirror} from 'vue-codemirror'
import { onMounted, ref,shallowRef} from "vue";
import {api} from "boot/axios";
import {useRoute} from "vue-router/dist/vue-router";
import {javascript} from '@codemirror/lang-javascript'
import {java} from '@codemirror/lang-java'
import {oneDark} from '@codemirror/theme-one-dark'
import axios from "axios";


const problem = ref({})
const route = useRoute();
/*let id = route.params.id*/


let tableLoading = ref(false)
function fetchProblem(id) {
  tableLoading.value = true
  api.get('api/auth/problem/view/'+id+'?token='+localStorage.getItem("token"))
    .then(response => {
      // console.log(response.data)
      problem.value = response.data
      tableLoading.value = false
    })
}




const code= ref()
const options = ['C', 'Cpp', 'Java', 'Javascript', 'Python']
let language = ref()
let extensions = ref()
let handleReady= ref()

async function submit() {
  let self = this
  await axios.post('http://localhost:2358/submissions', {
    source_code: self.code,
    language_id: '1',
    stdin: 'Good',
  })
    .then(function (response) {
      console.log(response.data.token);
      self.delay(2000).then(() => {
        self.submissionResult(response.data.token);
      })

    })
    .catch(function (error) {
      console.log(error);
    });
}
async function submissionResult(token) {
  await axios.get('http://localhost:2358/submissions/' + token)
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
function languageChange() {
  console.log("###   " + this.language)

  if (this.language === 'Java') {
    this.extensions = [java(), oneDark]
  } else if (this.language === 'Javascript') {
    this.extensions = [javascript(), oneDark]
  } else {
    this.extensions = [javascript()]
  }

  this.code = ref(`console.log('Hello, world!')`)

  // Codemirror EditorView instance ref
  const view = shallowRef()
  this.handleReady = (payload) => {
    view.value = payload.view
  }

  // Status is available at all times via Codemirror EditorView
  const getCodemirrorStates = () => {
    const state = view.value.state
    const ranges = state.selection.ranges
    const selected = ranges.reduce((r, range) => r + range.to - range.from, 0)
    const cursor = ranges[0].anchor
    const length = state.doc.length
    const lines = state.doc.lines
    // more state info ...
    // return ...
  }
}

onMounted(() =>{
  let id = route.params.id
  fetchProblem(id)
})


</script>

<style scoped>

</style>
