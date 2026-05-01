function addTitle() {
    const statusRange = TITLE_SHEET.getRange(TITLE_STATUS_CELL);

    const currentStatus = getStatus('CURRENT_STATUS');

    if (currentStatus == "ADD" ||
        currentStatus == "EDIT"
    ) {
        sendAlert("You must Enter or Cancel");
        return;
    }

    setStatus("ADD");

    // JUST ONE COLUMN (ID)
    const masterRange = MASTER_SHEET.getRange(MASTER_START_ROW, 
        MASTER_ID_COL+1, MASTER_SHEET.getLastRow(), 1);

    const masterData = masterRange.getValues().flat();

    const largestId = Math.max(...masterData);

    const newId = largestId + 1;

    TITLE_SHEET.getRange(INPUT_ID_CELL).setValue(newId);
    TITLE_SHEET.getRange(INPUT_TITLE_CELL).setValue('');
    TITLE_SHEET.getRange(INPUT_TYPE_CELL).setValue('');
    TITLE_SHEET.getRange(INPUT_NOTES_CELL).setValue('');
    TITLE_SHEET.getRange(INPUT_2BY_NUMBER).setValue('');

    TITLE_SHEET.getRange(TITLE_STATUS_CELL).setValue("Adding new title");

    TITLE_SHEET.getRange(INPUT_TITLE_CELL).activate();
    
    return true;
}