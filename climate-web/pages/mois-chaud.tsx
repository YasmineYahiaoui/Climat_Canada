// pages/mois-chaud.tsx
import { useEffect, useState } from 'react'

interface Resultat {
  mois: string
  temperature_moyenne: number
}

export default function MoisLePlusChaud() {
  const [resultat, setResultat] = useState<Resultat | null>(null)
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    fetch('/api/mois-chaud')
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
    return <p className="p-8">Chargement en cours...</p>
  }

  if (!resultat) {
    return <p className="p-8 text-red-500">Aucune donnée trouvée.</p>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">🔥 Mois le plus chaud (2021 - 2023)</h1>
      <p>
        <strong>{resultat.mois}</strong> avec une température moyenne de{' '}
        <strong>{resultat.temperature_moyenne} °C</strong>
      </p>
    </div>
  )
}
