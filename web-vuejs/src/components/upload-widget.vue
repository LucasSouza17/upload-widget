<script setup lang="ts">
  import { motion, VariantType } from 'motion-v';
  import { ref } from 'vue';
  import { CollapsibleContent, CollapsibleRoot } from 'reka-ui'
  import UploadWidgetHeader from '@/components/upload-widget-header.vue';
  import UploadWidgetDropzone from '@/components/upload-widget-dropzone.vue';
  import UploadWidgetUploadList from '@/components/upload-widget-upload-list.vue';


  const widgetOpen = ref(false)

  const variants: Record<string, VariantType> = {
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

        <div class="d-flex flex-column ga-4 py-3">
          <UploadWidgetDropzone />

          <v-divider color="zinc500" />

          <UploadWidgetUploadList />
        </div>
      </CollapsibleContent>
    </motion.div>
  </CollapsibleRoot>
</template>