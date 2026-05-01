function partDocExists ( params ) {
    try {

        const partDocsData = CDF_PARTS_SHEET.getDataRange().getValues();

        if (partDocsData.length == CDF_PARTS_SHEET_NUM_MENU_ROWS) {
            return null;
        }
        
        for (let i=CDF_PARTS_SHEET_NUM_MENU_ROWS; i<partDocsData.length; i++) {
            let item = partDocsData[i];

            if (item[CDF_PARTS_TITLE_ID_COL] == params.title_id &&
                item[CDF_PARTS_PART_COL] == params.part_type
            ) {
                return i+1;
            }
        }

        return null;
    }
    catch (error) {
        sendAlert ("Error if part doc exists: " + error);
        return false;
    }
}