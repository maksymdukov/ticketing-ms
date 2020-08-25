import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    //srv
    return axios.create({
      baseURL: "http://ticketing.dev",
      headers: req.headers,
    });
  } else {
    return axios.create({
      baseURL: "/",
    });
    //brws
  }
};

export default buildClient;
