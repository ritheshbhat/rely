import React, { useState, useEffect } from 'react'
import { pageSize } from './Constants'
import { paginateArray } from './Pagination'
import { fetchData, fetchSearchSuggestions } from './Suggestions'
import Footer from './ui_elements/Footers'
import Header from './ui_elements/Header'
import Suggestion from './ui_elements/Suggestions'
import 'bootstrap/dist/css/bootstrap-grid.min.css'

// const Table = ({ data }) => {
//   return (
//     <div className='locations'>
//       {data.map(item => (
//         <div className='parent' onClick=''>
//           <div
//             className='child'
//             style={{ backgroundImage: `url(${item.img})` }}
//           >
//             <a href='#'>{item.price}</a>
//             <a href='#'>{item.address}</a>
//             <a href='#'>{item.link}</a>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

const Table = ({ data }) => {
  return (
    // <div className='locations'>
    //   {data.map(item => (
    //     <div className='parent' onClick=''>
    //       <div
    //         className='child'
    //         style={{ backgroundImage: 'url(' + item.img + ')' }}
    //       >
    //         <div className={'footerImage'}>
    //           <a href='#'>{item.name}</a>
    //           <br />
    //           <a href='#'>{item.address}</a>
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </div>
    <div>
      {data.map(item => (
        <div>
          <div className='responsive'>
            <div className='gallery'>
              <a>
                <img src={item.img} style={{ width: 500, height: 300 }} />
              </a>
              <div className='desc'>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                  {item.price}
                </div>
                <div style={{ fontSize: '12px' }}>{item.zipcode}</div>
                <div style={{ fontSize: '11px', wordWrap: 'break-word' }}>
                  {item.address}
                </div>
              </div>
            </div>
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

  const handleClick = async (pageNumber, searchInput) => {
    console.log('pno, si', pageNumber, searchInput)
    setCurrentPage(pageNumber)
    const d = await fetchData(searchInput)
    objectList.push(d)
    setData(objectList)

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

  const handlePageChange = page => {
    setCurrentPage(page)
    const pageData = objectList.slice((page - 1) * 3, page * 3)
    setData(pageData)
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
        setSearchInput={setSearchInput}
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
