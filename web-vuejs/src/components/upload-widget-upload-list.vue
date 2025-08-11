<script setup lang="ts">
import { computed } from 'vue';
import { useUploadsStore } from '@/store/uploads';

  const uploadsMap = useUploadsStore().uploads
  const isUploadListEmpty = computed(() => uploadsMap.size === 0)

  const uploads = computed(() =>
    Array.from(uploadsMap.entries()).map(([id, upload]) => ({
      id,
      ...upload,
    }))
  )
</script>

<template>
  <div class="px-3 d-flex flex-column ga-3">
    <span class="font-weight-medium text-caption">
      Uploaded files <span class="text-zinc400">({{ uploadsMap.size }})</span>
    </span>

    <span v-if="isUploadListEmpty === true" class="text-zinc400 text-caption">No uploads added</span>
  
    <div v-if="isUploadListEmpty === false" v-for="upload in uploads" :key="upload.id">
      <UploadWidgetUploadItem :upload="upload" />
    </div>
  </div>
</template>