function deletePdfByUrl(pdfUrl) {
  const fileId = getFileIdFromUrl(pdfUrl);
  const file = DriveApp.getFileById(fileId);
  file.setTrashed(true); // Move the file to trash
}