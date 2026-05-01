function getNewDocumentId() {
    try {

        const docData = CDF_PARTS_SHEET.getRange("A:A").getValues().flat();
        const filtered = docData.filter(item => {
            if (!item || item == 'document_id') {
                return false;
            }

            return true;
        });

        if (filtered.length <= 0) {
            return 1;
        }
        else {
            return Math.max(...filtered) + 1;
        }


    }
    catch (error) {
        sendAlert ("Error getting new id: " + error);
        return false;
    }
}