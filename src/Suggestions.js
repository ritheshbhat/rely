import image1 from './img/house-1.jpg';
import image2 from './img/house-2.jpg';
import image3 from './img/house-3.jpg'

export const fetchData = async () => {
    try {
      let i = 0;
      // move to config!
      const response = await fetch(
        "http://127.0.0.1:9095/rely/apis/v1/dataset/sanfrancisco?pno=1"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const d = await response.json();
      const data = d.response
        .replace(/\[b'/g, '["')
        .replace(/'\]/g, '"]')
        .replace(/',\s*b'/g, '", "')
        .replace(/\\'/g, "'");
      const responseList = JSON.parse(data);
  
      const objectList = [];
  
      while (responseList.length - i >= 3) {
        const address = responseList[i].split(":")[1];
        const price = responseList[i + 1].split(":")[1];
        const url = responseList[i + 2].substring(
          responseList[i + 2].indexOf(":") + 1
        );
        let img = "";
        //async download of images from a repository
        if (i % 2 === 0) {
          img = image1;
        } else {
          img = image2;
        }
  
        const obj = {
          i,
          address,
          price,
          url,
          img,
        };
  
        console.log("obj img is", obj.img);
  
        objectList.push(obj);
        i += 3;
      }
      console.log("obj is", objectList);
      return objectList;
    } catch (error) {
      console.error("Error:", error);
      // handle error here
    }
  };
  
  export const fetchSearchSuggestions = async (searchInput, setSearchSuggestions) => {
    if (searchInput.length !== 0) {
      const s = searchInput;
      const url = `http://127.0.0.1:9095/rely/apis/v1/suggestion/${s}`;
      console.log(url);
      const response = await fetch(url);
      const data = await response.json();
      setSearchSuggestions(data["response"]);
    }
  };
  