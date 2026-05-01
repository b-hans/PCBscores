function updatePartDocs ( params ) {
    try {
        
        let partDocRow = partDocExists ( params );

        let docId;

        if (!partDocRow) {
            // get a new document id
            docId = getNewDocumentId();
            partDocRow = CDF_PARTS_SHEET.getLastRow() + 1;

            let insertValues = [
                docId,
                params.title_id,
                params.part_type,
                params.doc_url
            ];

            CDF_PARTS_SHEET.getRange(partDocRow, 1, 1, 4).setValues([insertValues]);
            
        }
        else {
            CDF_PARTS_SHEET.getRange(partDocRow, CDF_PARTS_URL_COL+1)
                .setValue(params.doc_url);
        }

        return true;

    }
    catch (error) {
        sendAlert ("Error updating parts doc: " + error);
        return false;
    }
}