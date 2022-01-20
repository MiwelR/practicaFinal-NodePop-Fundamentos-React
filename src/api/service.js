import client, {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from "./client";
import storage, { session } from "../utils/Storage";

const advertsBaseUrl = "/api";

// AUTH SERVICE
export const register = async (form) => {
  return await client.post(`${advertsBaseUrl}/auth/signup`, form);
};

export const login = (credentials) => {
  return client
    .post(`${advertsBaseUrl}/auth/login`, credentials)
    .then(({ accessToken }) => {
      setAuthorizationHeader(accessToken);
      session.set("auth", accessToken);
    });
};

export const loginSave = (credentials) => {
  return client
    .post(`${advertsBaseUrl}/auth/login`, credentials)
    .then(({ accessToken }) => {
      setAuthorizationHeader(accessToken);
      storage.set("auth", accessToken);
    });
};

export const logout = () =>
  Promise.resolve().then(() => {
    removeAuthorizationHeader();
    storage.remove("auth");
  });

// USER SERVICE
export const getUser = () => {
  const url = `${advertsBaseUrl}/auth/me`;
  return client.get(url);
};

// ADVERTS SERVICE
// Adverts
export const getLatestAdverts = () => {
  const url = `${advertsBaseUrl}/v1/adverts`;
  return client.get(url);
};

// Advert Details
export const getAdvert = (advertsId) => {
  const url = `${advertsBaseUrl}/v1/adverts/${advertsId}`;
  return client.get(url);
};

// Search Filter Adverts
export const getFilterAdvert = ({ name, sale = "all", price, tags }) => {
  let url = `${advertsBaseUrl}/v1/adverts?`;
  const arrayTags = tags || [];
  const range = price || [];

  url += name ? `name=${name}` : "";
  url += sale !== "all" && sale !== "" ? `&sale=${sale}` : "";
  url += range.length > 0 ? `&price=${range[0]}&price=${range[1]}` : "";

  if (arrayTags.length > 0) {
    for (let arrayTag of arrayTags) {
      url += `&tags=${arrayTag}`;
    }
  }

  return client.get(url);
};

// New Advert
export const createAdvert = (advert) => {
  const url = `${advertsBaseUrl}/v1/adverts`;
  return client.post(url, advert);
};

// Delete Advert
export const delAdvert = (advertsId) => {
  const url = `${advertsBaseUrl}/v1/adverts/${advertsId}`;
  return client.delete(url);
};
