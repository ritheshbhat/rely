import React from 'react'
import { useRef, useEffect } from 'react'
const Suggestion = ({
  searchInput,
  pageNumber,
  searchSuggestions,
  setSearchSuggestions,
  handleClick,
  handleSuggestionClick,
  handleInputChange,
  handleBlur
}) => {
  const suggestionRef = useRef(null)
  useEffect(() => {
    // Add event listener to document to hide suggestion box when user clicks outside of it
    const handleClickOutside = event => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target)
      ) {
        setSearchSuggestions([])
      }
    }

    document.addEventListener('click', handleClickOutside)

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [setSearchSuggestions])
  return (
    <div className='center' ref={suggestionRef}>
      <input
        className={'nosubmit'}
        type='search'
        id={'search'}
        value={searchInput}
        placeholder='Search...'
        onChange={handleInputChange}
        // onBlur={handleBlur} //this is taken care by handleSuggestionClick.
      />
      &nbsp;&nbsp;&nbsp;
      <button
        className={'Search'}
        onClick={() => handleClick(pageNumber, searchInput)}
      >
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
