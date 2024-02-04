export const fetchJsonData = 
async (publicPath: string): Promise<Response> => {
  return fetch(publicPath, {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
}