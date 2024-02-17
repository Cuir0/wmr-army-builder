export const fetchJsonData = 
async (publicPath: string, errorMsg: string) => {
  const response = await fetch(publicPath, {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })

  if (response.ok) return response.json()
  throw new Error(errorMsg)
}