function getMenu(e) {

    const statusCell = MASTER_SHEET.getRange(MASTER_STATUS_CELL);

    statusCell.setValue("Initialized");

    SpreadsheetApp.getUi()
         .createMenu('Form rebuilds')
         .addItem('Rebuild input form', 'rebuildInputForm')
         .addItem('Rebuild setlist input', 'rebuildSetlistInputForm')
         .addItem('Rebuild create document form', 'rebuildCreateDocumentForm')
         .addItem('Import harold', 'importNewHarold')
         .addToUi();
    

}