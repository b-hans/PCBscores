function updateAll () {
    let currentStatus = getStatus();
    const masterStatusCell = MASTER_SHEET.getRange(MASTER_STATUS_CELL);

    let docLinks = [
        {
            linkText: "List by title",
            documentName: LIST_ALPHA_NAME,
            documentUrl: ''
        },
        {
            linkText: "List by number",
            documentName: LIST_NUM_NAME,
            documentUrl: ''
        },
        {
            linkText: "List by type",
            documentName: LIST_TYPE_NAME,
            documentUrl: ''
        }
    ];

    if (currentStatus != '' && currentStatus != 'NONE') {
        sendAlert ("Check status: " + currentStatus);
        return;
    }

    setStatus("UPDATING_DOC_ALPHA");

    masterStatusCell.setValue("Updating list by title....");

    // update the title list
    try {
        let listDoc = listByTitle();
        docLinks[0].documentUrl = listDoc.getUrl();
        setStatus("UPDATING_DOC_NUMBER");
        masterStatusCell.setValue("Updating list by number....");
        return;
    } catch (error) {
        sendAlert ("Error updating list by title: " + error.message);
        masterStatusCell.setValue ( "Error updating list by title: " + error.message );
        setStatus('');
        return;
    }

    // update the title list by number
    try {
        let listDoc = listByTitle("number");
        docLinks[1].documentUrl = listDoc.getUrl();
        setStatus("UPDATING_DOC_TYPE");
        masterStatusCell.setValue("Updating list by type....")
    } catch (error) {
        sendAlert ("Error updating list by number: " + error.message);
        masterStatusCell.setValue( "Error updating list by number: " + error.message );
        setStatus('');
        return;
    }

    try {
        let listDoc = listByType();
        docLinks[2].documentUrl = listDoc.getUrl();
        setStatus("UPDATING_LINKS");
        masterStatusCell.setValue("Updating links....")

    } catch (error) {
        sendAlert ("Error updating list by type: " + error.message);
        masterStatusCell.setValue( "Error updating list by type: " + error.message );
        setStatus('');
        return;

    }

    try {

        const richText = SpreadsheetApp.newRichTextValue()
            .setText(docLinks[0].linkText + "\n" + 
                docLinks[1].linkText + "\n" +
                docLinks[2].linkText)
            .setLinkUrl(0, 13, docLinks[0].documentUrl)
            .setLinkUrl(14, 28, docLinks[1].documentUrl)
            .setLinkUrl(29, 41, docLinks[2].documentUrl)
            .build();

        MASTER_SHEET.getRange(MASTER_LINKS_CELL).setRichTextValue(richText);

    } catch (error) {
        sendAlert ("Error updating list links: " + error.message);
        masterStatusCell.setValue ("Error updating list links: " + error.message);
        setStatus('');
        return;
    }

    masterStatusCell.setValue("Success!")
    setStatus('');

}