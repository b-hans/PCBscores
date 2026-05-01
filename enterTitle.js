function enterTitle () {
    const statusRange = TITLE_SHEET.getRange(TITLE_STATUS_CELL);

    const currentStatus = getStatus('CURRENT_STATUS');

    if (currentStatus != "ADD" && currentStatus != "EDIT"){
        statusRange.setValue("Enter not valid");
        return;
    }

    if (!inActiveData()){
        statusRange.setValue("You must enter the current cell value");
        sendAlert("You must enter the current cell value");
        return;
    }

    statusRange.setValue("Entering....");

    const new_id = TITLE_SHEET.getRange(INPUT_ID_CELL).getValue();
    const new_title = TITLE_SHEET.getRange(INPUT_TITLE_CELL).getValue();
    const new_type = TITLE_SHEET.getRange(INPUT_TYPE_CELL).getValue();
    const new_notes = TITLE_SHEET.getRange(INPUT_NOTES_CELL).getValue();
    const by_num = TITLE_SHEET.getRange(INPUT_2BY_NUMBER).getValue();
    const new_length = TITLE_SHEET.getRange(INPUT_LENGTH_CELL).getValue();
    const new_tempo = TITLE_SHEET.getRange(INPUT_TEMPO_CELL).getValue();
    const new_date = TITLE_SHEET.getRange(INPUT_DATE_CELL).getValue();
    const new_composer_last = TITLE_SHEET.getRange(INPUT_COMPOSER_LAST_CELL).getValue();
    const new_composer_first = TITLE_SHEET.getRange(INPUT_COMPOSER_FIRST_CELL).getValue();
    const new_arranger_last = TITLE_SHEET.getRange(INPUT_ARR_LAST_CELL).getValue();
    const new_arranger_first = TITLE_SHEET.getRange(INPUT_ARR_FIRST_CELL).getValue();

    let myTitle = new Title2by (new_id);
    if (myTitle.title) {
        statusRange.setValue("editing this title: " + myTitle.title);
        myTitle.title = new_title;
        myTitle.type = new_type;
        myTitle.notes = new_notes;
        myTitle.tby_num = by_num;
        myTitle.length = new_length;
        myTitle.tempo = new_tempo;
        myTitle.date = new_date;
        myTitle.composer_last = new_composer_last;
        myTitle.composer_first = new_composer_first;
        myTitle.arranger_last = new_arranger_last;
        myTitle.arranger_first = new_arranger_first;

        return myTitle.doEdit();
                
    }

    if (!new_title && !new_type) {

        statusRange.setValue("Title and type are required")

        return;
    }
    else if (!new_title) {
        statusRange.setValue("Title is required");
        return;
    }
    else if (!new_type) {
        statusRange.setValue("Type is required")
        return;
    }

    if (!new_id) {
        statusRange.setValue("Check on the id")
        return;
    }


    // get the first blank row in master

    let lastRow = MASTER_SHEET.getLastRow() + 1;

    MASTER_SHEET.getRange(lastRow, MASTER_ID_COL+1).setValue(new_id);
    MASTER_SHEET.getRange(lastRow, MASTER_TITLE_COL+1).setValue(new_title);
    MASTER_SHEET.getRange(lastRow, MASTER_TYPE_COL+1).setValue(new_type);
    MASTER_SHEET.getRange(lastRow, MASTER_NOTES_COL+1).setValue(new_notes);
    MASTER_SHEET.getRange(lastRow, MASTER_2BY_COL+1).setValue(by_num);
    MASTER_SHEET.getRange(lastRow, MASTER_LENGTH+1).setValue(new_length);
    MASTER_SHEET.getRange(lastRow, MASTER_TEMPO+1).setValue(new_tempo);
    MASTER_SHEET.getRange(lastRow, MASTER_DATE+1).setValue(new_date);
    MASTER_SHEET.getRange(lastRow, MASTER_COMPOSER_LAST+1).setValue(new_composer_last);
    MASTER_SHEET.getRange(lastRow, MASTER_COMPOSER_FIRST+1).setValue(new_composer_first);
    MASTER_SHEET.getRange(lastRow, MASTER_ARRANGER_LAST+1).setValue(new_arranger_last);
    MASTER_SHEET.getRange(lastRow, MASTER_ARRANGER_FIRST+1).setValue(new_arranger_first);

    statusRange.setValue("Successfully added new title");
    MASTER_SHEET.getRange(MASTER_STATUS_CELL).setValue("Added " + new_title);

    clearSearch();
    clearTitleSheet();
    setStatus('');

}