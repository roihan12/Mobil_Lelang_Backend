import { auth } from "@/auth";

const baseApiUrl = "http://localhost:6001/";

async function get(url: string) {
  const requestOptions = {
    method: "GET",
    headers: await getAuthHeaders(),
  };

  const response = await fetch(baseApiUrl + url, requestOptions);
  return handleResponse(response);
}

async function put(url: string, body: unknown) {
  const requestOptions = {
    method: "PUT",
    headers: await getAuthHeaders(),
    body: JSON.stringify(body),
  };

  const response = await fetch(baseApiUrl + url, requestOptions);
  return handleResponse(response);
}

async function post(url: string, body: unknown) {
  const requestOptions = {
    method: "POST",
    headers: await getAuthHeaders(),
    body: JSON.stringify(body),
  };

  const response = await fetch(baseApiUrl + url, requestOptions);
  return handleResponse(response);
}

async function del(url: string) {
  const requestOptions = {
    method: "DELETE",
    headers: await getAuthHeaders(),
  };

  const response = await fetch(baseApiUrl + url, requestOptions);
  return handleResponse(response);
}

async function handleResponse(response: Response) {
  const text = await response.text();
  let data;
  // const data = text && JSON.parse(text);

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (response.ok) {
    return data || response.statusText;
  } else {
    const error = {
      status: response.status,
      message: typeof data === "string" ? data : response.statusText,
    };
    return error;
  }
}

async function getAuthHeaders(): Promise<Headers> {
  const session = await auth();

  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  if (session) {
    headers.set("Authorization", `Bearer ${session.access_token}`);
  }
  return headers;
}

export const fetchWrapper = {
  get,
  put,
  post,
  del,
};
