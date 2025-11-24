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
            const filePath = path.resolve(__dirname, 'src/data/photos_final.ts')

            // Create the file content
            // Create the file content
            const content = `// ⚠️ WARNING: DO NOT DELETE THESE INTERFACES ⚠️
// Use the Admin page at /admin to add photos instead of editing this file manually

export interface PrintSize {
    size: string;
    price: number;
    description?: string;
}

export interface Photo {
    id: number;
    title: string;
    url: string;
    price: number;
    sizes: PrintSize[];        // REQUIRED
    edition?: {                // OPTIONAL
        total: number;
        remaining: number;
    };
    description: string;
    category?: string;         // REQUIRED
    isBW?: boolean;           // REQUIRED
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
      } else if (req.url === '/api/get-photos' && req.method === 'GET') {
        try {
          const filePath = path.resolve(__dirname, 'src/data/photos_final.ts')
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8')
            // Extract the JSON array from the file content
            const match = content.match(/export const PHOTOS: Photo\[] = (\[[\s\S]*?]);/)
            if (match && match[1]) {
              res.setHeader('Content-Type', 'application/json')
              res.end(match[1])
            } else {
              throw new Error('Could not parse photos from file')
            }
          } else {
            res.end('[]')
          }
        } catch (err) {
          console.error(err)
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'Failed to get photos' }))
        }
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
