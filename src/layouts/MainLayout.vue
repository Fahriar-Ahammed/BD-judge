<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$q.platform.is.mobile"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Online Judge
        </q-toolbar-title>
        <div v-if="$q.platform.is.desktop">
          <q-btn flat color="white" label="Home" to="/"/>
          <q-btn flat color="white" label="Problems" to="problems"/>
          <q-btn flat color="white" label="Page2" to="page2"/>
        </div>
        <q-btn v-if="!authStore.loggedIn" class="glossy" rounded color="teal" label="Sign In" to="login"/>
        <q-btn v-else  v-on:click="authStore.logout" class="glossy" rounded color="teal" label="logout" />

      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="$q.platform.is.mobile"
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
            :active="route.link === path.substring(1)"
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
import {computed, ref, watch} from 'vue'
import {useRoute,useRouter} from 'vue-router'
import { api } from 'boot/axios'
import {useAuthStore} from "stores/auth";


const menuList = [
  {
    title: 'Home',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Page1',
    icon: 'code',
    link: 'page1'
  },
  {
    title: 'Page2',
    icon: 'code',
    link: 'page2'
  },
]
const leftDrawerOpen = ref(false)
const route = useRoute();
const router = useRouter()
const path = computed(() => route.path)

const authStore = useAuthStore()

console.log("pinia data  "+authStore.loggedIn)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}



</script>
