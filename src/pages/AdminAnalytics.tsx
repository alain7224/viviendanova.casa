import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const mockData = [
  { date: 'Lun', visits: 400, conversions: 20, scrollDepth: 65 },
  { date: 'Mar', visits: 520, conversions: 28, scrollDepth: 72 },
  { date: 'Mié', visits: 680, conversions: 35, scrollDepth: 78 },
  { date: 'Jue', visits: 750, conversions: 42, scrollDepth: 82 },
  { date: 'Vie', visits: 920, conversions: 55, scrollDepth: 88 },
  { date: 'Sab', visits: 1100, conversions: 68, scrollDepth: 85 },
  { date: 'Dom', visits: 840, conversions: 45, scrollDepth: 75 },
];

const topProperties = [
  { name: 'Luxury Villa', views: 1250, conversions: 45 },
  { name: 'Modern Apartment', views: 980, conversions: 38 },
  { name: 'Beach House', views: 750, conversions: 25 },
  { name: 'Downtown Loft', views: 620, conversions: 18 },
  { name: 'Mountain Cabin', views: 480, conversions: 12 },
];

export const AdminAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-semibold">Visitantes</p>
          <p className="text-3xl font-bold text-primary mt-2">5,420</p>
          <p className="text-green-600 text-sm mt-1">+12% esta semana</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-semibold">Visitas Totales</p>
          <p className="text-3xl font-bold text-secondary mt-2">18,540</p>
          <p className="text-green-600 text-sm mt-1">+8% este mes</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-semibold">Conversiones</p>
          <p className="text-3xl font-bold text-accent mt-2">243</p>
          <p className="text-green-600 text-sm mt-1">+5.2% CTR</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-semibold">Scroll Promedio</p>
          <p className="text-3xl font-bold text-warning mt-2">78%</p>
          <p className="text-green-600 text-sm mt-1">+3.1% engagement</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visits Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4">Visitas por Día</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="visits" fill="#2E7D32" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Conversions Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4">Conversiones por Día</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="conversions" stroke="#F57C00" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Properties */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">Top 5 Propiedades</h3>
        <div className="space-y-3">
          {topProperties.map((prop, i) => (
            <div key={i} className="flex justify-between items-center pb-3 border-b last:border-0">
              <div>
                <p className="font-semibold">{prop.name}</p>
                <p className="text-sm text-gray-600">{prop.views} visitas • {prop.conversions} conversiones</p>
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${(prop.views / 1250) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
