import axios from "axios";

export const fetchPosts =  async () => {
    try{
    const response =  await axios.get("https://dev-the-tremendous-journey.pantheonsite.io/wp-json/wp/v2/Pages?_embed");
    return response.data;
    }
    catch{
        console.log("Error : Unable to get the WP data")
    }
}