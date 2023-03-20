import image1 from './img/house-1.jpg'
import image2 from './img/house-2.jpg'
import image3 from './img/house-3.jpg'

export const fetchData = async searchInput => {
  try {
    const objectList = []
    let i = 0
    console.log('Loading:', searchInput)
    const encodedPathParam = encodeURIComponent(searchInput)
    const url = `http://127.0.0.1:9095/rely/apis/v1/dataset/${encodedPathParam}`
    console.log(url)
    // move to config!
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    const responseList = JSON.parse(data.response.replace(/^b'|'$/g, ''))
    console.log(responseList)
    const [city, link, zipcode, address, price] = responseList
    const img = image1

    const obj = {
      city,
      link,
      zipcode,
      address,
      price,
      img
    }

    console.log('objectList:', obj)
    return obj
  } catch (error) {
    console.error('Error:', error)
    // handle error here
  }
}

export const fetchSearchSuggestions = async (
  searchInput,
  setSearchSuggestions
) => {
  if (searchInput.length !== 0) {
    const url = `http://127.0.0.1:9095/rely/apis/v1/suggestion/${searchInput}`
    console.log(url)
    const response = await fetch(url)
    const data = await response.json()
    setSearchSuggestions(data['response'])
  }
}
