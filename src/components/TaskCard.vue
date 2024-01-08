<template>
  <Card>
    <template #title>
      <p class>{{ title }}</p>
    </template>
    <template #content>
        <p class="m-0 -mt-5 mb-2 text-slate-500">{{ description || "No description" }}</p>
        <Chip v-show="tag.length > 0" class="text-sm py-1 px-2">
          <span>{{ tag }}</span>
        </Chip>
    </template>
    <template #footer>
      <div class="flex items-center gap-4 -mt-5">
        <i class="pi pi-pencil" style="color: #FFA000; cursor: pointer;" @click="handleEdit" />
        <i class="pi pi-trash" style="color: #FF0000; cursor: pointer;" @click="handleConfirm($event)" />
      </div>
    </template>
  </Card>
  <Toast />
  <ConfirmPopup />
</template>

<script setup>
import Card from 'primevue/card';
import Toast from 'primevue/toast';
import Chip from 'primevue/chip';
import ConfirmPopup from 'primevue/confirmpopup';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const props = defineProps({
  id: Number,
  title: String,
  description: String,
  tag: String,
  status: String,
  onEdit: Function,
  onDelete: Function,
});

const confirm = useConfirm();
const toast = useToast();

const handleEdit = () => {
  props.onEdit({
    id: props.id,
    title: props.title,
    description: props.description,
    tag: props.tag,
    status: props.status
  })
}

const handleConfirm = (event) => {
  confirm.require({
    target: event.currentTarget,
    message: 'Do you want to delete this task?',
    acceptClass: '!bg-red-500 dark:!bg-red-40 !border-red-500 dark:!border-red-400 !ring-red-500 dark:!ring-red-400 hover:!bg-red-600 dark:hover:!bg-red-300 hover:!border-red-600 dark:hover:!border-red-300 focus:!ring-red-400/50 dark:!focus:ring-red-300/50',
    accept: () => {
      const hasDeleted = props.onDelete(props.id);
      toast.add({ 
        severity: hasDeleted ? 'success' : 'error', 
        summary: hasDeleted ? 'Confirmed' : 'Error', 
        detail: hasDeleted ? 'Task deleted' : 'Failed to delete task', 
        life: 3000 
      });
    },
    reject: () => {}
  });
};
</script>
