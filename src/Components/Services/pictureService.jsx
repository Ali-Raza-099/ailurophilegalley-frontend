import GenericService from './GenericService'
class PicturesService extends GenericService {
  // constructor() {
  //   super();
  // }
  addPicture = (data) => this.post("picture/", data);
  deletePicture = (_id) => this.delete("picture/" + _id);
  updatePicture = (_id, data) => this.put("picture/" + _id, data);
  getPicture = (page = 1) => this.get("picture?page="+page);
  getSinglePicture = (id) => this.get("picture/" + id);
}

let pictureService = new PicturesService();
export default pictureService;