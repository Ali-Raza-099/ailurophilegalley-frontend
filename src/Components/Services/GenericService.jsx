import axios from "axios";
axios.defaults.baseURL = "https://ailurophile-gallery-backend.herokuapp.com/api/";
axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
class GenericService {
  // constructor() {}
  get = (url) =>
    new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  post = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  delete = (url) =>
    new Promise((resolve, reject) => {
      axios
        .delete(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  put = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .put(url, data, {
        headers: {
            'content-type': 'multipart/form-data'
        }})
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
}
export default GenericService;