import axios from "axios";

export const fetchAsyncIconChange = async (formData: FormData) => {
  try {
    const response = await axios.patch(
      `http://localhost:8000/api/user/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      window.location.href = "/signin";
      throw new Error("Authentication failed, redirecting to login.");
    }
  }
};
