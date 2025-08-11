import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { CanceledError } from "axios";
import { compressImage } from "@/utils/compress-image.js";
import { uploadFileToStorage } from "@/http/upload-file-to-storage.js";

export type Upload = {
  name: string
  file: File
  abortController?: AbortController
  status: 'progress' | 'success' | 'error' | 'cancelled'
  originalSizeInBytes: number
  compressedSizeInBytes?: number
  uploadSizeInBytes: number
  remoteUrl?: string
}

type UploadsState = {
  uploads: Ref<Map<string, Upload>>
  addUploads: (files: File[]) => void
  cancelUpload: (uploadId: string) => void
  retryUpload: (uploadId: string) => void
}

export const useUploadsStore = defineStore("uploads", (): UploadsState => {
  const uploads = ref(new Map<string, Upload>())

  function updateUpload(uploadId: string, data: Partial<Upload>) {
    const upload = uploads.value.get(uploadId)

    if (!upload) return

    uploads.value.set(uploadId, { ...upload, ...data })
  }

  async function processUpload(uploadId: string) {
    const upload = uploads.value.get(uploadId)

    if (!upload) return

    const abortController = new AbortController()

    updateUpload(uploadId, {
      uploadSizeInBytes: 0,
      compressedSizeInBytes: undefined,
      remoteUrl: undefined,
      abortController,
      status: 'progress'
    })

    try {
      const compressedFile = await compressImage({
        file: upload.file,
        maxHeight: 1000,
        maxWidth: 1000,
        quality: 0.8
      })

      updateUpload(uploadId, {
        compressedSizeInBytes: compressedFile.size
      })

      const { url } = await uploadFileToStorage(
        {
          file: compressedFile,
          onProgress(sizeInBytes) {
            updateUpload(uploadId, {
              uploadSizeInBytes: sizeInBytes
            })
          }
        },
        { signal: abortController?.signal }
      )

      updateUpload(uploadId, {
        remoteUrl: url,
        status: 'success'
      })
    } catch (error) {
      if (error instanceof CanceledError) {
        updateUpload(uploadId, {
          status: 'cancelled'
        })
        return
      }

      updateUpload(uploadId, {
        status: 'error'
      })
    }
  }

  async function cancelUpload(uploadId: string) {
    const upload = uploads.value.get(uploadId)

    if (!upload) return

    upload.abortController?.abort()
  }

  async function retryUpload(uploadId: string) {
    processUpload(uploadId)
  }

  function addUploads(files: File[]) {
    for (const file of files) {
      const uploadId = crypto.randomUUID()

      const upload: Upload = {
        name: file.name,
        file,
        status: 'progress',
        originalSizeInBytes: file.size,
        uploadSizeInBytes: 0
      }

      uploads.value.set(uploadId, upload)

      processUpload(uploadId)
    }
  }

  return {
    uploads,
    addUploads,
    cancelUpload,
    retryUpload
  }
})