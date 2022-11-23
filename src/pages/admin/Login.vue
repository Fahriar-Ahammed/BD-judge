<template>
  <q-page class="flex flex-center">
    <div class="q-gutter-y-md" style="max-width: 600px; width: 100%; padding: 20px">
      <q-card>
        <q-card-section>
          <div class="text-h6">Admin Login</div>
        </q-card-section>

            <q-form
              @submit="onSubmit"
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="email"
                label="Email *"
                hint="enter you email"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please enter your email']"
              />

              <q-input
                filled
                type="password"
                v-model="password"
                label="password *"
                lazy-rules
                :rules="[
          val => val !== null && val !== '' || 'Please Enter your password'
        ]"
              />
              <div>
                <q-btn label="Login" type="submit" color="primary"/>

              </div>
            </q-form>
      </q-card>
    </div>

  </q-page>
</template>

<script>
import {ref} from "vue";
import {useQuasar} from "quasar";

export default {
  name: "Login",
  setup () {
    const $q = useQuasar()
    const email = ref(null)
    const password = ref(null)
    return {
      email,
      password,
      onSubmit () {
        $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      },

    }
  }
}
</script>

<style scoped>

</style>
