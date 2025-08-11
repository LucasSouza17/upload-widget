<script setup lang="ts">
  import { motion } from 'motion-v';
  import { ref } from 'vue';
  import { CollapsibleContent, CollapsibleRoot } from 'reka-ui'

  const widgetOpen = ref(false)

  const variants = {
    closed: {
      width: 'max-content',
      height: '44px',
      transition: {
        type: 'tween'
      }
    },
    open: {
      width: '360px',
      height: 'auto',
      transition: {
        duration: 0.2
      }
    }
  }
</script>

<template>
  <CollapsibleRoot v-model:open="widgetOpen" asChild>
    <motion.div 
      style="width: 100%; max-width: 360px;" 
      class="d-flex bg-zinc900 flex-column overflow-hidden"
      :class="widgetOpen ? 'rounded-lg' : 'rounded-xl'"
      :initial="false"
      :animate="widgetOpen ? 'open' : 'closed'"
      :variants="variants"
    >
      <UploadWidgetMinimizedButton v-if="!widgetOpen" />

      <CollapsibleContent>
        <UploadWidgetHeader />

        <UploadWidgetDropzone />
      </CollapsibleContent>
    </motion.div>
  </CollapsibleRoot>
</template>