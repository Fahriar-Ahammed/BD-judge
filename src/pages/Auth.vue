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
          <q-tab name="signIn" label="Sign In"/>
          <q-tab name="signUp" label="Sign Up"/>
        </q-tabs>

        <q-tab-panels v-model="tab" animated class="bg-white">
          <q-tab-panel name="signIn">
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

              <!--
                            <q-toggle v-model="accept" label="I accept the license and terms" />
              -->

              <div>
                <q-btn v-on:click="login" label="Login" color="primary"/>
              </div>
            </q-form>

          </q-tab-panel>

          <q-tab-panel name="signUp">
            <q-form
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="authData.name"
                label="Name *"
                hint="enter you full name"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please enter your Full Name']"
              />

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

              <q-input
                filled
                type="password"
                v-model="authData.password_confirmation"
                label="Confirm password *"
                lazy-rules
                :rules="[
          val => val !== null && val !== authData.password || 'Please Confirm your password'
        ]"
              />

              <!--
                            <q-toggle v-model="accept" label="I accept the license and terms" />
              -->

              <div>
                <q-btn v-on:click="register" label="Register" type="submit" color="primary"/>
                <!--
                                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                -->
              </div>
            </q-form>
          </q-tab-panel>

        </q-tab-panels>
      </q-card>
    </div>


  </q-page>
</template>

<script setup>
import {reactive, ref} from "vue";
import {api} from 'boot/axios'
import {useRouter} from 'vue-router'
import {useAuthStore} from "stores/auth";

const tab = ref('signIn')
const router = useRouter()
const authData = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const authStore = useAuthStore()

function login() {
  authStore.login(authData.email, authData.password)
  router.push('/')
}

function register() {
  api.post('api/auth/register', authData)
    .then(response => {
      console.log(response)
    })
}


</script>

<style scoped>

</style>
