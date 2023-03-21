import React, { useState, useEffect } from 'react'
import { pageSize } from './Constants'
import { paginateArray } from './Pagination'
import { fetchSearchSuggestions } from './Suggestions'
import { fetchData } from './Properties'
import Footer from './ui_elements/Footers'
import Header from './ui_elements/Header'
import Suggestion from './ui_elements/Suggestions'
import Table from './ui_elements/Table'
import 'bootstrap/dist/css/bootstrap-grid.min.css'

function SearchBar () {
  const [currentPage, setCurrentPage] = useState(1)
  const [objectList, setData] = useState([])
  const paginatedData = paginateArray(objectList, pageSize, currentPage)

  const [searchInput, setSearchInput] = useState('')
  const [searchSuggestions, setSearchSuggestions] = useState([])

  const [showTable, setShowTable] = useState(false)

  const handleClick = async (pageNumber, searchInput) => {
    // setShowTable(false)
    setData([])
    console.log('pno, si', pageNumber, searchInput)
    setCurrentPage(pageNumber)
    const response = await fetchData(searchInput, pageNumber)
    setData(response)
    setShowTable(true)
  }

  useEffect(() => {
    fetchSearchSuggestions(searchInput, setSearchSuggestions)
  }, [searchInput])

  const handleInputChange = event => {
    setSearchInput(event.target.value)
  }
  const handleBlur = () => {
    // Clear the suggestions when the input loses focus
    setSearchSuggestions([])
  }

  const handleSuggestionClick = suggestion => {
    setSearchSuggestions([])
    console.log('Suggestion:', suggestion)
    setSearchInput(suggestion)
  }

  return (
    <div>
      <Header />
      <Suggestion
        searchInput={searchInput}
        pageNumber={currentPage}
        searchSuggestions={searchSuggestions}
        setSearchSuggestions={setSearchSuggestions}
        handleClick={handleClick}
        handleBlur={handleBlur}
        handleSuggestionClick={handleSuggestionClick}
        handleInputChange={handleInputChange}
      />
      {showTable && <Table data={paginatedData} />}
      <br />
      <button
        className={'Prev'}
        onClick={() => handleClick(currentPage - 1, searchInput)}
      >
        Prev
      </button>{' '}
      &nbsp;
      <button
        className={'Next'}
        onClick={() => handleClick(currentPage + 1, searchInput)}
      >
        Next
      </button>
      <Footer />
    </div>
  )
}

export default SearchBar
