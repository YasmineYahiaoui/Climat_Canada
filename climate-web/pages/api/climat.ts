// pages/api/climat.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDB } from '@/lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { annee, type } = req.query

  // Vérification des paramètres
  if (!annee || !type) {
    return res.status(400).json({ message: 'Paramètres manquants (annee ou type)' })
  }

  try {
    const db = await connectToDB()
    let procedure = ''

    if (type === 'temperature') procedure = 'GetTemperatureParAnnee'
    else if (type === 'pollution') procedure = 'GetPollutionParAnnee'
    else if (type === 'precipitation') procedure = 'GetPrecipitationParAnnee'
    else return res.status(400).json({ message: 'Type non valide' })

    const result = await db.request()
      .input('annee', Number(annee))
      .execute(procedure)

    res.status(200).json(result.recordset)
  } catch (err) {
    console.error('Erreur API climat.ts', err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}
