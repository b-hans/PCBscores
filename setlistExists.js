function setlistExists ( setlistName, id = null ) {
 
    // get the setlist names

    if (SETLISTS_SHEET.getLastRow() < 2) {
        return false;
    }

    const setListData = SETLISTS_SHEET.getDataRange().getValues();
        setListData.splice (0, SETLISTS_MENU_ROWS);
    let filteredData;

    if (id) {
        filteredData = setListData.filter (setlist => {
            if (setlist[SETLISTS_ID_COL] == id) {
                return false;
            }
            return true;
        });
    }
    else {
        filteredData = setListData;
    }
    
    const setlistNames = filteredData.map (setlist => {
        return setlist[SETLISTS_NAME_COL].toLowerCase();
    });

    return setlistNames.includes(setlistName.toLowerCase());

}