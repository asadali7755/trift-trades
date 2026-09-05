/**
 * Injects Cloudinary's auto-format/auto-quality transformation into a
 * delivery URL, so every product photo/video — however it was uploaded,
 * whatever the admin named the file — is served as WebP/AVIF (images) or an
 * optimized codec (video) to whichever browser is asking. This is the
 * durable fix for format/compression on user-uploaded media, since we can't
 * control what filename or format the shop owner's phone produces.
 */
export function optimizedCloudinaryUrl(url: string): string {
  if (!url.includes("res.cloudinary.com")) return url;
  if (url.includes("/upload/f_auto")) return url;
  return url.replace("/upload/", "/upload/f_auto,q_auto/");
}
