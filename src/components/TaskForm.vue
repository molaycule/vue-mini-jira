<template>
  <div class="card">
      <Fieldset legend="Task">
          <form class="space-y-4" @submit.prevent="createTask">
            <div class="flex gap-4">
              <div class="flex flex-col flex-1 gap-2">
                <label for="title">Title</label>
                <InputText id="title" v-model="title" maxlength="50" required />
              </div>
              <div class="flex flex-col flex-1 gap-2">
                <label for="tag">Tag</label>
                <InputText id="tag" v-model="tag" maxlength="10" />
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <label for="description">Description</label>
              <Textarea id="description" v-model="description" />
            </div>
            <div>
              <Button type="submit" :label="buttonLabel" />
            </div>
          </form>
      </Fieldset>
  </div>
</template>

<script setup>
import { computed, onUpdated, ref } from 'vue'
import Fieldset from 'primevue/fieldset';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';

const props = defineProps({
  tasks: Object,
  editableTask: Object,
});
const emit = defineEmits(['create'])
const title = ref(props.editableTask?.title ?? "");
const description = ref(props.editableTask?.description ?? "");
const tag = ref(props.editableTask?.tag ?? "");
const buttonLabel = computed(() => !props.editableTask ? "Create Task" : "Update Task");

const createTask = () => {
  const task = {
    id: props.editableTask?.id ?? props.tasks.length,
    title: title.value,
    description: description.value,
    tag: tag.value,
    status: props.editableTask?.status ?? "Do"
  };
  
  emit('create', task);
  title.value = "";
  description.value = "";
  tag.value = "";
}

onUpdated(() => {
  if (!props.editableTask) return;
  title.value = props.editableTask.title;
  description.value = props.editableTask.description;
  tag.value = props.editableTask.tag;
})
</script>
