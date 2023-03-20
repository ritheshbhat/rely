import React from 'react'

const Suggestion = ({
  searchInput,
  setSearchInput,
  searchSuggestions,
  setSearchSuggestions,
  handleClick,
  handleSuggestionClick,
  handleInputChange,
  handleBlur
}) => {
  return (
    <div className='center'>
      <input
        className={'nosubmit'}
        type='search'
        value={searchInput}
        placeholder='Search...'
        onChange={handleInputChange}
        // onBlur={handleBlur} //this is taken care by handleSuggestionClick.
      />
      &nbsp;&nbsp;&nbsp;
      <button className={'Search'} onClick={() => handleClick(1, searchInput)}>
        Search{' '}
      </button>
      <br />
      {searchSuggestions && searchSuggestions.length > 0 && (
        <div className={'suggestion'}>
          {searchSuggestions.map(suggestion => (
            <div
              className={'suggestionDropdown'}
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              onBlur={handleBlur}
            >
              {suggestion}{' '}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default Suggestion
