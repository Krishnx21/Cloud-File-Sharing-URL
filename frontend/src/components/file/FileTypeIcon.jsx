import { FileArchive, FileImage, FileText, FileType, FileVideo } from "lucide-react";

export function FileTypeIcon({ mimetype = "" }) {
  const Icon = mimetype.startsWith("image/")
    ? FileImage
    : mimetype.startsWith("video/")
      ? FileVideo
      : mimetype.includes("pdf") || mimetype.includes("document") || mimetype.includes("text")
        ? FileText
        : mimetype.includes("zip") || mimetype.includes("rar")
          ? FileArchive
          : FileType;

  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-[#0e1116] text-primary">
      <Icon size={17} />
    </span>
  );
}
