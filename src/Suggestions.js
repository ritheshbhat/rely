// import React, { useState, useEffect } from 'react';

// export const Suggestions = ({ onInputChange }) => {
//     const [searchInput, setSearchInput] = useState('');
//     const [searchSuggestions, setSearchSuggestions] = useState([]);

//     useEffect(() => {
//         const fetchSearchSuggestions = async () => {
//             if (searchInput.length != 0) {
//                 const response = await fetch(`http://127.0.0.1:9095/rely/apis/v1/suggestion/${searchInput}`);
//                 const d = await response.json();
//                 console.log("d is", d["response"]);
//                 setSearchSuggestions(d["response"]);
//             }
//         };

//         fetchSearchSuggestions();
//     }, [searchInput]);

//     const handleInputChange = (event) => {
//         setSearchInput(event.target.value);
//         onInputChange(event.target.value);
//     };


// };
