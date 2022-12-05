<template>
  <q-page class="flex flex-center">
    <div class="q-gutter-y-md" style="max-width: 600px; width: 100%; padding: 20px">
      <q-card>
        <q-card-section>
          <div class="text-h6">Admin Login</div>
        </q-card-section>

            <q-form
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="authData.email"
                label="Email *"
                hint="enter you email"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please enter your email']"
              />

              <q-input
                filled
                type="password"
                v-model="authData.password"
                label="password *"
                lazy-rules
                :rules="[
          val => val !== null && val !== '' || 'Please Enter your password'
        ]"
              />
              <div v-if="loading">
                <q-linear-progress indeterminate color="secondary" class="q-mt-sm"/>
                <br/>
              </div>
              <q-btn v-on:click="login" label="Login"  color="primary"/>
            </q-form>
      </q-card>
    </div>

  </q-page>
</template>

<script setup>
import {reactive} from "vue";
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'


const router = useRouter()
const authData = reactive({
  email:'',
  password:'',
})
let loading = false

function login(){
  loading = true
  api.post('api/auth/login',
    {
      email : authData.email,
      password : authData.password,
    })
    .then(response => {
      console.log(response)
      let role = response.data.user.role
      if (role === "admin"){
        localStorage.setItem("role",role)
        localStorage.setItem("token",response.data.access_token)
        router.push('admin')
      }
    })
}

</script>

<style scoped>

</style>
