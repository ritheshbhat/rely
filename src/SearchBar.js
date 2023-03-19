import 'bootstrap/dist/css/bootstrap-grid.min.css';
import React, { useState, useEffect } from 'react';
import { paginateArray } from './Pagination';
import image1 from './img/house-1.jpg';
import image2 from './img/house-2.jpg';
import image3 from './img/house-3.jpg'
import twitterImage from './img/twitter.png';
import facebookImage from './img/facebook.png';
import instagramImage from './img/instagram.png';
import { fetchData, fetchSearchSuggestions  } from './Suggestions';
import Sb from './ui_elements/SearchBar';
import Header from './ui_elements/Header';

const Table = ({ data }) => {
    return (
        <div className="locations">
            {data.map((item) => (
                <div className="parent"  onClick="">
                    <div className="child" style={{ backgroundImage: `url(${item.img})` }}>
                        <a href="#">{item.price}</a>
                        <a href="#">{item.address}</a>
                        <a href="#">{item.url}</a>
                    </div>
                </div>
            ))}
        </div>
    );
};


function SearchBar() {

    const [currentPage, setCurrentPage] = useState(1);
    const [objectList, setData] = useState([]);
    const pageSize = 2;
    const paginatedData = paginateArray(objectList, pageSize, currentPage);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const totalPages = Math.ceil(objectList.length / 3);


    // const [data, setData] = useState([
    //     {id: 1, name: 'John', img: 'https://cdn.pixabay.com/photo/2016/10/26/19/00/domain-names-1772243_960_720.jpg' },
    //     {id: 2, name: 'Mary', img: image2 },
    //     {id: 3, name: 'Jane', img: image3 },
    //     {id: 4, name: 'Bob', img: image2 },
    //     {id: 5, name: 'Tom', img: image1 },
    //     {id: 6, name: 'Henry', img: image3 },
    // ]);

    const [showTable, setShowTable] = useState(false);

    const handleClick = async (pageNumber) => {
        setCurrentPage(pageNumber);
        const objectList = await fetchData();
        setShowTable(true);
      };


useEffect(() => {
    fetchSearchSuggestions(searchInput, setSearchSuggestions);
  }, [searchInput]);

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };


    const handleSearch = () => {
        console.log('Search query:', searchQuery);
        // Perform search functionality here
        const pageData = objectList.slice((currentPage - 1) * 3, currentPage * 3);
        // Perform search functionality here
        console.log('Page data:', pageData);
        setData(pageData);
    };

    // const handleBlur = () => {
    //     // Clear the suggestions when the input loses focus
    //     // setSearchSuggestions([]);
    // };


    const handlePageChange = (page) => {
        setCurrentPage(page);
        const pageData = objectList.slice((page - 1) * 3, page * 3);
        setData(pageData);
    };

    const handleSuggestionClick = (suggestion) => {
        console.log('Suggestion:', suggestion);
        setSearchInput(suggestion);
        setSearchSuggestions([]);
      };

      
    return (
        <div>
                <div>
                    <Header />
                </div>

        <div>
        <Sb
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            searchSuggestions={searchSuggestions}
            setSearchSuggestions={setSearchSuggestions}
            handleClick={handleClick}
            handleSuggestionClick={handleSuggestionClick}
            handleInputChange={handleInputChange}
        />
        
        </div>



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
            {showTable && <Table data={paginatedData} />}

            <br />
            <button className={"Prev"} onClick={() => handleClick(currentPage - 1)}>Prev</button> &nbsp;
            <button className={"Next"} onClick={() => handleClick(currentPage + 1)}>Next</button>


            <div className={"footer"}>
                <div className={"footer-left"}>
                    <p>Copyrights 2023
                        All Rights Reserved</p>
                </div>


                <div className={" footer-right"}>
                    Follow Us &nbsp;
                    <a href="#blank"> <img src={instagramImage} />  &nbsp; </a>
                    <a href="#blank"> <img src={twitterImage} /> &nbsp;</a>
                    <a href="#blank"> <img src={facebookImage} /> &nbsp;</a>

                </div>
            </div>
        </div>
    );
}

export default SearchBar;