<template>
  <div class="h-full flex flex-col gap-6">
    <TaskForm 
      :tasks="tasks" 
      :editable-task="editableTask"
      @create="onCreate"
    />
    <TaskGrid>
      <TaskColumn 
        title="Do"
        :tasks="doTask"
        :on-add="onAdd"
        :on-move="onMove"
        :on-edit="onEdit"
        :on-delete="onDelete"
      />
      <TaskColumn 
        title="Doing"
        :tasks="doingTask"
        :on-add="onAdd"
        :on-move="onMove"
        :on-edit="onEdit"
        :on-delete="onDelete"
      />
      <TaskColumn 
        title="Done"
        :tasks="doneTask"
        :on-add="onAdd"
        :on-move="onMove"
        :on-edit="onEdit"
        :on-delete="onDelete"
      />
    </TaskGrid>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import TaskForm from "./components/TaskForm.vue";
import TaskGrid from "./components/TaskGrid.vue";
import TaskColumn from "./components/TaskColumn.vue";

const editableTask = ref(null);
const tasks = ref([]);

const doTask = computed(() => {
  return tasks.value.filter(task => task.status == "Do");
});

const doingTask = computed(() => {
  return tasks.value.filter(task => task.status == "Doing");
});

const doneTask = computed(() => {
  return tasks.value.filter(task => task.status == "Done");
});

const onCreate = (task) => {
  if (!editableTask.value) tasks.value.push(task);
  else {
    const index = tasks.value.findIndex(task => task.id === editableTask.value.id);
    tasks.value.splice(index, 1, task);
    editableTask.value = null;
  }
}

const onAdd = (elementNewIndex, element) => {
  const removeIndex = tasks.value.findIndex(task => task.id === element.id);
  if (removeIndex === -1) return;
  tasks.value.splice(removeIndex, 1);

  const taskByStatusList = tasks.value.filter(task => task.status === element.status);
  taskByStatusList.splice(elementNewIndex, 0, element);
  tasks.value = tasks.value.filter(task => task.status !== element.status).concat(taskByStatusList);
}

const onMove = (elementOldIndex, elementNewIndex, element) => {
  const taskByStatusList = tasks.value.filter(task => task.status === element.status);
  taskByStatusList.splice(elementOldIndex, 1);
  taskByStatusList.splice(elementNewIndex, 0, element);
  tasks.value = tasks.value.filter(task => task.status !== element.status).concat(taskByStatusList);
}

const onEdit = ({ id, title, description, tag, status }) => {
  editableTask.value = {
    id,
    title,
    description,
    tag,
    status,
  }
}

const onDelete = (id) => {
  if (!tasks.value.some(task => task.id === id)) return false;
  tasks.value = tasks.value.filter(task => task.id !== id);
  return true;
}
</script>
