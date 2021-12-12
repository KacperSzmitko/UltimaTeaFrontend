import React from 'react'
import NavItem from './NavItem'
export default function NavBar() {
    return (
      <div>
        <NavItem text="Przytoguj herbatę" link="make_tea" id="make_tea" />
        <NavItem text="Edytuj przepis" link="edit_recipes" id="edit_recipes" />
        <NavItem
          text="Przeglądaj przepisy"
          link="public_recipes"
          id="public_recipes"
        />
        <NavItem
          text="Edytuj składniki"
          link="edit_containers"
          id="edit_containers"
        />
        <NavItem
          text="Status urządzenia"
          link="machine_status"
          id="machine_status"
        />
        <NavItem text="Edytuj profil" link="edit_profile" id="eidt_profile" />
      </div>
    );
}
