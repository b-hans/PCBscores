function editTitle() {

    const currentStatus = getStatus();
    const msgCell = TITLE_SHEET.getRange(TITLE_STATUS_CELL);
    const curCell = SpreadsheetApp.getCurrentCell();
    const curRow = curCell.getRowIndex();

    if (currentStatus != 'NONE' && currentStatus != 'SEARCH') {
        sendAlert("Check the status: " + currentStatus);
        msgCell.setValue ("check the status: " + currentStatus);

        if (curCell.getValue() == "Edit master title") {
            curCell.setValue('');
            TITLE_SHEET.activate();
        }
        return;
    }

    if (curCell.getValue() == "Edit master title") {
        let myId = MASTER_SHEET.getRange(curRow, MASTER_ID_COL+1).getValue();
        MASTER_SHEET.getRange(MASTER_STATUS_CELL).setValue("Editing title....");
        curCell.setValue('');

        loadTitle(myId);
        TITLE_SHEET.activate();
        TITLE_SHEET.getRange(TITLE_STATUS_CELL).setValue("Editing....");
        setStatus('EDIT');       
        return;
    }

    const editId = TITLE_SHEET.getRange(curRow, SEARCH_RESULTS_ID_COL)
        .getValue();

    msgCell.setValue ("Editing: " + editId);

    clearSearch();
    loadTitle( editId );
    setStatus("EDIT");

    TITLE_SHEET.getRange(TITLE_STATUS_CELL).setValue('Editing....');

}