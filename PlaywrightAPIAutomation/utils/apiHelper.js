import apiData from '../testdata/apiData.json';

export async function apiRegister({ request }, data) {
  return await request.post(`${apiData.baseURL}/register`, {
    data: {
      fullname: data.fullname,
      email: data.email,
      username: data.username,
      password: data.password
    }
  });
}

export async function apiLogin({ request }, data) {
  return await request.post(`${apiData.baseURL}/login`, {
    data: {
      username: data.username,
      password: data.password
    }
  });
}
