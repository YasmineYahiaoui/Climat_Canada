// pages/api/climat.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDB } from '@/lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { annee, type } = req.query

  // Affiche les paramètres reçus pour vérifier
  console.log('API climat.ts appelée avec :', { type, annee })

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

    console.log('>> Exécution de la procédure :', procedure)

    const result = await db.request()
      .input('annee', Number(annee))
      .execute(procedure)

    console.log('>> Résultat SQL obtenu :', result.recordset)

    res.status(200).json(result.recordset)
  } catch (err: any) {
    console.error('❌ Erreur API climat.ts :', err)
    res.status(500).json({ message: err.message || 'Erreur serveur' })
  }
}
