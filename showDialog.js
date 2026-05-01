    function showDialog() {
      var html = HtmlService.createHtmlOutputFromFile('dialog')
          .setWidth(300)
          .setHeight(200);
      SpreadsheetApp.getUi().showModalDialog(html, 'My Dialog');
    }