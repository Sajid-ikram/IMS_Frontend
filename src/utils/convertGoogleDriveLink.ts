export function convertGoogleDriveLink(link: string) {
  const fileIdMatch = link.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch && fileIdMatch[1]) {
    const fileId = fileIdMatch[1];
    return `https://drive.google.com/thumbnail?id=${fileId}`;
  }
  return "Image is not from Google Drive"; // return null if the link is not a valid Google Drive link
}
