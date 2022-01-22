import authAxios from "./authenticatedAxios";
import axios from 'axios';
export async function getVaccines(lat,long,medicationGuids){
    let response = await authAxios.get("/vaccines/locations", {params:{lat:lat,long:long,medicationGuids:medicationGuids}},{withCredentials:true}).then((response)=>{
        return response.data.data;
    })
    return response;
}

export async function getCVSVaccines(){
    let response = await authAxios.get("/vaccines/cvs", {withCredentials:true}).then((response)=>{
        return response.data.data;
    })
    return response;
}

export async function zipToLatLong(zip){
    let response = await axios.get("https://www.zipcodeapi.com/rest/MffWJxuL9gJwQkQkKEy2uFkxxrMye584Eu7H2xnz8T4zsF04SmKi6DB7Niod8UT5/info.json/"+zip+"/radians", {headers:{"Access-Control-Allow-Origin":"*"}}).then((response)=>{
        return [response.lat,response.lng];
    })
    return response;
}

