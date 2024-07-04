import axios from "axios";
import { LoginUser, Offer, RegisterUser } from "../types/types";

const baseUrl = "http://localhost:3001";
export async function signIn(user : LoginUser) {
    await axios.post(`${baseUrl}/user/logIn` , user , {withCredentials : true}).then((res) => console.log(res.data));
     await axios
       .get(`${baseUrl}/user/pro`, { withCredentials: true })
       .then((res) => console.log(res.data));
};


export async function signUp(user : RegisterUser) {
    await axios.post(`${baseUrl}/user/signUp` , user , {withCredentials : true}).then((res) => console.log(res.data));
};



export async function makeOffer(offer : Offer) {
    await axios.post(`${baseUrl}/user/createOffer` , offer , { withCredentials : true }).then((res) => console.log(res));
};

export async function getStudentsCount() {
    const studentsNbr = await fetch(`${baseUrl}/admin/countStudents`, {
        method : "GET",
        cache : "no-cache",
        credentials : "include",
    });
    console.log(studentsNbr);
    return studentsNbr.json();
};

export async function getTasksCount() {
    const tasks = await fetch(`${baseUrl}/admin/countTasks` , {credentials : "include" , cache: "no-cache"});
};

export async function getAllLevels() {
    const response = await fetch("http://localhost:3001//admin/countStudents", {
        method: "GET",
        credentials: "include", // Ensures cookies are sent
    });
    return response.json();
};





