import 'bootstrap/dist/css/bootstrap-grid.min.css';
import React, { useState, useEffect } from 'react';
import { paginateArray } from './Pagination';
import image1 from './img/house-1.jpg';
import image2 from './img/house-2.jpg';
import image3 from './img/house-3.jpg'
import twitterImage from './img/twitter.png';
import facebookImage from './img/facebook.png';
import instagramImage from './img/instagram.png';

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

    // const [data, setData] = useState([
    //     {id: 1, name: 'John', img: 'https://cdn.pixabay.com/photo/2016/10/26/19/00/domain-names-1772243_960_720.jpg' },
    //     {id: 2, name: 'Mary', img: image2 },
    //     {id: 3, name: 'Jane', img: image3 },
    //     {id: 4, name: 'Bob', img: image2 },
    //     {id: 5, name: 'Tom', img: image1 },
    //     {id: 6, name: 'Henry', img: image3 },
    // ]);

    const fetchData = async () => {
        try {
            let i = 0;
            // move to config!
            const response = await fetch("http://127.0.0.1:9095/rely/apis/v1/dataset/sanfrancisco?pno=1")
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const d = await response.json();
            const data = d.response
                .replace(/\[b'/g, '["')
                .replace(/'\]/g, '"]')
                .replace(/',\s*b'/g, '", "')
                .replace(/\\'/g, "'");
            const responseList = JSON.parse(data)

            while (responseList.length - i >= 3) {
                const address = responseList[i].split(':')[1];
                const price = responseList[i + 1].split(':')[1];
                const url = responseList[i + 2].substring(responseList[i + 2].indexOf(':') + 1);
                let img = ""
                //async download of images from a repository
                if (i % 2 === 0) {
                    img = image1
                } else {
                    img = image2
                }


                const obj = {
                    i,
                    address,
                    price,
                    url,
                    img
                };

                console.log("obj img is", obj.img)

                objectList.push(obj);
                i += 3;
            }
            console.log("obj is", objectList)
            setData(objectList);

            // setShowTable(true);
        } catch (error) {
            console.error("Error:", error);
            // handle error here
        }
    };



    const [showTable, setShowTable] = useState(false);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        fetchData();
        setShowTable(true);
    };
    const pageSize = 2;
    const paginatedData = paginateArray(objectList, pageSize, currentPage);

    const [searchQuery, setSearchQuery] = useState('');


    const [searchInput, setSearchInput] = useState('');
    const [searchSuggestions, setSearchSuggestions] = useState([]);

    useEffect(() => {
        const fetchSearchSuggestions = async () => {
            if (searchInput.length != 0) {
            const s = searchInput
const url = `http://127.0.0.1:9095/rely/apis/v1/suggestion/${s}`;
console.log(url);

const response = await fetch(url);
                // const response = await fetch("http://127.0.0.1:9095/rely/apis/v1/suggestion/${searchInput}")
                const d = await response.json();
                console.log("d is",d)
                setSearchSuggestions(d["response"]);
            }
        };

        fetchSearchSuggestions();
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

    const totalPages = Math.ceil(objectList.length / 3);

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
            <header>
                <div className="header">
                    <a href="#" className="logo">
                    </a>
                    <a href="#" className="name" style={{ fontFamily: "Brush Script MT", fontSize: "30px" }}>Rely</a>
                    <div className="header-right">

                        <a href="#" className="onHover">Home</a>
                        <a href="#" className="onHover">About</a>
                        <a href="#" className="onHover">Login</a>
                        <a href="#" className="onHover">Register</a>
                        <a href="#" className="onHover">Location</a>

                    </div>
                </div>
            </header>
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