import { useUploads } from "../store/uploads";
import { UploadWidgetUploadItem } from "./upload-widget-upload-item";

export function UploadWidgetUploadList() {
  const uploads = useUploads(store => store.uploads);
  const isUploadListEmpty = uploads.size === 0

  return (
    <div className="px-3 flex flex-col gap-3 max-h-[360px] overflow-y-auto scrollbar-modern">
      <span className="text-xs font-medium">Uploaded files{' '}
        <span className="text-zinc-400">({uploads.size})</span>
      </span>

      {isUploadListEmpty ? (
        <span className="text-xs text-zinc-400">No uploads added</span>
      ) : (
        <div className="space-y-2">
          {Array.from(uploads.entries()).map(([uploadId, upload]) => {
            return <UploadWidgetUploadItem key={uploadId} upload={upload} uploadId={uploadId} />
          })}
        </div>
      )}
    </div>
  )
}