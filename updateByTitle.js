function updateByTitle ( ) {

    try {
        
        const currentStatus = getStatus();
        const masterStatusCell = MASTER_SHEET.getRange(MASTER_STATUS_CELL);

        if (currentStatus != '' && currentStatus != "NONE") {
            sendAlert ("Check status: " + currentStatus);
            return false;
        }

        setStatus("UPDATING_DOC_ALPHA");

        masterStatusCell.setValue("Updating list by title....");

        listByTitle();

        setStatus("NONE");
        masterStatusCell.setValue("Successfully updated title listing!");

        return true;
    }
    catch (error) {
        sendAlert ("Error updating by title: " + error);
        return false;
    }
}