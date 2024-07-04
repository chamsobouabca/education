import { User } from "@nextui-org/react";
import { IconType } from "react-icons";

export type User  = {
    id?:string;
    fullName : string;
    email : string;
};

interface LoginUser extends User {
    fullName? : string;
    password : string;
    role : string;
    signIn() : void; 
};

interface RegisterUser extends User {
    password : string;
    offerNumber ?: number; 
    schoolName : string;   
    signUp() : void; 
};

interface offer {
    title : string;
    pros : Array<string>;
    price : string;
};


interface Offer {
    offerNumber: number;
    maxTeacher: number;
    maxStudent: number;
};

export type Role = {
    key : string;
    label : string;
};

interface Teacher extends User {
    level : string;
    subject : string;
    state : string;  
};

interface Student extends User {
    level : string;
    state : string;  
};

export type TeachersProps = {
    props : Teacher[];
};


export type StudentsProps = {
    props : Student[];
};

export type AdminData = {
    title: string;
    value: number;
    icon: IconType;
}; 

export type AdminDataProps = {
    props : AdminData;
};

export type adminJsonObj = {
    studentsNbr : number;
    teachersNbr : number;
    subjectsNbr : number;
};

export type LineChartData = {
    time: number;
    studentsNbr: number;
    teachersNbr: number;
};

export type LineChartDataProps = {
    props : LineChartData[];
};

export type BarChartData = {
    level: string;
    failedStudents : number;
    successfulStudents : number;
};

export type BarChartDataProps = {
    props : BarChartData[];
};

export type Level = {
    name: string;
    modules : string[];
};

export type Task = {
    title : string;
    senderId: string;
    receiverId : string;
    text: string;
};

export type TaskProps = {
    props : Task;
};






