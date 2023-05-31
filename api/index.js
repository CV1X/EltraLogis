import axios from "axios";

export const login = async (email, phone, password) => {
  const url = "https://lite.eltralogis.com/pod-api/pod/token_auth";

  try {
    const formData = new FormData();
    if (email) {
      formData.append("email", email);
    } else {
      formData.append("phone", phone);
    }
    formData.append("password", password);

    const response = await axios.post(url, formData);

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while logging in.");
  }
};
