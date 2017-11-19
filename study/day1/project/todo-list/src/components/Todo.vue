<template>
  <div class="container">
    <div class="row">
      <h1>Todo List</h1>
      <div class="col-sm-12">
        Total Count : {{ todoList.length }}
      </div>
      <div class="col-sm-12">
        <input
          v-model="jobModel"
          @keyup.enter="saveTodo"
        >
        <button
          class="btn btn-primary"
          @click="saveTodo"
        >
          Add
        </button>
      </div>
    </div>
    <table
      class="table"
      v-if="todoList.length > 0"
    >
      <thead>
      <tr>
        <th class="text-center">Job</th>
        <th class="text-center">Created Date</th>
        <th class="text-center">Function</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(todo, index) in todoList">
        <td>
          {{ todo.job }}
          <input
            class="form-control"
            :style="'display:none'"
            v-model="todo.job"
          >
        </td>
        <td>{{ todo.createdDate }}</td>
        <td>
          <button
            class="btn btn-warning"
            @click="removeById(index)"
          >
            Remove
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'Todo',
    data () {
      return {
        msg: 'Welcome to Todo List',
        key: 'todoList',
        index: 0,
        jobModel: '',
        todoList: []
      }
    },
    created () {
      this.getTodo()
    },
    computed: {},
    methods: {
      getTodo: function () {
        let data = this.getFromStrage()
        // If Not null
        if (data) {
          this.todoList = data
          this.index = this.todoList.length
        }
      },
      saveTodo: function () {
        this.index++
        let todo = {
          id: this.index,
          createdDate: new Date(),
          job: this.jobModel
        }

        this.todoList.push(todo)

        this.setIntoStorage()
        // Reset Binding Model
        this.jobModel = ''
      },
      removeById: function (index) {
        this.todoList.splice(index, 1)
        this.setIntoStorage()
        this.index--;
        if (this.index < 0) {
          this.index = 0
        }
      },
      getFromStrage: function () {
        return JSON.parse(localStorage.getItem(this.key))
      },
      setIntoStorage: function () {
        localStorage.setItem(this.key, JSON.stringify(this.todoList))
      }
    },
    watch: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
