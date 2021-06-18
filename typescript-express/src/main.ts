import { createApp } from './app'

createApp()
  .then((server: { listen: (arg0: number, arg1: () => void) => void }) => {
    server.listen(3000, () => {
      console.info(`Listening on http://localhost:3000`)
    })
  })
  .catch((err: any) => {
    console.error(`Error: ${err}`)
  })