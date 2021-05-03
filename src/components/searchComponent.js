import React from 'react'
import './searchComponent.css'

function SearchComponent(){
    return(
        <div className="body_header">
                        <nav>
    <div className="nav-wrapper">
      <form>
        <div className="input-field">
          
          <input id="search" type="search" required />
          
          <label className="label-icon" for="search" placeholder="search here"><i className="material-icons" >search</i></label>
          
          <i className="material-icons">close</i>
          
        </div>
      </form>
    </div>
  </nav>
</div>
    )
}
export default SearchComponent