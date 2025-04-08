import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDB } from '@/lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = await connectToDB()
    const result = await db.request().execute('MoisLeMoinsPluvieux')
    res.status(200).json(result.recordset)
  } catch (err) {
    console.error('Erreur API MoisLeMoinsPluvieux', err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}
