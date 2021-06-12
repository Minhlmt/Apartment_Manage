export const URL="https://qlccadmin-api.herokuapp.com/";
export const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN1cGVyYWRtaW4iLCJpZCI6IjYwNjU0MzQ1MjFiNzdkMDdiOGY0MjI0YyIsInJvbGUiOjAsImlhdCI6MTYxNzI2NzMzM30.iXrFEZQMifwBMlUIleq3dXLdPSHEHScVeEIDyq6l1FM'
export const ScreenKey={
    AllBill:'allBill',
    DetailBill:'detailBill',
    MainBill:'mainBill',
    SumBill:'sumBill',
    Statistic:'statistic',
    AllUser:'allUser',
    DetailUser:'detailUser',
    Home:'home',
    Complain:'complain',
    DetailComplain:'detailComplain',
    TabHome:'tabHome',
    TabComplain:'tabComplain',
    ComplainDone:'complainDone',
    DetailComplainDone:'detailComplainDone',
    Login:'login',
    SignIn:'signIn',
    TabHomeProfile:'tabHomeProfile',
    Parking:'parking',
    DetailParking:'detailParking',
    MainUser:'mainUser',
    CreateUser:'createUser',
    ListUser:'listUser'
}
import React,{ createContext } from 'react';
export const TokenContext=createContext(null);
