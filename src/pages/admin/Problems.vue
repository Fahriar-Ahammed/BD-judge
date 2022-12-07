<template>
  <div id="q-app">
    <div class="q-pa-sm q-gutter-sm">
      <q-table
        title="Treats"
        :rows="rows"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:top>
          <q-btn flat outline dense color="primary" label="Add row" @click="showDialog = true" ></q-btn>

          <div class="q-pa-sm q-gutter-sm">
            <q-dialog v-model="showDialog">
              <q-card>
                <q-card-section>
                  <div class="text-h6">Add new item</div>
                </q-card-section>

                <q-card-section>
                  <div class="row">
                    <q-input v-model="editedItem.name" label="Dessert Name"></q-input>
                    <q-input v-model="editedItem.calories" label="Calories"></q-input>
                    <q-input v-model="editedItem.fat" label="Fat"></q-input>
                    <q-input v-model="editedItem.carbs" label="Carbs"></q-input>
                    <q-input v-model="editedItem.protein" label="Protein"></q-input>
                    <q-input v-model="editedItem.sodium" label="Sodium"></q-input>
                    <q-input v-model="editedItem.calcium" label="Calcium"></q-input>
                    <q-input v-model="editedItem.iron" label="Iron"></q-input>
                  </div>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="OK" color="primary" v-close-popup @click="addRow" ></q-btn>
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>

        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="desc" :props="props">
              {{ props.row.name }}
              <q-popup-edit v-model="props.row.name">
                <q-input v-model="props.row.name" dense autofocus counter ></q-input>
              </q-popup-edit>
            </q-td>
            <q-td key="calories" :props="props">
              {{ props.row.calories }}
              <q-popup-edit v-model="props.row.calories" title="Update calories" buttons>
                <q-input type="number" v-model="props.row.calories" dense autofocus ></q-input>
              </q-popup-edit>
            </q-td>
            <q-td key="fat" :props="props">
              <div class="text-pre-wrap">{{ props.row.fat }}</div>
              <q-popup-edit v-model="props.row.fat">
                <q-input type="textarea" v-model="props.row.fat" dense autofocus ></q-input>
              </q-popup-edit>
            </q-td>
            <q-td key="carbs" :props="props">
              {{ props.row.carbs }}
              <q-popup-edit v-model="props.row.carbs" title="Update carbs" buttons persistent>
                <q-input type="number" v-model="props.row.carbs" dense autofocus hint="Use buttons to close" ></q-input>
              </q-popup-edit>
            </q-td>
            <q-td key="protein" :props="props">{{ props.row.protein }}</q-td>
            <q-td key="sodium" :props="props">{{ props.row.sodium }}</q-td>
            <q-td key="calcium" :props="props">{{ props.row.calcium }}</q-td>
            <q-td key="iron" :props="props">{{ props.row.iron }}</q-td>
            <q-td key="actions" :props="props">
              <q-btn color="blue" label="update" @click="editItem(props.row)" size=sm></q-btn>
              <q-btn color="red" label="delete"  @click="deleteItem(props.row)" size=sm></q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>


    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";

const editedItem = reactive({
  name: "",
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
  sodium: 0,
  calcium: "0%",
  iron: "0%"
})

const columns = [
  {
    name: 'desc',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'actions', label: 'Actions', field: 'actions' }
]

const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7
  }
]

let showDialog = ref(false)

function addRow(){

}

function deleteItem(item) {
  const index = this.data.indexOf(item);
  confirm("Are you sure you want to delete this item?") &&
  this.data.splice(index, 1);
}

function editItem(item) {
  this.editedIndex = this.data.indexOf(item);
  this.editedItem = Object.assign({}, item);
  this.show_dialog = true;
}



</script>

<style scoped>

</style>
