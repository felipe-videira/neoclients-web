import axios from 'axios';

export default async (
  path,
  method = 'GET',
  data = null,
  options = {},
  baseUrl = process.env.VUE_APP_API_HOST,
) => {
  try {
    const { data: res } = await axios({
      method,
      url: baseUrl + path,
      data,
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
    return res;
  } catch (e) {
    throw e.response && e.response.data.error;
  }
};
