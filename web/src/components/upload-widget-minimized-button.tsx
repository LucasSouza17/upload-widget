import * as Collapsible from "@radix-ui/react-collapsible";
import { Maximize2 } from "lucide-react";
import { UploadWidgetTitle } from "./upload-widget-title";

export function UploadWidgetMinimizedButton() {
  return (
    <Collapsible.Trigger className="group cursor-pointer w-full bg-white/[0.02] py-3 px-5 flex items-center justify-between gap-5">
      <UploadWidgetTitle />

      <Maximize2 className="size-4 text-zinc-400 group-hover:text-zinc-100" strokeWidth={1.5} />
    </Collapsible.Trigger>
  )
}