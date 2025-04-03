// pages/province-polluee.tsx
import { useEffect, useState } from 'react'

interface Resultat {
  province: string
  co2_moyen: number
}

export default function ProvinceLaPlusPolluee() {
  const [resultat, setResultat] = useState<Resultat | null>(null)
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    fetch('/api/province-polluee')
      .then((res) => res.json())
      .then((data) => {
        setResultat(data[0])
      })
      .catch((err) => {
        console.error('Erreur API:', err)
      })
      .finally(() => {
        setChargement(false)
      })
  }, [])

  if (chargement) {
    return <p className="p-8">Chargement...</p>
  }

  if (!resultat) {
    return <p className="p-8 text-red-500">Aucune donnée disponible.</p>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">🏭 Province la plus polluée (2021 - 2023)</h1>
      <p>
        <strong>{resultat.province}</strong> avec une émission moyenne de{' '}
        <strong>{resultat.co2_moyen} Mt de CO₂</strong>
      </p>
    </div>
  )
}
