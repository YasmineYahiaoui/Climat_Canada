import * as sql from 'mssql'


const config = {
  user: 'climate-server',
  password: 'qwerty123@',
  server: 'climate-server.database.windows.net',
  database: 'ClimateDB',
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
}

export async function connectToDB() {
  try {
    const pool = await sql.connect(config)
    return pool
  } catch (err) {
    console.error('Erreur de connexion SQL', err)
    throw err
  }
}
