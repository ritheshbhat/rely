import React, { useState, useEffect } from 'react'
import { pageSize } from './Constants'
import { paginateArray } from './Pagination'
import { fetchData, fetchSearchSuggestions } from './Suggestions'
import Footer from './ui_elements/Footers'
import Header from './ui_elements/Header'
import Search from './ui_elements/Search'
import Suggestion from './ui_elements/Suggestions'
import 'bootstrap/dist/css/bootstrap-grid.min.css'

const Table = ({ data }) => {
  return (
    <div className='locations'>
      {data.map(item => (
        <div className='parent' onClick=''>
          <div
            className='child'
            style={{ backgroundImage: `url(${item.img})` }}
          >
            <a href='#'>{item.price}</a>
            <a href='#'>{item.address}</a>
            <a href='#'>{item.url}</a>
          </div>
        </div>
      ))}
    </div>
  )
}

function SearchBar () {
  const [currentPage, setCurrentPage] = useState(1)
  const [objectList, setData] = useState([])
  const paginatedData = paginateArray(objectList, pageSize, currentPage)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [searchSuggestions, setSearchSuggestions] = useState([])

  const [showTable, setShowTable] = useState(false)

  const handleClick = async pageNumber => {
    setCurrentPage(pageNumber)
    const objectList = await fetchData()
    setShowTable(true)
  }

  useEffect(() => {
    fetchSearchSuggestions(searchInput, setSearchSuggestions)
  }, [searchInput])

  const handleInputChange = event => {
    setSearchInput(event.target.value)
  }

  const handleSearch = () => {
    console.log('Search query:', searchQuery)
    // Perform search functionality here
    const pageData = objectList.slice((currentPage - 1) * 3, currentPage * 3)
    // Perform search functionality here
    // console.log('Page data:', pageData)
    setData(pageData)
  }

  // const handleBlur = () => {
  //     // Clear the suggestions when the input loses focus
  //     // setSearchSuggestions([]);
  // };

  const handlePageChange = page => {
    setCurrentPage(page)
    const pageData = objectList.slice((page - 1) * 3, page * 3)
    setData(pageData)
  }

  const handleSuggestionClick = suggestion => {
    console.log('Suggestion:', suggestion)
    setSearchInput(suggestion)
    setSearchSuggestions([])
  }

  return (
    <div>
      <Header />
      <Suggestion
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        searchSuggestions={searchSuggestions}
        setSearchSuggestions={setSearchSuggestions}
        handleClick={handleClick}
        handleSuggestionClick={handleSuggestionClick}
        handleInputChange={handleInputChange}
      />
      <Search
        searchInput={searchInput}
        handleInputChange={handleInputChange}
        handleClick={handleClick}
        searchSuggestions={searchSuggestions}
        handleSuggestionClick={handleSuggestionClick}
      />
      {showTable && <Table data={paginatedData} />}
      <br />
      <button className={'Prev'} onClick={() => handleClick(currentPage - 1)}>
        Prev
      </button>{' '}
      &nbsp;
      <button className={'Next'} onClick={() => handleClick(currentPage + 1)}>
        Next
      </button>
      <Footer />
    </div>
  )
}

export default SearchBar
