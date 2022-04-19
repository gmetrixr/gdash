
const imageFormats = ["png", "jpg", "jpeg", "webp"];
const videoFormats = ["mp4", "m4v"];
const audioFormats = ["aac", "mp3", "weba", "mpeg"];
const threeDFormats = ["glb", "gltf"];
const compressedFormats = ["zip", "rar", "tar", "gzip", "gz", "bz2", "7z"];
const gifFormats = ["gif"];
const pdfFormats = ["pdf"];
export const extensionWhitelist = [...imageFormats, ...videoFormats, ...audioFormats, ...threeDFormats, ...compressedFormats, ...gifFormats, ...pdfFormats];
export const disallowedFileExtensions = ["php", "php3", "php4", "phtml", "pl", "py", "jsp", "asp", "htm", "shtml", "sh", "cg"];

export const allowedMimeTypes = {
  IMAGE: ["image/png", "image/jpg", "image/jpeg", "image/webp"],
  VIDEO: ["video/mp4", "video/mpeg", "video/x-m4v"],
  AUDIO: ["audio/aac", "audio/mp3", "audio/mpeg"],
  COMPRESSED: ["application/zip", "application/vnd.rar", "application/x-tar", "application/gzip", "application/x-bzip2", "application/x-7z-compressed"],
  THREED: ["model/gltf+binary", "model/gltf+json"],
  GIF: ["image/gif"],
  OTHER: ["application/pdf"],
  PDF: ["application/pdf"],
  SPRITE: ["application/zip", "application/vnd.rar", "application/x-tar", "application/gzip", "application/x-bzip2", "application/x-7z-compressed"],
  SCORM: ["application/zip", "application/vnd.rar", "application/x-tar", "application/gzip", "application/x-bzip2", "application/x-7z-compressed"],
};

export enum FileType {
  IMAGE = "IMAGE",
  GIF = "GIF",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
  THREED = "THREED",
  COMPRESSED = "COMPRESSED",
  PDF = "PDF",
  SCORM = "SCORM",
  SPRITE = "SPRITE",
  OTHER = "OTHER",
}

export const getFileType = (path: string): FileType => {
  const extension = getExtension(path);
  if (imageFormats.includes(extension)) {
    return FileType.IMAGE;
  } else if (videoFormats.includes(extension)) {
    return FileType.VIDEO;
  } else if (audioFormats.includes(extension)) {
    return FileType.AUDIO;
  } else if (threeDFormats.includes(extension)) {
    return FileType.THREED;
  } else if (compressedFormats.includes(extension)) {
    return FileType.COMPRESSED;
  } else if (gifFormats.includes(extension)) {
    return FileType.GIF;
  } else if (pdfFormats.includes(extension)) {
    return FileType.PDF;
  } else {
    return FileType.OTHER;
  }
}

export const getExtension = (path: string): string => {
  // remove any query params that may be in the url
  const q = path.split("?");
  if (q.length >= 2) {
    path = q[0];
  }
  const fullFileName: string = path.substring(path.lastIndexOf("/") + 1);
  return fullFileName.substring(fullFileName.lastIndexOf(".") + 1).toLowerCase();
}

export function getFilenameWithoutExtension(path: string): string {
  const fileName: string = path.substring(path.lastIndexOf("/") + 1);
  return fileName.substring(0, fileName.lastIndexOf("."));
}

export function getFolderPathWithoutFilename(folderPath: string): string {
  return folderPath.substring(0, folderPath.lastIndexOf("/"));
}