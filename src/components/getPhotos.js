const baseUrl = "https://pixabay.com/api/";
const key = "39382301-87481c6222a57772410795ead";
const perPage = 12;


export const getPhotos = ({searchParameters, page}) => {

    let q = '';

    if (searchParameters.includes(' ')) {
        q = searchParameters.split(" ").join("+")
    } else {
        q = searchParameters;
    }

    return fetch(`${baseUrl}?q=${q}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=${perPage}`)

}