import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart, AiOutlineEdit } from "react-icons/ai";
import { MdPublicOff, MdPublic } from "react-icons/md";
import { IconContext } from "react-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { favouritesEdit, deleteOwnRecipe, changePublicStatus } from "../actions/mainWindowsActions";
import { CHANGE_EDIT_TAB_STATUS } from "../actions/types";

var classNames = require("classnames");

function EditIconSet({
  favourite = false,
  hidden = false,
  is_public = false,
  recipeId,
}) {
  const [isFavourite, setIsFavourite] = useState(favourite);
  const setClasses = classNames({ hidden: hidden }, "edit_icon_set");
  const dispach = useDispatch();

  function onHeartClick() {
    dispach(favouritesEdit(recipeId, !isFavourite));
    if (isFavourite) {
      setIsFavourite(false);
    } else {
      setIsFavourite(true);
    }
  }

  function onTrashClick() {
    dispach(deleteOwnRecipe(recipeId));
  }

  function onEditClick() {
    dispach({
      type: CHANGE_EDIT_TAB_STATUS,
      payload: { status: true, id: recipeId },
    });
  }

  function onPublicClick() {
    dispach(changePublicStatus(recipeId, !is_public));
  }

  return (
    <div className={setClasses}>
      <IconContext.Provider
        value={{
          className: "icon",
          size: 27,
        }}
      >
        <div className="icon_container" onClick={() => onHeartClick()}>
          {isFavourite ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
        </div>
        <div className="icon_container" onClick={() => onEditClick()}>
          <AiOutlineEdit />
        </div>
        <div className="icon_container" onClick={() => onTrashClick()}>
          <BsFillTrashFill color="grey" />
        </div>
        {is_public ? (
          <div className="icon_container" onClick={() => onPublicClick()}>
            <MdPublicOff />
          </div>
        ) : (
          <div className="icon_container" onClick={() => onPublicClick()}>
            <MdPublic />
          </div>
        )}
      </IconContext.Provider>
    </div>
  );
}

export default EditIconSet;
