<template>
  <q-page>
    <q-card style="margin: 5px">
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

  </q-page>
</template>

<script>
import {defineComponent, ref, shallowRef} from 'vue'
import {Codemirror} from 'vue-codemirror'
import {javascript} from '@codemirror/lang-javascript'
import {java} from '@codemirror/lang-java'
import {oneDark} from '@codemirror/theme-one-dark'
import axios from "axios";

export default defineComponent({
  components: {
    Codemirror
  },
  setup() {

  },
  data() {
    return {
      code: '',
      options: [
        'C', 'Cpp', 'Java', 'Javascript', 'Python'
      ],
      language: '',
      extensions: '',
      handleReady: ''
    }
  },
  created() {
    this.languageChange()
  },
  methods: {
    async submit() {
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
    },
    async submissionResult(token) {
      await axios.get('http://localhost:2358/submissions/' + token)
        .then(function (response) {
          // handle success
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },

    delay(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    },
    languageChange() {
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
  }
})
</script>

<style scoped>

</style>
