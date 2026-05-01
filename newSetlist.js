function newSetlist() {

    const currentStatus = getStatus();
    const masterStatus = MASTER_SHEET.getRange(MASTER_STATUS_CELL);
    const formStatus = SETLISTS_FORM.getRange(SETLIST_FORM_STATUS_CELL);

    if ( currentStatus != '' && currentStatus != "NONE") {
        sendAlert ("Check status: " + currentStatus);
        return;
    }

    setStatus("NEW_SETLIST");
    masterStatus.setValue ("Create new setlist");

    // get the next id for use
    try {

        let newId;

        let idsCol = SETLISTS_SHEET.getRange (
            SETLISTS_FIRST_ROW, 
            SETLISTS_ID_COL+1,
            SETLISTS_SHEET.getLastRow() - SETLISTS_MENU_ROWS + 1,
            1
        ).getValues().flat();

        if (idsCol.length < 1) {
            newId = 1;
        }
        else {
            newId = Math.max(...idsCol) + 1;
        }

        SETLISTS_FORM.getRange(SETLIST_FORM_ID_CELL).setValue(newId);
        formStatus.setValue ("New setlist....");
        SETLISTS_FORM.activate();
        SETLISTS_FORM.getRange(SETLIST_FORM_NAME_CELL).activate();

    } catch (error) {
        sendAlert ("Error getting id: " + error);
        masterStatus.setValue("Error getting id: " + error);
        setStatus('');
    }


    // get the titles for dropdown
    let titles = MASTER_SHEET.getDataRange().getValues();
    titles.splice(0, MASTER_NUM_MENU_ROWS);

    let repertoire = titles.filter(title => {
        if (title[MASTER_TYPE_COL] == "Repertoire") {
            return true;
        }
        return false;
    });

    repertoire.sort((a, b) => {
        if (a[MASTER_TITLE_COL] == b[MASTER_TITLE_COL]) {
            return 0;
        }
        else {
            return a[MASTER_TITLE_COL] < b[MASTER_TITLE_COL] ? -1 : 1;
        }
    });

    // let's construct a dropdown

    try {
        let repTitlesOnly = repertoire.map (titleRow => {
            return titleRow[MASTER_TITLE_COL];
        });

        let firstRange = SETLISTS_FORM.getRange(
            SETLIST_FORM_START_ROW,
            SETLIST_FORM_TITLE_COL
        );

        let rule = SpreadsheetApp.newDataValidation()
            .requireValueInList(repTitlesOnly)
            .setAllowInvalid(false)
            .build();

        firstRange.setDataValidation(rule);

        let actions = ['Add to setlist'];

        let actionsRule = SpreadsheetApp.newDataValidation()
            .requireValueInList(actions)
            .setAllowInvalid(false)
            .build();

        let firstActionRule = SETLISTS_FORM.getRange(
            SETLIST_FORM_START_ROW,
            SETLIST_FORM_ACTION_COL
        );

        firstActionRule.setDataValidation(actionsRule);

    } catch (error) {
        sendAlert("Error getting titles: " + error);
        formStatus.setValue("Error getting title: " + error);
        return;
    }

}