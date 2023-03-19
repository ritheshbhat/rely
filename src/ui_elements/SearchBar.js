import React from 'react';



const Sb = ({ searchInput, setSearchInput, searchSuggestions, setSearchSuggestions, handleClick, handleSuggestionClick,handleInputChange }) => {
    return(

<div className="center">
<input className={"nosubmit"} type="search" value={searchInput} placeholder="Search..."
    onChange={handleInputChange}
    // onBlur={handleBlur} //this is taken care by handleSuggestionClick.
/>&nbsp;&nbsp;&nbsp;
<button className={"Search"} onClick={() => handleClick(searchInput)}>Search </button>
<br />
  {searchSuggestions && searchSuggestions.length > 0 && (
<div className={"suggestion"}>
{searchSuggestions.map((suggestion) => (
<div key={suggestion} onClick={() => handleSuggestionClick(suggestion)} >{suggestion} </div>
))}
</div>
)}
</div>
    )
};
export default Sb;