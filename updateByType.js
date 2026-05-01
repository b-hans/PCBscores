function updateByType ( ) {

    try {
        
        const currentStatus = getStatus();
        const masterStatusCell = MASTER_SHEET.getRange(MASTER_STATUS_CELL);

        if (currentStatus != '' && currentStatus != "NONE") {
            sendAlert ("Check status: " + currentStatus);
            return false;
        }

        setStatus("UPDATING_DOC_TYPE");

        masterStatusCell.setValue("Updating list by type....");

        listByType();

        setStatus("NONE");
        masterStatusCell.setValue("Successfully updated type listing!");

        return true;
    }
    catch (error) {
        sendAlert ("Error updating by type: " + error);
        return false;
    }

}