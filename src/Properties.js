import image1 from './img/house-1.jpg'
import image2 from './img/house-2.jpg'
import image3 from './img/house-3.jpg'
import { PropertyUrl } from './Constants'
export const fetchData = async (searchInput, pageNumber) => {
  try {
    const objects = []
    let i = 0
    console.log('Loading:', searchInput)
    const encodedPathParam = encodeURIComponent(searchInput)
    const params = new URLSearchParams({ page: pageNumber })
    const url = PropertyUrl + `${encodedPathParam}?${params.toString()}`
    console.log(url)
    // move to config!
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    const responseList = JSON.parse(data.response.replace(/'/g, '"'))
    console.log(responseList)

    const objs = responseList.map((item, index) => {
      const [city, link, zipcode, address, price] = item
      const img = index % 2 === 0 ? image1 : image2
      return {
        city,
        link,
        zipcode,
        address,
        price,
        img
      }
    })
    objects.push(...objs)
    console.log(objects)
    return objects
  } catch (error) {
    console.error('Error:', error)
    // handle error here
  }
}
