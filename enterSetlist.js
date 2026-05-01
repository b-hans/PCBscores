function enterSetlist ( clearForm = null ) {

    const setlistFormStatus = SETLISTS_FORM.getRange(SETLIST_FORM_STATUS_CELL);

    // check status first
    let currentStatus = getStatus();

    if (currentStatus != "NEW_SETLIST" && currentStatus != "EDIT_SETLIST") {
        sendAlert ("Check status: " + currentStatus);
        setlistFormStatus.setValue ("Check status: " + currentStatus);
        return false;
    }

    let setlistName = "";
    let setlistId = null;
    let setlistTitles = [];

    // check active cell
    const currentCell = SETLISTS_FORM.getActiveCell();
    const currentA1 = currentCell.getA1Notation();

    switch (currentA1) {
        case SETLIST_FORM_NAME_CELL:
        case SETLIST_FORM_ID_CELL:
            sendAlert("Enter the current cell before continuing");
            setlistFormStatus.setValue("Move active cell");
            return false;

        default:
            break;
    }

    try {
        setlistName = SETLISTS_FORM.getRange(SETLIST_FORM_NAME_CELL).getValue();
        setlistId = SETLISTS_FORM.getRange(SETLIST_FORM_ID_CELL).getValue();

        if (!setlistName) {
            sendAlert("Setlist name is required");
            setlistFormStatus.setValue("Setlist name is required");
            return false;
        }

        // EDIT BUT CHANGE NAME CHECK
        if (currentStatus == "NEW_SETLIST" && setlistExists(setlistName)) {
            sendAlert("That setlist exists, select a different name");
            setlistFormStatus.setValue("That setlist exists, select a different name");
            return false;
        }
        else if (currentStatus == "EDIT_SETLIST" && setlistExists(setlistName, setlistId)) {
            sendAlert("That setlist exists, use a different name");
            setlistFormStatus.setValue("That setlist exists, use a different name");
            return false;

        }

        // get the id column
        if (SETLISTS_FORM.getLastRow() < SETLIST_FORM_START_ROW) {
            sendAlert("You need at least one title in the setlist to save");
            setlistFormStatus.setValue("You need at least one title in the setlist to save");
            return false;
        }
        else {
            setlistTitles = SETLISTS_FORM.getRange(
                SETLIST_FORM_START_ROW,
                SETLIST_FORM_ID_COL,
                SETLISTS_FORM.getLastRow() - SETLIST_FORM_START_ROW + 1,
                1
            ).getValues().flat();

            if (checkIfArrayContainsEmptyString(setlistTitles)) {
                sendAlert("Not all of the titles have been added\n" +
                    "ID field must be present for each title in the setlist"
                );
                setlistFormStatus.setValue("Not all of the titles have been added\n" +
                    "ID field must be present for each title in the setlist");
                return false;
            }
        }

        let mySetlist = {
            name: setlistName,
            id: setlistId,
            titles: setlistTitles
        }

        if (updateSetlist (mySetlist)) {

            let message = "";
            if (currentStatus == "NEW_SETLIST") {
                message = "New setlist added: ";
            }
            else if (currentStatus == "EDIT_SETLIST") {
                message = "Setlist edited: ";
            }
            MASTER_SHEET.getRange(MASTER_STATUS_CELL)
                .setValue(
                    message + mySetlist.name
                );

            if (currentStatus == "NEW_SETLIST") {
                setlistFormStatus.setValue ("Successfully entered new setlist!"); 
            }
            else {
                setlistFormStatus.setValue ("Successfully updated setlist!");
            }

            setStatus ('EDIT_SETLIST');

            return true;

        }
        else {
            sendAlert ("error entering the list");
            return false;
        }
        

    } catch (error) {
        sendAlert ("Error entering setlist: " + error);
        setlistFormStatus.setValue("Error entering setlist: " + error);
        return false;
    }

}