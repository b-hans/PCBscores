function deleteScore () {

    const currentStatus = getStatus();
    const msgCell = TITLE_SHEET.getRange(TITLE_STATUS_CELL);

    if (currentStatus != "EDIT") {
        msgCell.setValue ("check the status: " + currentStatus);
        return;
    }

    const curCell = SpreadsheetApp.getCurrentCell();
    const curRow = curCell.getRowIndex();

    const editId = TITLE_SHEET.getRange(curRow, SEARCH_RESULTS_ID_COL)
        .getValue();

    // get the score document
    const scoreData = SCORES_SHEET.getDataRange().getValues();

    const foundRow = scoreData.find(row => row[SCORES_ID_COL] == editId);

    // delete the doc and the sheet row
    deletePdfByUrl(foundRow[SCORES_URL_COL]);

    for (let i=0; i<scoreData.length; i++) {
        if (scoreData[i][SCORES_ID_COL] == editId) {
            SCORES_SHEET.deleteRow(i+1);
            break;
        }
    }

    // re-draw the scores
    clearSearch();
    loadTitle(foundRow[SCORES_TITLE_ID_COL]);
    TITLE_SHEET.getRange(TITLE_STATUS_CELL).activate();

    msgCell.setValue ("Score removed");

}