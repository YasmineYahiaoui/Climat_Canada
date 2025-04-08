// pages/statistiques.tsx
import { useEffect, useState } from 'react'

export default function Statistiques() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    moisChaud: '',
    moisFroid: '',
    provinceChaude: '',
    provinceFroide: '',
    moisPollue: '',
    moisMoinsPollue: '',
    provincePolluee: '',
    provinceMoinsPolluee: '',
    moisPluvieux: '',
    moisSec: '',
    provincePluvieuse: '',
    provinceSeche: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [
          resChaud,
          resFroid,
          resProvChaude,
          resProvFroide,
          resPollue,
          resMoinsPollue,
          resProvPolluee,
          resProvMoinsPolluee,
          resPluvieux,
          resSec,
          resProvPluvieuse,
          resProvSeche
        ] = await Promise.all([
          fetch('/api/mois-chaud'),
          fetch('/api/mois-froid'),
          fetch('/api/province-chaude'),
          fetch('/api/province-froide'),
          fetch('/api/mois-pollue'),
          fetch('/api/mois-moins-pollue'),
          fetch('/api/province-polluee'),
          fetch('/api/province-moins-polluee'),
          fetch('/api/mois-pluvieux'),
          fetch('/api/mois-sec'),
          fetch('/api/province-pluvieuse'),
          fetch('/api/province-seche')
        ])

        const [
          moisChaud,
          moisFroid,
          provinceChaude,
          provinceFroide,
          moisPollue,
          moisMoinsPollue,
          provincePolluee,
          provinceMoinsPolluee,
          moisPluvieux,
          moisSec,
          provincePluvieuse,
          provinceSeche
        ] = await Promise.all([
          resChaud.json(),
          resFroid.json(),
          resProvChaude.json(),
          resProvFroide.json(),
          resPollue.json(),
          resMoinsPollue.json(),
          resProvPolluee.json(),
          resProvMoinsPolluee.json(),
          resPluvieux.json(),
          resSec.json(),
          resProvPluvieuse.json(),
          resProvSeche.json()
        ])

        setData({
          moisChaud: moisChaud[0]?.mois || '',
          moisFroid: moisFroid[0]?.mois || '',
          provinceChaude: provinceChaude[0]?.province || '',
          provinceFroide: provinceFroide[0]?.province || '',
          moisPollue: moisPollue[0]?.mois || '',
          moisMoinsPollue: moisMoinsPollue[0]?.mois || '',
          provincePolluee: provincePolluee[0]?.province || '',
          provinceMoinsPolluee: provinceMoinsPolluee[0]?.province || '',
          moisPluvieux: moisPluvieux[0]?.mois || '',
          moisSec: moisSec[0]?.mois || '',
          provincePluvieuse: provincePluvieuse[0]?.province || '',
          provinceSeche: provinceSeche[0]?.province || '',
        })
      } catch (error) {
        console.error('Erreur lors du chargement des données', error)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div className="p-8 min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-center text-green-800">📊 Statistiques climatiques (2021–2023)</h1>

      {loading ? (
        <p className="text-center text-gray-600">Chargement des statistiques...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Température */}
          <div className="bg-white rounded shadow-md p-4">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">🌡️ Température</h2>
            <ul className="space-y-1">
              <li><strong>Mois le plus chaud :</strong> {data.moisChaud}</li>
              <li><strong>Mois le plus froid :</strong> {data.moisFroid}</li>
              <li><strong>Province la plus chaude :</strong> {data.provinceChaude}</li>
              <li><strong>Province la moins chaude :</strong> {data.provinceFroide}</li>
            </ul>
          </div>

          {/* Pollution */}
          <div className="bg-white rounded shadow-md p-4">
            <h2 className="text-xl font-semibold text-red-700 mb-2">🏭 Pollution</h2>
            <ul className="space-y-1">
              <li><strong>Mois le plus pollué :</strong> {data.moisPollue}</li>
              <li><strong>Mois le moins pollué :</strong> {data.moisMoinsPollue}</li>
              <li><strong>Province la plus polluée :</strong> {data.provincePolluee}</li>
              <li><strong>Province la moins polluée :</strong> {data.provinceMoinsPolluee}</li>
            </ul>
          </div>

          {/* Précipitations */}
          <div className="bg-white rounded shadow-md p-4">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">🌧️ Précipitations</h2>
            <ul className="space-y-1">
              <li><strong>Mois le plus pluvieux :</strong> {data.moisPluvieux}</li>
              <li><strong>Mois le plus sec :</strong> {data.moisSec}</li>
              <li><strong>Province la plus pluvieuse :</strong> {data.provincePluvieuse}</li>
              <li><strong>Province la plus sèche :</strong> {data.provinceSeche}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
