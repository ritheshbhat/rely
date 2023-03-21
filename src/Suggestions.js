import { SuggestionUrl } from './Constants'

export const fetchSearchSuggestions = async (
  searchInput,
  setSearchSuggestions
) => {
  if (searchInput.length !== 0) {
    const url = SuggestionUrl + `${searchInput}`
    console.log(url)
    const response = await fetch(url)
    const data = await response.json()
    setSearchSuggestions(data['response'])
  }
}
