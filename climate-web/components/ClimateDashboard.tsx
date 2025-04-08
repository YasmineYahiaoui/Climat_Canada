import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'

const mois = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
]

export default function ClimateDashboard() {
  const [annee, setAnnee] = useState(2021)
  const [type, setType] = useState('precipitation') // Par défaut pour test
  const [province, setProvince] = useState('Alberta')
  const [donnees, setDonnees] = useState([])
  const [loading, setLoading] = useState(false)

  const chargerDonnees = async () => {
    if (!annee || !type) return
    setLoading(true)
    try {
      const response = await axios.get('/api/climat', {
        params: { type, annee }
      })
      setDonnees(response.data)
    } catch (error) {
      console.error('Erreur lors de la requête API:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    chargerDonnees()
  }, [annee, type])

  const donneesFiltrees = donnees.filter((item: any) => item.province === province)

  // Formatage pour Recharts
  const donneesPourGraphique = donneesFiltrees.map((item: any) => ({
    mois: item.mois,
    valeur:
      type === 'temperature' ? item.temperature_moyenne :
      type === 'pollution' ? item.co2_moyen :
      item.precipitation_moyenne
  }))

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-900">
        Données climatiques - {type} ({annee})
      </h2>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <select
          className="p-2 border rounded bg-white"
          onChange={e => setType(e.target.value)}
          value={type}
        >
          <option value="temperature">Température</option>
          <option value="pollution">Pollution</option>
          <option value="precipitation">Précipitations</option>
        </select>

        <select
          className="p-2 border rounded bg-white"
          onChange={e => setAnnee(Number(e.target.value))}
          value={annee}
        >
          {[2021, 2022, 2023].map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>

        <select
          className="p-2 border rounded bg-white"
          onChange={e => setProvince(e.target.value)}
          value={province}
        >
           <option value="Alberta">Alberta</option>
  <option value="Colombie-Britannique">Colombie-Britannique</option>
  <option value="Île-du-Prince-Édouard">Île-du-Prince-Édouard</option>
  <option value="Manitoba">Manitoba</option>
  <option value="Nouveau-Brunswick">Nouveau-Brunswick</option>
  <option value="Nouvelle-Écosse">Nouvelle-Écosse</option>
  <option value="Nunavut">Nunavut</option>
  <option value="Ontario">Ontario</option>
  <option value="Québec">Québec</option>
  <option value="Saskatchewan">Saskatchewan</option>
  <option value="Terre-Neuve-et-Labrador">Terre-Neuve-et-Labrador</option>
  <option value="Territoires du Nord-Ouest">Territoires du Nord-Ouest</option>
  <option value="Yukon">Yukon</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Chargement...</p>
      ) : (
        <>
          {/* Tableau */}
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white shadow-md rounded">
              <thead>
                <tr className="bg-blue-100">
                  <th className="py-2 px-4 border">Province</th>
                  <th className="py-2 px-4 border">Mois</th>
                  <th className="py-2 px-4 border">Valeur</th>
                </tr>
              </thead>
              <tbody>
                {donneesFiltrees.map((item: any, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border">{item.province}</td>
                    <td className="py-2 px-4 border">{item.mois}</td>
                    <td className="py-2 px-4 border">
                      {type === 'temperature' && item.temperature_moyenne}
                      {type === 'pollution' && item.co2_moyen}
                      {type === 'precipitation' && item.precipitation_moyenne}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Graphique */}
          <div className="bg-white shadow-md rounded p-4">
            <h3 className="text-xl font-semibold text-center mb-4">Graphique mensuel</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={donneesPourGraphique}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="mois" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="valeur"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  )
}