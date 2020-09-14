<template>
<div>
  <md-dialog :md-active.sync="showDialog">
    <md-dialog-title>{{titleForModal}} Task</md-dialog-title>
    <div id="form">
      <md-field>
        <label>Title</label>
        <md-input v-model="task.title"></md-input>
      </md-field>

      <md-field>
        <label>Description</label>
        <md-textarea v-model="task.description"></md-textarea>
      </md-field>

        <label>Deadline</label>
        <md-datepicker v-model="task.deadline" />

    </div>
    <md-dialog-actions>
      <md-button class="default" @click="closeModal()">Close</md-button>
      <md-button class="default" @click="saveTask()">Save</md-button>
    </md-dialog-actions>
  </md-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
/* eslint-disable indent */

  export default {
  name: 'AddToDoModal',
  props: ['showDialog', 'taskToEdit', 'titleForModal', 'isInEditMode'],
  data: () => ({
    closedState: false,
    task: {
      id: '',
      title: '',
      description: '',
      deadline: '',
    },
  }),
  mounted() {
    if (this.taskToEdit) {
      this.task = this.taskToEdit;
    }
  },
  methods: {
      ...mapActions(['addTask', 'changeTask']),
      closeModal() {
      this.closedState = true;
      this.$emit('modalClosed', this.closedState);
      this.task = {};
    },
    saveTask() {
      if (!this.isInEditMode) {
        this.task.id = this.generateId();
        this.addTask((JSON.parse(JSON.stringify(this.task))));
      } else {
        this.changeTask((JSON.parse(JSON.stringify(this.task))));
      }
      console.log(JSON.parse(JSON.stringify(this.task)));
    },
    generateId() {
      return Math.random().toString(36).substring(2, 15)
        + Math.random().toString(36).substring(2, 15);
    },

  },
};
</script>
<style scoped>
  .md-dialog{width:90%;}
</style>
