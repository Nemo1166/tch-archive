export async function call_api(path: string) {
  try {
    const response = await fetch(`https://tch-query.vercel.app/api/${path}`);
    if (!response.ok) {
      throw new Error(`Request API '${path}' failed.`);
    }
    const data = await response.json();
    if (data.code === 200) {
      return data.content;
    } else {
      throw new Error(`Expected response code 200, received ${data.code}`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
