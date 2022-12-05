<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar Starter Admin
        </q-toolbar-title>

        <q-btn v-on:click="logout" class="glossy" rounded color="teal" label="logout"/>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Admin Section
        </q-item-label>
        <template v-for="route in menuList">
          <q-item
            clickable
            v-ripple
            :active="route.link === path.substring(7)"
            active-class="my-menu-link"
            :to="route.link"
          >
            <q-item-section avatar>
              <q-icon :name="route.icon"/>
            </q-item-section>

            <q-item-section>{{ route.title }}</q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import {defineComponent, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {computed} from 'vue'
import {api} from 'boot/axios'

const menuList = [
  {
    title: 'Dashboard',
    icon: 'school',
    link: 'dashboard'
  },
  {
    title: 'Menu1',
    icon: 'code',
    link: 'menu1'
  },
  {
    title: 'Menu2',
    icon: 'chat',
    link: 'menu2'
  }
]

const leftDrawerOpen = ref(false)

const route = useRoute();
const path = computed(() => route.path)
const router = useRouter()


function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function logout() {
  const token = localStorage.getItem("token")
  api.post('api/auth/logout?token=' + token)
    .then((response) => {
      localStorage.setItem("role", "")
      localStorage.setItem("token", "")
      router.push('/')
    })
}
</script>

<style lang="sass">
.my-menu-link
  color: white
  background: #F2C037
</style>
