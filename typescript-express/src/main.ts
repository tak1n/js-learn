import { createApp } from './app'

const port = process.env.PORT || 3000

createApp().listen(port, () => {
  console.info(`Listening on Port ${port}`);
});