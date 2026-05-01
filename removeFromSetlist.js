function removeFromSetlist ( e ) {
    let formStatus = SETLISTS_FORM.getRange(SETLIST_FORM_STATUS_CELL);

    try {
    // first delete the row
        SETLISTS_FORM.deleteRow(e.range.getRow());
        const lastRow = SETLISTS_FORM.getLastRow() + 1;

        let myTitles = [];

        if (lastRow > 8) {
            myTitles = SETLISTS_FORM.getRange(
                SETLIST_FORM_START_ROW,
                SETLIST_FORM_ID_COL,
                SETLISTS_FORM.getLastRow() - SETLIST_FORM_START_ROW + 1,
                1
            ).getValues().flat();
        }

        let newDropDownTitles = getTitles({
            type: "Repertoire",
            exclude: myTitles
        });

        let titlesRule = SpreadsheetApp.newDataValidation()
            .requireValueInList(newDropDownTitles)
            .setAllowInvalid(false)
            .build();

        SETLISTS_FORM.getRange(lastRow, SETLIST_FORM_TITLE_COL)
            .setDataValidation(titlesRule);

    } catch (error) {
        sendAlert ("Error removing row: " + error);
        formStatus.setValue("Error removing row: " + error);

    }

}