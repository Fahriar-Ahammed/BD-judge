+<template>
  <q-page>
    <q-card style="margin: 5px">
      <q-select outlined  v-model="language" :options="options" label="Language" @update:model-value="languageChange()" style="max-width: 300px" />
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
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { java } from '@codemirror/lang-java'
import { oneDark } from '@codemirror/theme-one-dark'

export default defineComponent({
  components: {
    Codemirror
  },
  setup() {
    const code = ref(`console.log('Hello, world!')`)

    // Codemirror EditorView instance ref
    const view = shallowRef()
    const handleReady = (payload) => {
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

    return {
      handleReady
    }
  },
  data(){
    return{
      code:'',
      options: [
        'C', 'Cpp', 'Java', 'Javascript', 'Python'
      ],
      language:'',
      extensions:''
    }
  },
  created() {
    this.languageChange()
  },
  methods:{
    submit(){
      console.log(this.code)
    },
    languageChange(){
      console.log("###   "+this.language)

      if (this.language === 'Java'){
        this.extensions = [java(), oneDark]
      }else if (this.language === 'Javascript'){
        this.extensions = [javascript(), oneDark]
      }else {
        this.extensions = [javascript()]
      }
    }
  }
})
</script>

<style scoped>

</style>
