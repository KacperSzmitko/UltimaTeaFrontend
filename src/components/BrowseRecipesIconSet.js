import React from "react";
import { AiOutlineCopy } from "react-icons/ai";
import { IconContext } from "react-icons";

function BrowseRecipesIconSet({ recipeId }) {
function onCopyClick(){
    return 0;
}
  return (
    <div className="edit_icon_set">
      <IconContext.Provider
        value={{
          className: "icon",
          size: 27,
        }}
      >
        <div className="icon_container" onClick={() => onCopyClick()}>
          <AiOutlineCopy />
        </div>
      </IconContext.Provider>
    </div>
  );
}

export default BrowseRecipesIconSet;
