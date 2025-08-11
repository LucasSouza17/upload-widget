<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { useUploadsStore, type Upload } from '@/store/uploads'
  import { formatBytes } from '@/utils/format-bytes';
  import { computed } from 'vue';

  const retryUpload = useUploadsStore().retryUpload
  const cancelUpload = useUploadsStore().cancelUpload

  const progress = computed(() => {
    return Math.min(
      props.upload.compressedSizeInBytes
        ? Math.round((props.upload.uploadSizeInBytes * 100) / props.upload.compressedSizeInBytes)
        : 0,
      100
    )
  })
  const compressedPercentage = computed(() => {
    if(!props.upload.compressedSizeInBytes) return 0
    return Math.round(((props.upload.originalSizeInBytes - props.upload.compressedSizeInBytes) * 100) / props.upload.originalSizeInBytes)
  })
  const progressColor = computed(() => {
    if(props.upload.status === 'success') return 'green400'
    if(props.upload.status === 'error') return 'red400'
    if(props.upload.status === 'cancelled') return 'yellow400'
    return 'indigo500'
  })
  
  interface Props {
    upload: Upload & { id: string }
  }

  const props = defineProps<Props>()
</script>

<template>
  <div 
    class="pa-3 rounded-lg d-flex flex-column ga-3 position-relative"
    style="background-color: rgba(255, 255, 255, 0.02);"
  >
    <div class="d-flex flex-column ga-1">
      <span class="text-caption font-weight-medium d-flex align-center ga-1">
        <Icon icon="mage:image-upload" color="#9f9fa9" height="16px" />
        <span>{{ props.upload.name }}</span>
      </span>

      <span class="text-zinc400 d-flex ga-1 align-center" style="font-size: 0.625rem">
        <span class="text-decoration-line-through">{{ formatBytes(props.upload.originalSizeInBytes) }}</span>
        <div style="width: 4px; height: 4px" class="rounded bg-zinc700"></div>
        <span>
          {{ formatBytes(props.upload.compressedSizeInBytes || 0) }}
          <span v-if="props.upload.compressedSizeInBytes" class="text-green400 ml-1">
            -{{ compressedPercentage }}%
          </span>
        </span>
        <div style="width: 4px; height: 4px" class="rounded bg-zinc700"></div>
        <span v-if="props.upload.status === 'success'">100%</span>
        <span v-if="props.upload.status === 'progress'">{{ progress }}%</span>
        <span v-if="props.upload.status === 'error'" class="text-red400">Error</span>
        <span v-if="props.upload.status === 'cancelled'" class="text-yellow400">Cancelled</span>
      </span>
    </div>

    <v-progress-linear
      bg-color="zinc800"
      :color="progressColor"
      :model-value="props.upload.status === 'progress' ? progress : 100"
      rounded
    ></v-progress-linear>

    <div class="position-absolute d-flex align-center ga-1" style="top: 0.625rem; right: 0.625rem;">
      <v-btn style="width: 1.5rem; height: 1.5rem" icon variant="text" class="d-flex flex-row align-center">
        <Icon icon="cuida:download-outline" color="#9f9fa9" height="16px" />
      </v-btn>

      <v-btn style="width: 1.5rem; height: 1.5rem" icon variant="text" class="d-flex flex-row align-center">
        <Icon icon="iconamoon:link" color="#9f9fa9" height="16px" />
      </v-btn>

      <v-btn @click="retryUpload(props.upload.id)" style="width: 1.5rem; height: 1.5rem" icon variant="text" class="d-flex flex-row align-center">
        <Icon icon="pepicons-pop:refresh" color="#9f9fa9" height="16px" />
      </v-btn>

      <v-btn @click="cancelUpload(props.upload.id)" style="width: 1.5rem; height: 1.5rem" icon variant="text" class="d-flex flex-row align-center">
        <Icon icon="material-symbols:close-rounded" color="#9f9fa9" height="16px" />
      </v-btn>
    </div>

  </div>
</template>

























