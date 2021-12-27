import axios from "axios";
import { SERVER_API } from "../apolo-client/config";

export const upload = async (file) => {
  const formData = new FormData();

  formData.append("image", file);

  return axios({
    method: "POST",
    url: SERVER_API + "/upload",
    headers: {
      // Authorization: `Bearer ${access_token}`,
      "Content-Type": "multipart/form-data",
    },
    // params: {
    //   uploadType: "multipart",
    // },
    data: formData,
  }).then((rs) => rs.data);
};
