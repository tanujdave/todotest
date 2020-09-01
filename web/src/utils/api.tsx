import axios from "axios";
import config from "../config/config";

const { API_HOST, API_PATH } = config;

const BASE_URL = `${API_HOST}${API_PATH}`;
const DEFAULT_ACCEPT_TYPE = "application/json";
const DEFAULT_CONTENT_TYPE = "application/json";

/**
 * Initialize axios request.
 */
const request = axios.create({
  baseURL: BASE_URL,
});

/**
 * Get request options - headers
 * @param {object} getOptions The request parameters
 */
const getRequestOptions = (getOptions: { headers?: any }) => {
  const options = getOptions;

  if (typeof options.headers["Accept"] === "undefined") {
    options.headers["Accept"] = DEFAULT_ACCEPT_TYPE;
  }

  if (typeof options.headers["Content-Type"] === "undefined") {
    options.headers["Content-Type"] = DEFAULT_CONTENT_TYPE;
  }

  if (localStorage.getItem("token")) {
    options.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "token"
    )}`;
  }

  return options;
};

/**
 * Client GET request wrapper.
 *
 * @param {string} path api endpoint
 * @param {object} getOptions request options
 */
const get = async (
  path: string,
  options: { headers?: any } = { headers: {} }
) => {
  try {
    const { data, status, headers } = await request.get(
      path,
      getRequestOptions(options)
    );
    return { data, status, headers };
  } catch (error) {
    const { data } = error.response;
    throw Error(data.message);
  }
};

/**
 * Client POST request wrapper.
 *
 * @param {string} path api path
 * @param {object} body request body
 * @param {object} headers request headers
 */
const post = async (
  path: string,
  body: any,
  options: { headers: any } = { headers: {} }
) => {
  const bodyData = JSON.stringify(body);

  try {
    const { data, status } = await request.post(
      path,
      bodyData,
      getRequestOptions(options)
    );
    return { data, status };
  } catch (error) {
    const { data } = error.response;
    throw Error(data.message);
  }
};

/**
 * Client PUT request wrapper.
 *
 * @param {string} path api path
 * @param {object} body request body
 * @param {object} headers request headers
 */
const put = async (
  path: string,
  body: any,
  options: { headers: any } = { headers: {} }
) => {
  const bodyData = JSON.stringify(body);

  try {
    const { data, status } = await request.put(
      path,
      bodyData,
      getRequestOptions(options)
    );
    return { data, status };
  } catch (error) {
    const { data } = error.response;
    throw Error(data.message);
  }
};

/**
 * Client DELETE request wrapper.
 *
 * @param {string} path api path
 * @param {object} headers request headers
 */
const delete_entry = async (
  path: string,
  options: { headers: any } = { headers: {} }
) => {
  try {
    const { data, status } = await request.delete(
      path,
      getRequestOptions(options)
    );
    return { data, status };
  } catch (error) {
    const { data } = error.response;
    throw Error(data.message);
  }
};

export { get, post, put, delete_entry };
