export function createDiffApi(client, diffId) {
  const getDiff = async () => {
    const response = await client.get(`/diffs/${diffId}`)
    return response.data;
  }

  return {
    getDiff
  }
}
