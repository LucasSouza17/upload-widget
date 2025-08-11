<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { CollapsibleTrigger } from 'reka-ui'
</script>

<template>
  <div 
    class="border-b-sm border-zinc400 w-100 px-4 py-2 d-flex flex-row align-center justify-space-between"
    style="background-color: rgba(255, 255, 255, 0.02);"
  >
    <UploadWidgetTitle />

    <CollapsibleTrigger asChild>
      <v-btn size="x-small" icon variant="text" class="d-flex flex-row align-center">
        <Icon icon="mynaui:minimize-one" color="#9f9fa9" height="16px" />
      </v-btn>
    </CollapsibleTrigger>
  </div>
</template>