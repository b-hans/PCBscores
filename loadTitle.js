function loadTitle ( id ) {

    const myTitle = new Title2by( id );
    const msgCell = TITLE_SHEET.getRange(TITLE_STATUS_CELL);

    if (!myTitle) {
        msgCell.setValue('Error retrieving data');
        return;
    }

    TITLE_SHEET.getRange(INPUT_ID_CELL).setValue(myTitle.id);
    TITLE_SHEET.getRange(INPUT_2BY_NUMBER).setValue(myTitle.tby_num);
    TITLE_SHEET.getRange(INPUT_NOTES_CELL).setValue(myTitle.notes);
    TITLE_SHEET.getRange(INPUT_TITLE_CELL).setValue(myTitle.title);
    TITLE_SHEET.getRange(INPUT_TYPE_CELL).setValue(myTitle.type);
    TITLE_SHEET.getRange(INPUT_LENGTH_CELL).setValue(myTitle.length);
    TITLE_SHEET.getRange(INPUT_TEMPO_CELL).setValue(myTitle.tempo);
    TITLE_SHEET.getRange(INPUT_COMPOSER_LAST_CELL).setValue(myTitle.composer_last);
    TITLE_SHEET.getRange(INPUT_COMPOSER_FIRST_CELL).setValue(myTitle.composer_first);
    TITLE_SHEET.getRange(INPUT_ARR_LAST_CELL).setValue(myTitle.arranger_last);
    TITLE_SHEET.getRange(INPUT_ARR_FIRST_CELL).setValue(myTitle.arranger_first);
    TITLE_SHEET.getRange(INPUT_DATE_CELL).setValue(myTitle.date);

    // if scores populate 
    if (myTitle.scores.length > 0 || myTitle.docs.length > 0) {
        loadScores(myTitle);
    }


}