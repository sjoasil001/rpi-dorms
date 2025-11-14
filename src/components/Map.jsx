// import React from 'react';

// const Map = () => {
//   return (
//     <div className="pt-32 text-center">
//       <h1 className="text-3xl font-bold">Map Coming Soon</h1>
//     </div>
//   );
// };

// export default Map;

// src/components/Map.jsx
import React, { useState, useMemo } from 'react';

// Simple dorm data with fake coordinates (0–100 = % of width/height)
const DORMS = [
  {
    id: 'barton',
    name: 'Barton Hall',
    x: 30,
    y: 35,
    yearLevels: ['Freshman'],
    style: 'Suite',
    rating: 4.3,
  },
  {
    id: 'nason',
    name: 'Nason Hall',
    x: 55,
    y: 28,
    yearLevels: ['Freshman', 'Sophomore'],
    style: 'Traditional',
    rating: 4.0,
  },
  {
    id: 'quad',
    name: 'Polytechnic Residence Quad',
    x: 65,
    y: 55,
    yearLevels: ['Sophomore', 'Upperclass'],
    style: 'Apartment',
    rating: 4.5,
  },
  {
    id: 'barh',
    name: 'BARH',
    x: 40,
    y: 65,
    yearLevels: ['Upperclass'],
    style: 'Suite',
    rating: 4.1,
  },
];

const Map = () => {
  const [selectedDorm, setSelectedDorm] = useState(DORMS[0]);
  const [search, setSearch] = useState('');

  const filteredDorms = useMemo(() => {
    const q = search.toLowerCase();
    return DORMS.filter((d) => d.name.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="pt-28 px-6 pb-10 bg-[#f8fafc] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight mb-1">
            Campus Map
          </h1>
          <p className="text-sm text-gray-600 max-w-xl">
            Explore where each dorm is on campus. Click a marker or choose a dorm
            from the list to highlight its location.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_2fr] gap-6">
          {/* Sidebar */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm h-[480px] flex flex-col">
            <h2 className="text-lg font-semibold mb-3">Dorms</h2>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search dorm..."
              className="mb-3 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#c8102e]"
            />

            <div className="flex-1 overflow-y-auto space-y-2 text-sm">
              {filteredDorms.map((dorm) => (
                <button
                  key={dorm.id}
                  onClick={() => setSelectedDorm(dorm)}
                  className={
                    'w-full text-left px-3 py-2 rounded-lg border transition ' +
                    (selectedDorm?.id === dorm.id
                      ? 'bg-[#c8102e] text-white border-[#c8102e]'
                      : 'bg-white hover:bg-gray-50 border-gray-200')
                  }
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{dorm.name}</span>
                    <span className="text-xs opacity-80">
                      ⭐ {dorm.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-xs opacity-80">
                    {dorm.style} • {dorm.yearLevels.join(', ')}
                  </p>
                </button>
              ))}

              {filteredDorms.length === 0 && (
                <p className="text-xs text-gray-500 mt-2">
                  No dorms match “{search}”.
                </p>
              )}
            </div>

            {selectedDorm && (
              <div className="mt-4 border-t border-gray-100 pt-3 text-xs">
                <p className="font-semibold text-sm mb-1">
                  {selectedDorm.name}
                </p>
                <p className="text-gray-600 mb-1">
                  {selectedDorm.style} • {selectedDorm.yearLevels.join(', ')}
                </p>
                <p className="text-gray-500">
                  This is a quick location preview. Go to the Dorms page for
                  full reviews, photos, and more details.
                </p>
              </div>
            )}
          </div>

          {/* Map area */}
          <div className="relative w-full h-[480px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-gradient-to-br from-slate-100 to-slate-200">
            {/* Fake “map” grid / campus background */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
              <div className="w-full h-full bg-[radial-gradient(circle_at_top,_white,_transparent_60%)]" />
            </div>

            {/* Optional campus label */}
            <div className="absolute top-3 left-4 z-10 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-gray-700 border border-white">
              RPI Campus (mock layout)
            </div>

            {/* Markers */}
            {DORMS.map((dorm) => {
              const isActive = selectedDorm?.id === dorm.id;
              return (
                <button
                  key={dorm.id}
                  onClick={() => setSelectedDorm(dorm)}
                  className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center"
                  style={{
                    left: `${dorm.x}%`,
                    top: `${dorm.y}%`,
                  }}
                >
                  {/* Ping / marker */}
                  <div
                    className={
                      'w-4 h-4 rounded-full border-2 shadow-sm transition ' +
                      (isActive
                        ? 'bg-[#c8102e] border-white scale-110'
                        : 'bg-white border-[#c8102e]')
                    }
                  />
                  {/* Label bubble on active */}
                  {isActive && (
                    <div className="mt-1 px-2 py-1 rounded-full bg-white text-xs font-medium text-gray-800 shadow border border-gray-200">
                      {dorm.name}
                    </div>
                  )}
                </button>
              );
            })}

            {/* Legend */}
            <div className="absolute bottom-3 left-4 z-10 bg-white/85 backdrop-blur px-3 py-2 rounded-xl text-xs text-gray-700 border border-gray-200 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#c8102e]" />
              <span>Dorm location</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;

