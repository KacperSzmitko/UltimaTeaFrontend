import React from 'react'
import { IoMdClose } from "react-icons/io";
import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  CHANGE_EDIT_TAB_STATUS,
  CHANGE_CREATE_TAB_STATUS,
  CHANGE_MAKE_TEA_TAB_STATUS,
} from "../actions/types";

function CreateOrEditIcons() {
    const dispach = useDispatch();
    const editTabActive = useSelector((state) => state.main.edit_tab_active)
    const createTabActive = useSelector((state) => state.main.create_tab_active)
    const makeTeaTabActive = useSelector(
      (state) => state.main.make_tea_tab_active
    );

    function onClick() {
        if (editTabActive){
            dispach({type:CHANGE_EDIT_TAB_STATUS, payload: {status: false, id: null}})
        }
        if (createTabActive){
            dispach({type:CHANGE_CREATE_TAB_STATUS, payload: {status: false}})
        }
        if (makeTeaTabActive){
          dispach({
            type: CHANGE_MAKE_TEA_TAB_STATUS,
            payload: { status: false, id: null },
          });
        }
    }

    return (
      <div id="ce_icon_set">
        <IconContext.Provider
          value={{
            className: "icon",
            size: 40,
          }}
        >
          <div id="ce_icon_container" onClick={() => onClick()}>
            {" "}
            <IoMdClose style={{ color: "red" }} />
          </div>
        </IconContext.Provider>
      </div>
    );
}

export default CreateOrEditIcons
