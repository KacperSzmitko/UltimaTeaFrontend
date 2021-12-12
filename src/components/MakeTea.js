import React from 'react'
import OwnRecipesList from './OwnRecipesList';

function MakeTea() {
    return (
      <div>
        <OwnRecipesList recipes_per_page={3} is_favourite={true} first_blank={false} />
      </div>
    );
}

export default MakeTea
