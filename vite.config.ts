import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Custom plugin to handle file saving
const savePhotoPlugin = () => ({
  name: 'save-photo',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url === '/api/save-photos' && req.method === 'POST') {
        let body = ''
        req.on('data', chunk => body += chunk)
        req.on('end', () => {
          try {
            const photos = JSON.parse(body)
            const filePath = path.resolve(__dirname, 'src/data/photos.ts')

            // Create the file content
            const content = `export interface Photo {
    id: number;
    title: string;
    url: string;
    price: number;
    description: string;
}

export const PHOTOS: Photo[] = ${JSON.stringify(photos, null, 4)};
`
            fs.writeFileSync(filePath, content)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true }))
          } catch (err) {
            console.error(err)
            res.statusCode = 500
            res.end(JSON.stringify({ error: 'Failed to save photos' }))
          }
        })
      } else if (req.url === '/api/save-rooms' && req.method === 'POST') {
        let body = ''
        req.on('data', chunk => body += chunk)
        req.on('end', () => {
          try {
            const rooms = JSON.parse(body)
            const filePath = path.resolve(__dirname, 'src/data/rooms.ts')

            // Create the file content
            const content = `export interface Room {
    id: string;
    name: string;
    color: string;
    image: string;
    placement: {
        top: string;
        left: string;
        width: string;
        transform?: string;
        boxShadow?: string;
    };
}

export const ROOMS: Room[] = ${JSON.stringify(rooms, null, 4)};
`
            fs.writeFileSync(filePath, content)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true }))
          } catch (err) {
            console.error(err)
            res.statusCode = 500
            res.end(JSON.stringify({ error: 'Failed to save rooms' }))
          }
        })
      } else if (req.url === '/api/delete-file' && req.method === 'POST') {
        let body = ''
        req.on('data', chunk => body += chunk)
        req.on('end', () => {
          try {
            const { filename } = JSON.parse(body)
            if (!filename) throw new Error('No filename provided')

            // Security check: ensure filename doesn't contain .. or / to prevent traversal
            const safeFilename = path.basename(filename)
            const filePath = path.resolve(__dirname, 'public/photos', safeFilename)

            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath)
            }

            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true }))
          } catch (err) {
            console.error(err)
            res.statusCode = 500
            res.end(JSON.stringify({ error: 'Failed to delete file' }))
          }
        })
      } else if (req.url === '/api/upload' && req.method === 'POST') {
        const filename = req.headers['x-filename'] as string
        if (!filename) {
          res.statusCode = 400
          res.end(JSON.stringify({ error: 'No filename provided' }))
          return
        }

        const uploadDir = path.resolve(__dirname, 'public/photos')
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true })
        }

        const filePath = path.join(uploadDir, filename)
        const writeStream = fs.createWriteStream(filePath)

        req.pipe(writeStream)

        writeStream.on('finish', () => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ url: `/photos/${filename}` }))
        })

        writeStream.on('error', (err) => {
          console.error(err)
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'Upload failed' }))
        })
      } else {
        next()
      }
    })
  }
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), savePhotoPlugin()],
})
