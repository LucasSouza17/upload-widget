<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { CollapsibleTrigger } from 'reka-ui'
</script>


<template>
  <CollapsibleTrigger class="d-flex flex-row align-center ga-5 py-3 px-5">
    <UploadWidgetTitle />
    
    <Icon icon="mynaui:maximize-one" color="#9f9fa9" height="16px" />
  </CollapsibleTrigger>
</template>