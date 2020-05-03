<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <label for="task">Task</label>
      <input type="text" name="task" id="task" v-model="form.task" autofocus />
      <button>add</button>
    </form>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <div @click.prevent="handleClick(task)">
          <input type="checkbox" :checked="task.done" /><span
            :class="{ done: task.done }"
            >{{ task.name }}</span
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { v4 as uuid } from "uuid";

export default {
  data() {
    return {
      form: {
        task: ""
      },
      tasks: [
        // { id: uuid(), name: "buy milk", done: false },
        // { id: uuid(), name: "do homework", done: true }
      ]
    };
  },
  methods: {
    handleSubmit() {
      const task = {
        id: uuid(),
        name: this.form.task,
        done: false
      };
      this.tasks.push(task);
      this.form.task = "";
    },
    handleClick(task) {
      task.done = !task.done;
    }
  }
};
</script>

<style>
.container {
  width: 500px;
  margin: 2rem auto;
  padding: 3rem;
  border: 3px solid #333;
  border-radius: 5px;
}
form {
  font-size: 16px;
}
form label {
  font-size: 20px;
  font-weight: bold;
}
form input {
  border: 2px solid #333;
  border-radius: 3px;
  padding: 8px 12px;
  font-size: inherit;
}
form button {
  padding: 8px 12px;
  border: 2px solid #333;
  border-radius: 3px;
  font-size: inherit;
  font-weight: bold;
  text-transform: capitalize;
  cursor: pointer;
}

ul {
  margin-top: 20px;
  list-style: none;
}
ul input {
  margin-right: 10px;
}
ul li {
  margin-bottom: 5px;
  font-size: inherit;
  cursor: pointer;
}
ul li .done {
  text-decoration: line-through;
}
ul li:hover {
  font-weight: bold;
}
</style>
