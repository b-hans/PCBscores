function getDrawings() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var drawings = sheet.getDrawings();

  for (var i = 0; i < drawings.length; i++) {
    var drawing = drawings[i];
    var zIndex = drawing.getZIndex();
    var containerInfo = drawing.getContainerInfo();

    // Logger.log("Drawing " + (i + 1) + ":");
    // Logger.log("  Z-index: " + zIndex);
    // Logger.log("  Container Info: " + JSON.stringify(containerInfo));
  }
}