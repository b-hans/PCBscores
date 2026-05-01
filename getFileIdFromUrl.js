function getFileIdFromUrl(url) {
  // Assuming the ID is the 6th part of the URL (index 5)
  const parts = url.split('/');
  const fileId = parts[5]; 
  return fileId;
}
