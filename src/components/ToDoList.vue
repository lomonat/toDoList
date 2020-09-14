<template>
  <div>
    <md-button class="md-primary md-raised" @click="addNewTask()">Add Task</md-button>
    <md-button class="md-primary md-raised" @click="sort()">Sort</md-button>
    <md-list v-if="tasksAreExisting">
      <md-list-item v-for="task in listOfTasks" :key="task.id">
        <md-card >
          <md-ripple>
            <md-card-header>
              <md-checkbox v-model="task.done">{{task.done? 'Done' : 'Not done'}}</md-checkbox>
              <div class="md-title">{{task.title.toUpperCase()}}</div>
            </md-card-header>
            <md-card-content>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea,
              nostrum odio. Dolores, sed accusantium quasi non.
            </md-card-content>
            <md-card-actions>
              <md-button @click="editTask(task)">Edit</md-button>
              <md-button @click="deleteTask(task.id)">Delete</md-button>
            </md-card-actions>
          </md-ripple>
        </md-card>
      </md-list-item>
    </md-list>
    <div v-if="!tasksAreExisting">
      You have no tasks! Add your first one!
    </div>
    <div v-if="showDialog">
      <AddToDoModal
        :taskToEdit="taskToEdit"
        :showDialog="showDialog"
        :titleForModal="titleForModal"
        :isInEditMode="isInEditMode"
        @modalClosed="closeModal(event)">
      </AddToDoModal>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AddToDoModal from './AddToDoModal.vue';

export default {
  name: 'ToDoList',
  components: { AddToDoModal },
  data: () => ({
    showDialog: false,
    taskToEdit: null,
    titleForModal: '',
    sorting: 'noSort',
    isInEditMode: '',
  }),
  computed: {
    ...mapGetters([
      'getAllTasks',
    ]),
    listOfTasks() {
      return this.getAllTasks || [];
    },
    initialListOfTasks() {
      return this.getAllTasks || [];
    },
    tasksAreExisting() {
      return this.listOfTasks.length;
    },
  },
  watch: {
    'task.done': {
      // post it
    },
  },
  created() {
  },
  mounted() {
    this.loadTasks();
    this.unsortedList = this.listOfTasks;
  },
  methods: {
    ...mapActions(['loadTasks']),
    closeModal(modalState) {
      this.showDialog = modalState;
      this.taskToEdit = {};
    },
    deleteTask(taskId) {
      console.log(taskId);
    },
    editTask(task) {
      this.titleForModal = 'Edit ';
      this.showDialog = true;
      this.taskToEdit = task;
      this.isInEditMode = true;
    },
    addNewTask() {
      this.titleForModal = 'Add ';
      this.showDialog = true;
      this.isInEditMode = false;
    },
    sort() {
      switch (this.sorting) {
        case 'noSort':
          this.listOfTasks.sort((a, b) => a.title.localeCompare(b.title));
          this.sorting = 'ascending';
          break;
        case 'ascending':
          this.listOfTasks.sort((a, b) => a.title.localeCompare(b.title)).reverse();
          this.sorting = 'descending';
          break;
        case 'descending':
          this.listOfTasks = this.initialListOfTasks();
          this.sorting = 'noSort';
          break;
        default:
      }
    },
  },
};
</script>

<style scoped>

</style>
