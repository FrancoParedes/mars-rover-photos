const getUrl = (url) => {
  const host = process.env.NEXT_PUBLIC_BACKEND_HOST;
  const apiUrl = url.startsWith('http') ? url : `${host}${url}`;
  return apiUrl;
};

export const request = async ({ url, method, body, media = false, mapper = null }) => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, 10000);
    const options = {
      method,
      body: body && ((!media && JSON.stringify(body)) || body),
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(getUrl(url), options);
    clearTimeout(timeout);
    const { status } = response;
    const data = response && (await response.json());

    return {
      status,
      data: mapper ? mapper(data) : data,
      ok: status >= 200 && status <= 299,
    };
  } catch (error) {
    return {
      data: error,
      status: 500,
      ok: false,
    };
  }
};
