function menuTrigger(e) {

  try {
    
    const range = e.range;
    const sheet = range.getSheet();

    let menuCell;

    switch (sheet.getName()) {

      case "Master":
        menuCell = MASTER_SHEET.getRange(MASTER_MENU_CELL);

        switch (menuCell.getValue()) {
          case "Update by title":
            menuCell.setValue('Menu');
            updateByTitle();
            break;

          case "Update by num":
            menuCell.setValue('Menu');
            updateByNumber();
            break;

          case "Update by type":
            menuCell.setValue('Menu');
            updateByType();
            break;

          case "List by title":
            menuCell.setValue("Menu");
            listByTitle();
            break;

          case "List by no.":
            menuCell.setValue("Menu");
            listByTitle("number");
            break;
          
          case "List by type":
            menuCell.setValue("Menu");
            listByType();
            break;

          case "Sort by title":
            menuCell.setValue("Menu");
            sortMaster("title");
            break;

          case "Sort by id":
            menuCell.setValue("Menu");
            sortMaster('id');
            break;

          case "Sort by 2by2bas No.":
            menuCell.setValue("Menu");
            sortMaster('number');
            break;

          case "New setlist":
            menuCell.setValue("Menu");
            newSetlist();
            break;

          default:
            if (e.range.getValue() == "Edit master title") {        
              editTitle();
            }
            else if (e.range.getValue() == "Delete master title") {
              confirmDeleteTitle( e.range.getRow());
            }
            return;
        }

        break;

      case "Input":
        menuCell = TITLE_SHEET.getRange(TITLE_MENU_CELL);
        const scoreType = TITLE_SHEET.getRange(INPUT_SCORE_TYPE).getValue();

        if(scoreType) {
          doUpload();
          return;
        }
        
        if (menuCell.getValue() == "Add") {
          clearSearch();
          menuCell.setValue('Menu');
          addTitle();
        }
        else if (menuCell.getValue() == "Enter") {
          clearSearch();
          menuCell.setValue('Menu');
          enterTitle();
        }
        else if (menuCell.getValue() == "Search title") {
          menuCell.setValue('Menu');
          searchTitle();
        }
        else if (menuCell.getValue() == "Search no.") {
          menuCell.setValue('Menu');
          searchNum();
        }
        else if (menuCell.getValue() == "Cancel") {
          menuCell.setValue('Menu');
          cancel();

        }
        else if (menuCell.getValue() == "Upload score") {
          menuCell.setValue('Menu');
          uploadScore();
        }
        else if (e.range.getValue() == "Edit this title") {
          editTitle();
        }
        else if (e.range.getValue() == "Delete this pdf") {
          deleteScore();
        }
        else if (e.range.getValue() == "Delete this document") {
          deleteDocument(e);        
        }
        else if (e.range.getValue() == "Create document") {
          menuCell.setValue('Menu');
          return createDocument ();
        }
        else if (e.range.getValue() == "Rebuild form") {
          return rebuildInputForm();
        }
        else {
          return;
        }

        break;

      case "Setlist input":
        let actionsMenu = SETLISTS_FORM.getRange(SETLIST_FORM_ACTIONS_RANGE);

        if (e.range.getValue() == "Add to setlist") {
          return addToSetlist(e);
        }
        else if (e.range.getValue() == "Remove from setlist") {
          return removeFromSetlist(e);
        }
        else if (e.range.getValue() == "Rebuild form") {
          return rebuildSetlistInputForm();
        }
        else if (e.range.getValue() == "Enter") {
          actionsMenu.setValue('Actions');
          return enterSetlist();
        }
        else if (e.range.getValue() == "Create/edit part") {
          actionsMenu.setValue('Actions');
          return createPart ();
        }
        else if (e.range.getValue() == "Cancel") {
          actionsMenu.setValue('Actions');
          return cancelSetlist ();
        }
        else if (e.range.getValue() == "Print part") {
          actionsMenu.setValue('Actions');
          return makePrintPart ( );
        }
        else if (e.range.getValue() == "Remove part") {
          actionsMenu.setValue('Actions');
          return removePart();
        }
        else if (e.range.getValue() == "Update parts cell") {
          actionsMenu.setValue('Actions');
          return updatePartsCell();
        }

        break;

      case "Setlists":
        if (e.range.getValue() == "Delete this setlist") {
          deleteSetlist(e);
        }
        else if (e.range.getValue() == "Edit this setlist") {
          editSetlist(e);
        }
        break;

      case "Score document form":
        if (e.range.getValue() == "Cancel") {
          e.range.setValue('Choose an action');
          return cancelCreateDocument();
        }
        else if (e.range.getValue() == "Make document") {
          e.range.setValue('Choose an action');
          return makeDocument();
        }
        else if (e.range.getA1Notation() == "C7") {
          return makePartFolder(e);
        }
        break;

      default:
        return;
    }

  }
  catch (error) {
    sendAlert ("error in menu trigger: " + error);
    return false;
  }

  
  
}
