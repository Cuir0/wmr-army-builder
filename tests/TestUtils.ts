import fs from 'fs'
import path from 'path'

const PUBLIC_FOLDER_PATH = path.join(process.cwd(), 'public')

export const readJsonFile = (filePath: string) => {
  const result = fs.readFileSync(`${PUBLIC_FOLDER_PATH}/${filePath}`, 'utf8')
  return JSON.parse(result)
}