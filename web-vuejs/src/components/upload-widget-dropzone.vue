<script setup lang="ts">
import { useUploadsStore } from '@/store/uploads'
import { ref } from 'vue'

const addUploads = useUploadsStore().addUploads

const isDragging = ref(false)
const fileInputRef = ref<HTMLInputElement | null>(null)

function openFileDialog() {
  fileInputRef.value?.click()
}

function onDragOver(event: globalThis.DragEvent) {
  event.preventDefault()
  isDragging.value = true
}

function onDragLeave() {
  isDragging.value = false
}

function onDrop(event: globalThis.DragEvent) {
  event.preventDefault()
  isDragging.value = false

  if (event.dataTransfer?.files?.length) {
    const droppedFiles = Array.from(event.dataTransfer.files).filter(file =>
      file.type.startsWith('image/')
    )
    addUploads(droppedFiles)
  }
}

function onFileChange(newFiles: File[] | undefined) {
  if (newFiles?.length) {
    addUploads(newFiles)
  }
}
</script>

<template>
  <div class="d-flex flex-column px-3">
    <v-sheet
      class="d-flex flex-column align-center justify-center text-center text-zinc400" 
      width="100%"
      rounded="lg"
      elevation="2"
      :style="{
        border: '1px dashed' + (isDragging ? '#615fff' : '#3f3f46'),
        backgroundColor: isDragging ? 'rgba(25, 118, 210, 0.08)' : 'rgba(0, 0, 0, 0.20)',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        height: '8rem'
      }"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
      role="button"
      tabindex="0"
      @click="openFileDialog"
    >
      <span class="text-caption">Drop your files here or</span>
      <span class="text-decoration-underline text-caption">click to open picker</span>

      <!-- Input real escondido -->
      <input
        type="file"
        accept="image/*"
        multiple
        style="display: none"
        ref="fileInputRef"
        @change="onFileChange(Array.from(($event.target as HTMLInputElement).files || []))"
      />
    </v-sheet>

    <span class="text-caption text-zinc400 mt-2">Only PNG and JPG files are supported.</span>
  </div>
</template>