import { useEffect, useState } from 'react'

interface MoisResult {
  mois: string
  temperature_moyenne?: number
  co2_moyen?: number
  pluie?: number
}

interface ProvinceResult {
  province: string
  temperature_moyenne?: number
  co2_moyen?: number
  pluie?: number
}

export default function Statistiques() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    moisChaud: null as MoisResult | null,
    moisFroid: null as MoisResult | null,
    provinceChaude: null as ProvinceResult | null,
    provinceFroide: null as ProvinceResult | null,
    moisPollue: null as MoisResult | null,
    moisMoinsPollue: null as MoisResult | null,
    provincePolluee: null as ProvinceResult | null,
    provinceMoinsPolluee: null as ProvinceResult | null,
    moisPluvieux: null as MoisResult | null,
    moisSec: null as MoisResult | null,
    provincePluvieuse: null as ProvinceResult | null,
    provinceSeche: null as ProvinceResult | null,
  })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const endpoints = [
          'mois-chaud', 'mois-froid',
          'province-chaude', 'province-froide',
          'mois-pollue', 'mois-moins-pollue',
          'province-polluee', 'province-moins-polluee',
          'mois-pluvieux', 'mois-sec',
          'province-pluvieuse', 'province-seche'
        ]

        const responses = await Promise.all(endpoints.map(endpoint =>
          fetch(`/api/${endpoint}`).then(res => res.json())
        ))

        setData({
          moisChaud: responses[0][0],
          moisFroid: responses[1][0],
          provinceChaude: responses[2][0],
          provinceFroide: responses[3][0],
          moisPollue: responses[4][0],
          moisMoinsPollue: responses[5][0],
          provincePolluee: responses[6][0],
          provinceMoinsPolluee: responses[7][0],
          moisPluvieux: responses[8][0],
          moisSec: responses[9][0],
          provincePluvieuse: responses[10][0],
          provinceSeche: responses[11][0],
        })
      } catch (error) {
        console.error('Erreur lors du chargement des données', error)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return <p className="p-8 text-center text-gray-600">Chargement des statistiques...</p>
  }

  return (
    <div className="p-8 min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-center text-green-800">
        📊 Statistiques climatiques (2021–2023)
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Température */}
        <div className="bg-white rounded shadow-md p-4">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">🌡️ Température</h2>
          <ul className="space-y-1">
            <li><strong>Mois le plus chaud :</strong> {data.moisChaud?.mois} ({data.moisChaud?.temperature_moyenne?.toFixed(1)} °C)</li>
            <li><strong>Mois le plus froid :</strong> {data.moisFroid?.mois} ({data.moisFroid?.temperature_moyenne?.toFixed(1)} °C)</li>
            <li><strong>Province la plus chaude :</strong> {data.provinceChaude?.province} ({data.provinceChaude?.temperature_moyenne?.toFixed(1)} °C)</li>
            <li><strong>Province la moins chaude :</strong> {data.provinceFroide?.province} ({data.provinceFroide?.temperature_moyenne?.toFixed(1)} °C)</li>
          </ul>
        </div>

        {/* Pollution */}
        <div className="bg-white rounded shadow-md p-4">
          <h2 className="text-xl font-semibold text-red-700 mb-2">🏭 Pollution</h2>
          <ul className="space-y-1">
            <li><strong>Mois le plus pollué :</strong> {data.moisPollue?.mois} ({data.moisPollue?.co2_moyen?.toFixed(1)} ppm)</li>
            <li><strong>Mois le moins pollué :</strong> {data.moisMoinsPollue?.mois} ({data.moisMoinsPollue?.co2_moyen?.toFixed(1)} ppm)</li>
            <li><strong>Province la plus polluée :</strong> {data.provincePolluee?.province} ({data.provincePolluee?.co2_moyen?.toFixed(1)} ppm)</li>
            <li><strong>Province la moins polluée :</strong> {data.provinceMoinsPolluee?.province} ({data.provinceMoinsPolluee?.co2_moyen?.toFixed(1)} ppm)</li>
          </ul>
        </div>

        {/* Précipitations */}
        <div className="bg-white rounded shadow-md p-4">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">🌧️ Précipitations</h2>
          <ul className="space-y-1">
            <li><strong>Mois le plus pluvieux :</strong> {data.moisPluvieux?.mois} ({data.moisPluvieux?.pluie?.toFixed(1)} mm)</li>
            <li><strong>Mois le plus sec :</strong> {data.moisSec?.mois} ({data.moisSec?.pluie?.toFixed(1)} mm)</li>
            <li><strong>Province la plus pluvieuse :</strong> {data.provincePluvieuse?.province} ({data.provincePluvieuse?.pluie?.toFixed(1)} mm)</li>
            <li><strong>Province la plus sèche :</strong> {data.provinceSeche?.province} ({data.provinceSeche?.pluie?.toFixed(1)} mm)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
