import { AdminData, Role, offer } from "./types";


export const roles : Role[] = [
    {
        key : "student",
        label : "student",
    },
    {
        key : "admin",
        label : "admin",
    },
    {
        key : "teacher",
        label : "teacher",
    }
];

export const offers : offer[] = [
    {
        title : "free",
        pros : ["Manage teachers" ,"Manage Students" , "Send and Receive Tasks"],
        price : "0 DA",
    },
    {
        title : "premium",
        pros : ["Manage teachers" ,"Manage Students" , "Send and Receive Tasks" , "Admin dahboared" , "Make Final PVs"],
        price : "5000 DA",
    }
];


export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}