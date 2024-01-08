<template>
  <Panel data-comp="panel">
    <template #header>
      <div class="flex items-center gap-2">
        <i :class="icon" />
        <span class="font-bold">{{ title }}</span>
      </div>
    </template>
    <template #icons>
      <Badge :value="tasksCount" />
    </template>
    <div class="h-full relative">
      <p v-show="!tasks.length" class="text-slate-500 absolute top-0 left-0">
        No task in <strong>{{ title }}</strong> column
      </p>
      <draggable
        class="h-full space-y-4 relative"
        :list="tasks"
        group="tasks"
        item-key="id"
        @change="onChange"
      >
        <template #item="{element}">
          <div>
            <TaskCard 
              :id="element.id"
              :title="element.title" 
              :description="element.description" 
              :tag="element.tag"
              :status="element.status"
              :on-edit="onEdit"
              :on-delete="onDelete"
            />
          </div>
        </template>
      </draggable>
    </div>
  </Panel>
</template>

<script setup>
import { computed } from 'vue';
import draggable from "vuedraggable";
import Panel from 'primevue/panel';
import Badge from 'primevue/badge';
import TaskCard from './TaskCard.vue';

const props = defineProps({
  title: String,
  tasks: Array,
  onAdd: Function,
  onMove: Function,
  onEdit: Function,
  onDelete: Function,
});

const tasksCount = computed(() => {
  return props.tasks.length > 100 ? "100+" : props.tasks.length;
});

const icon = computed(() => {
  return {
    Do: "pi pi-minus-circle",
    Doing: "pi pi-sliders-v",
    Done: "pi pi-check",
  }[props.title]
})

const onChange = (evt) => {
  if (evt.added) {
    props.onAdd(evt.added.newIndex, {
      ...evt.added.element,
      status: props.title
    });
  } else if (evt.moved) {
    props.onMove(evt.moved.oldIndex, evt.moved.newIndex, evt.moved.element);
  }
}
</script>
