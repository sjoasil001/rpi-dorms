import React, { useMemo, useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Footer from '../components/Footer';

// default marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// custom dorm icons
const dormIcon = L.divIcon({
  className: '',
  html: `
    <div style="
      width: 14px;
      height: 14px;
      background: #C8102E;
      border-radius: 999px;
      border: 2px solid #ffffff;
      box-shadow: 0 0 4px rgba(0,0,0,0.4);
    "></div>
  `,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

const dormIconActive = L.divIcon({
  className: '',
  html: `
    <div style="
      width: 18px;
      height: 18px;
      background: #C8102E;
      border-radius: 999px;
      border: 2px solid #ffffff;
      box-shadow: 0 0 6px rgba(0,0,0,0.5);
    "></div>
  `,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

const DORMS = [
    
  // freshmen

  {
    id: 'barton',
    name: 'Barton Hall',
    position: { lat: 42.72920, lng: -73.67408 },
    yearLevels: ['Underclassmen'],
    style: 'Traditional',
  },
  {
    id: 'bray',
    name: 'Bray Hall',
    position: { lat: 42.72882, lng: -73.67401 },
    yearLevels: ['Underclassmen'],
    style: 'Traditional',
  },
  {
    id: 'barh',
    name: 'Burdett Avenue Residence Hall (BARH)',
    position: { lat: 42.73109, lng: -73.67116 },
    yearLevels: ['Underclassmen'],
    style: 'Suite',
  },
  {
    id: 'cary',
    name: 'Cary Hall',
    position: { lat: 42.72880, lng: -73.67445 },
    yearLevels: ['Underclassmen'],
    style: 'Traditional',
  },
  {
    id: 'crockett',
    name: 'Crockett Hall',
    position: { lat: 42.72838, lng: -73.67374 },
    yearLevels: ['Underclassmen'],
    style: 'Traditional',
  },
  {
    id: 'nugent',
    name: 'Nugent Hall',
    position: { lat: 42.72746, lng: -73.67503 },
    yearLevels: ['Underclassmen', 'The Arch'],
    style: 'Suite',
  },
  {
      id: 'davidson',
      name: "Davidson Hall",
      position: {lat : 42.72734, lng: -73.67411},
      yearLevels: ['Underclassmen', 'The Arch'],
      style: 'Suite',

  },
  {
    id: 'hall',
    name: 'Hall Hall',
    position: { lat: 42.72865, lng: -73.67526 },
    yearLevels: ['Underclassmen'],
    style: 'Traditional',
  },
  {
    id: 'nason',
    name: 'Nason Hall',
    position: { lat: 42.72771, lng: -73.67350},
    yearLevels: ['Underclassmen'],
    style: 'Traditional',
  },
  {
    id: 'sharp',
    name: 'Sharp Hall',
    position: { lat: 42.72705, lng: -73.67460 },
    yearLevels: ['Underclassmen', 'The Arch'],
    style: 'Suite',
  },
  {
    id: 'warren',
    name: 'Warren Hall',
    position: { lat: 42.72793, lng: -73.67542 },
    yearLevels: ['Underclassmen'],
    style: 'Traditional',
  },

 
  // sophmore

  {
    id: 'rahp_b',
    name: 'Beman and Brinsmade (RAHP B)',
    position: { lat: 42.73492, lng: -73.66480 },
    yearLevels: ['Underclassmen'],
    style: 'Apartment',
  },
  {
    id: 'blitman',
    name: 'Blitman Residence Commons',
    position: { lat: 42.73148, lng: -73.68602 },
    yearLevels: ['Underclassmen'],
    style: 'Suite',
  },
  {
    id: 'rahp_a',
    name: 'Colvin and Albright (RAHP A)',
    position: { lat: 42.73107, lng: -73.66942 },
    yearLevels: ['Underclassmen'],
    style: 'Apartment',
  },
  {
    id: 'ecomplex',
    name: 'E-Complex',
    position: { lat: 42.73149, lng: -73.67925 },
    yearLevels: ['Underclassmen'],
    style: 'Traditional',
  },
  {
    id: 'north',
    name: 'North Hall',
    position: { lat: 42.73136, lng: -73.67982 },
    yearLevels: ['Underclassmen'],
    style: 'Traditional',
  },
  {
    id: 'quad',
    name: 'Quadrangle (Quad)',
    position: { lat: 42.73055, lng: -73.67746 },
    yearLevels: ['Underclassmen'],
    style: 'Traditional',
  },

  
  //junior/senior/grads

  {
    id: 'city_station_w',
    name: 'City Station West',
    position: { lat: 42.72786, lng: -73.68743 },
    yearLevels: ['Upperclassmen'],
    style: 'Apartment',
  },
  {
      id: 'city_station_e',
      name: 'City Station East',
      position: { lat: 42.72774, lng: -73.68697 },
      yearLevels: ['Upperclassmen'],
      style: 'Apartment',
    },
  {
    id: 'poly_apts',
    name: 'Polytechnic Apartment',
    position: { lat: 42.72211, lng: -73.67950 },
    yearLevels: ['Upperclassmen'],
    style: 'Apartment',
  },
  {
    id: 'stacwyck',
    name: 'Stacwyck Apartments',
    position: { lat: 42.73362, lng: -73.66492 },
    yearLevels: ['Upperclassmen'],
    style: 'Apartment',
  },
];

const defaultCenter = { lat: 42.73, lng: -73.6795 };

// recenter helper
const RecenterMap = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);

  return null;
};

const MapLeaf = () => {
  const [selectedDorm, setSelectedDorm] = useState(DORMS[0]);
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('All');

  const filteredDorms = useMemo(() => {
    const q = search.toLowerCase();
    return DORMS.filter((dorm) => {
      const matchesSearch = dorm.name.toLowerCase().includes(q);
      const matchesClass =
        classFilter === 'All' || dorm.yearLevels.includes(classFilter);
      return matchesSearch && matchesClass;
    });
  }, [search, classFilter]);

  return (
    <div className="pt-28 px-6 pb-10 bg-[#f8fafc] min-h-screen flex flex-col">
      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto flex-1 mb-16">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight mb-1">
            Campus Map
          </h1>
          <p className="text-sm text-gray-600 max-w-xl">
            Explore where each dorm is located around campus.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_2fr] gap-6">
          {/* Sidebar */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm h-[480px] flex flex-col">
            <h2 className="text-lg font-semibold mb-2">Dorms</h2>

            {/* Filters */}
            <div className="flex gap-2 mb-3 text-xs">
              {['All', 'Underclassmen', 'Upperclassmen', 'The Arch'].map(
                (year) => (
                  <button
                    key={year}
                    onClick={() => setClassFilter(year)}
                    className={`px-3 py-1 rounded-full border transition ${
                      classFilter === year
                        ? 'bg-[#c8102e] text-white border-[#c8102e]'
                        : 'bg-white border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {year}
                  </button>
                )
              )}
            </div>

            {/* Search */}
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search dorm..."
              className="mb-3 px-3 py-2 text-sm border rounded-lg"
            />

            {/* Dorm list */}
            <div className="flex-1 overflow-y-auto space-y-2">
              {filteredDorms.map((dorm) => (
                <button
                  key={dorm.id}
                  onClick={() => setSelectedDorm(dorm)}
                  className={`w-full text-left px-3 py-2 rounded-lg border ${
                    selectedDorm.id === dorm.id
                      ? 'bg-[#c8102e] text-white border-[#c8102e]'
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium">{dorm.name}</div>
                  <p className="text-xs opacity-80">{dorm.style}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="relative w-full h-[480px] rounded-2xl overflow-hidden border shadow-sm">
            <MapContainer
              center={selectedDorm.position}
              zoom={16}
              style={{ width: '100%', height: '100%' }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <RecenterMap center={selectedDorm.position} />

              {filteredDorms.map((dorm) => (
                <Marker
                  key={dorm.id}
                  position={dorm.position}
                  icon={
                    selectedDorm.id === dorm.id
                      ? dormIconActive
                      : dormIcon
                  }
                  eventHandlers={{
                    click: () => setSelectedDorm(dorm),
                  }}
                >
                  <Popup>
                    <strong>{dorm.name}</strong>
                    <br />
                    {dorm.style}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default MapLeaf;
