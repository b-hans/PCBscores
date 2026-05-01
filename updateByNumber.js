function updateByNumber ( ) {

    try {
        
        const currentStatus = getStatus();
        const masterStatusCell = MASTER_SHEET.getRange(MASTER_STATUS_CELL);

        if (currentStatus != '' && currentStatus != "NONE") {
            sendAlert ("Check status: " + currentStatus);
            return false;
        }

        setStatus("UPDATING_DOC_NUM");

        masterStatusCell.setValue("Updating list by number....");

        listByTitle("number");

        setStatus("NONE");
        masterStatusCell.setValue("Successfully updated number listing!");

        return true;
    }
    catch (error) {
        sendAlert ("Error updating by number: " + error);
        return false;
    }

}