import a from "axios";

const url = import.meta.env.DEV ?
    "http://localhost:3000" :
    "https://mochamaple.cafe";

export const axios = a.create({ baseURL: url });