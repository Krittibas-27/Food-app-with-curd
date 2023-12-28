import axios from "axios";
import { foodFackAPI, loginJsonApi } from "./BaseUrl";

export const AllFieldsLogin = axios.create({
    baseURL: loginJsonApi
})

export const FoodBaseUrl = axios.create({
    baseURL: foodFackAPI
})