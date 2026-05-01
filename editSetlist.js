function editSetlist ( e ) {
    const setlistRow = e.range.getRow();
    const currentStatus = getStatus();

    if (currentStatus != '' && currentStatus != "NONE") {
        sendAlert("Check status: " + currentStatus);
        SETLISTS_SHEET.getRange(setlistRow, SETLISTS_ACTION_COL+1).setValue('');
        return;
    }

    setStatus ('EDIT_SETLIST');

    const setlistId = SETLISTS_SHEET.getRange(setlistRow, SETLISTS_ID_COL+1)
        .getValue();

    const mySetlist = new Setlist(setlistId);

    mySetlist.editForm();

    SETLISTS_FORM.activate();
    
    SETLISTS_SHEET.getRange(setlistRow, SETLISTS_ACTION_COL+1).setValue('');
}