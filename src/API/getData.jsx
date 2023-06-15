import axios from "axios";

async function getPicturesData(keyWord, page) {
  const API_KEY = "34988834-b35392638b98e8c3c34637c92";
  const searchParams = new URLSearchParams({
    key: API_KEY,
    lang: "pl",
    q: keyWord,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page,
    per_page: 12,
  });

  return await axios.get(`https://pixabay.com/api/?${searchParams}`);
}

export default getPicturesData;
