function partExists ( partType, setlist_id ) {

    const partsData = SETLIST_DOCUMENTS.getDataRange().getValues();

    for (let i=SETLIST_DOCUMENTS_MENU_ROWS; i<partsData.length; i++) {
        let item = partsData[i];

        if (item[DOC_DATA_SETLIST_ID_COL] == setlist_id &&
            item[DOC_DATA_SETLIST_PART_COL] == partType
        ) {
                return true;
        }
            
        
    }

    return false;
    
}