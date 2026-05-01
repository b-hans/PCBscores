function addToSetlist( e ) {

    let formRow = e.range.getRow();

    SETLISTS_FORM.getRange(formRow, SETLIST_FORM_TITLE_COL)
        .clearDataValidations();
    
    const setListStatus = SETLISTS_FORM.getRange(SETLIST_FORM_STATUS_CELL);
    // get current row
    let currentRow = SETLISTS_FORM.getRange(formRow, 1, 1, SETLIST_FORM_NUM_COLS)
        .getValues()[0];

    if (!currentRow[SETLIST_FORM_TITLE_COL-1]) {
        sendAlert("You must select a title in this row to add it");
        return;
    }

    // let's get the title
    let addTitle = currentRow[SETLIST_FORM_TITLE_COL-1];

    let masterData = MASTER_SHEET.getDataRange().getValues();
    masterData.splice(0, MASTER_NUM_MENU_ROWS);

    // filter
    let filteredTitles = masterData.filter(title => {
        if (title[MASTER_TITLE_COL] == addTitle) {
            return true;
        }
        return false;
    });

    try {

        if (filteredTitles.length == 1) {
            let addedTitle = new Title2by( filteredTitles[0][MASTER_ID_COL]);

            SETLISTS_FORM.getRange(formRow, SETLIST_FORM_ACTION_COL).setValue('');

            SETLISTS_FORM.getRange(formRow, SETLIST_FORM_ID_COL).setValue(addedTitle.id);

            // put the available parts here
            let availablePartsCell = SETLISTS_FORM.getRange(formRow, SETLIST_FORM_PARTS_COL);
            let parts = '';

            for (let i=0; i<addedTitle.scores.length; i++) {
                parts += addedTitle.scores[i][SCORES_TYPE_COL] + "\n";
            }

            availablePartsCell.setValue(parts.slice(0, -1));
        
            let myTitles = SETLISTS_FORM.getRange(
                SETLIST_FORM_START_ROW,
                SETLIST_FORM_ID_COL,
                SETLISTS_FORM.getLastRow() - SETLIST_FORM_START_ROW + 1,
                1
            ).getValues().flat();

            let newDropDownTitles = getTitles({
                type: "Repertoire",
                exclude: myTitles
            });

            // lastRow
            let nextRow = SETLISTS_FORM.getLastRow() + 1;
            
            let newActionRule = SpreadsheetApp.newDataValidation()
                .requireValueInList(['Remove from setlist'])
                .setAllowInvalid(false)
                .build();

            let oldActionRule = SpreadsheetApp.newDataValidation()
                .requireValueInList(['Add to setlist'])
                .setAllowInvalid(false)
                .build();
            
            SETLISTS_FORM.getRange(formRow, SETLIST_FORM_ACTION_COL)
                .setDataValidation(newActionRule);

            let titlesRule = SpreadsheetApp.newDataValidation()
                .requireValueInList(newDropDownTitles)
                .setAllowInvalid(false)
                .build();

            SETLISTS_FORM.getRange(nextRow, SETLIST_FORM_TITLE_COL)
                .setDataValidation(titlesRule);
            SETLISTS_FORM.getRange(nextRow, SETLIST_FORM_ACTION_COL)
                .setDataValidation(oldActionRule);

            SETLISTS_FORM.getRange(
                formRow,
                1,
                1,
                SETLIST_FORM_NUM_COLS
            ).setVerticalAlignment('top');

        }
        else {
            sendAlert ("Two titles match");
            return;
        }


    } catch (error) {
        sendAlert ("Error adding this title: " + error);
        setListStatus.setValue("Error adding this title: " + error);
    }

    
}