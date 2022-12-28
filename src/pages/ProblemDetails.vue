<template>
  <q-page class="flex flex-center">
    <div class="q-gutter-y-md q-pa-md">

      <div class="row">
        <div class="col-sm">
          <q-card>
            <q-card-section>
              <h5>{{ problem.title }}</h5>
              <p v-html="problem.description"></p>
            </q-card-section>
          </q-card>

        </div>
        <div class="col-sm">
          <q-card>
            <q-select outlined dense options-dense v-model="language" :options="options" option-label="name"
                      option-value="value" label="Language" @update:model-value="languageChange()"
                      style="max-width: 200px"/>
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
import {onMounted, reactive, ref, shallowRef} from "vue";
import {api} from "boot/axios";
import {useRoute} from "vue-router/dist/vue-router";
import {javascript} from '@codemirror/lang-javascript'
import {java} from '@codemirror/lang-java'
import {cpp} from '@codemirror/lang-cpp'
import {python} from '@codemirror/lang-python'
import {oneDark} from '@codemirror/theme-one-dark'
import axios from "axios";
import {useQuasar} from 'quasar'


const problem = ref({})
const route = useRoute();
/*let id = route.params.id*/

let testCases = ref([])



let tableLoading = ref(false)

function fetchProblem(id) {
  tableLoading.value = true
  api.get('api/auth/problem/view/' + id + '?token=' + localStorage.getItem("token"))
    .then(response => {
      console.log(response.data)
      problem.value = response.data
      testCases = response.data.test_cases
      tableLoading.value = false
    })
}

let code = ref()
//const options = ['C', 'Cpp', 'Java', 'Javascript', 'Python']
const options = [
  {name: 'C', value: '1'},
  {name: 'Cpp', value: '2'},
  {name: 'Java', value: '4'},
  /*{name:'Javascript',value:'63'},*/
  {name: 'Python', value: '10'},
]
let language = ref({
  name: '',
  value: ''
})
let extensions = ref()
let handleReady = ref()

let submissionTokens

function submit() {
  // using forEach
  for(let i=0; i<testCases.length ; i++){
    getSubmissionTokens(testCases[i])
  }

  this.delay(2000).then(() => {
    /*submissionTokens.forEach(submissionResult)*/
    for(let i=0; i<submissionTokens.length ; i++){
      submissionResult(submissionTokens[i],i)
    }
  })
}

async function getSubmissionTokens(item) {
  console.log(item.input);
  submissionTokens = []
  await axios.post('http://localhost:2358/submissions', {
    source_code: code.value,
    language_id: language.value.value,
    stdin: item.input,
  }).then(function (response) {
    submissionTokens.push(response.data.token)
  }).catch(function (error) {
    console.log(error);
  });
}

async function submissionResult(token,i) {
  /*console.log(token.token)*/
  await axios.get('http://localhost:2358/submissions/' + token)
    .then(function (response) {
      console.log(response.data.stdout);
      if (response.data.stdout === testCases[i].output){
        console.log(" array value match  "+response.data.stdout)
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function languageChange() {
  console.log("###   ", language.value.name)

  if (language.value.name === 'Java') {
    extensions.value = [java(), oneDark]
    code = ref(`import java.io.IOException;

public class Main {

    public static void main(String[] args) throws IOException {

    }

}`)
  } else if (language.value.name === 'Javascript') {
    extensions.value = [javascript(), oneDark]
    code = ref(`console.log('Hello, world!')`)
  } else if (language.value.name === 'Python') {
    extensions.value = [python(), oneDark]
    code = ref(`print('Hello, world!')`)
  } else if (language.value.name === 'C') {
    extensions.value = [cpp(), oneDark]
    code = ref(`#include <stdio.h>

int main()
{

    return 0;
}`)
  } else if (language.value.name === 'Cpp') {
    extensions.value = [cpp(), oneDark]
    code = ref(`#include <iostream>

using namespace std;

int main() {

}`)
  } else {
    language.value.name = 'C'
    extensions.value = [cpp(), oneDark]
    code = ref(`#include <stdio.h>

int main()
{

    return 0;
}`)
  }


  // Codemirror EditorView instance ref
  const view = shallowRef()
  handleReady.value = (payload) => {
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


onMounted(() => {
  let id = route.params.id
  fetchProblem(id)
  languageChange()
})


</script>

<style scoped>

</style>
