import app, { init } from './app'
const PORT = process.env.PORT === undefined ? 5000 : +process.env.PORT

init()
  .then((): void => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}.`)
    })
  })
  .catch((err) => {
    console.log(err)
  })
