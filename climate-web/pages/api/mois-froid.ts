import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDB } from '@/lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = await connectToDB()
    const result = await db.request().execute("MoisLePlusFroid")

    // 🔍 Ajout du log pour voir ce que retourne la procédure
    console.log("🧊 Résultat MoisLePlusFroid =>", result.recordset)

    res.status(200).json(result.recordset)
  } catch (err) {
    console.error('Erreur API MoisLePlusFroid', err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}
