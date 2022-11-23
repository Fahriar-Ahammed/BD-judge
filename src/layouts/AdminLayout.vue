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

        <q-btn class="glossy" rounded color="teal" label="Profile" />
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
        <template v-for="route in essentialLinks">
          <q-item
            clickable
            v-ripple
            :active="route.link === this.path.substring(7)"
            active-class="my-menu-link"
            :to="route.link"
          >
            <q-item-section avatar>
              <q-icon :name="route.icon" />
            </q-item-section>

            <q-item-section>{{route.title}}</q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import {useRoute} from 'vue-router'
import {computed} from 'vue'

const linksList = [
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

export default defineComponent({
  name: 'AdminLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    const route=useRoute();
    const path = computed(() =>route.path)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      path,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  data(){
    return{

    }
  },
  methods:{
  }
})
</script>

<style lang="sass">
.my-menu-link
  color: white
  background: #F2C037
</style>
