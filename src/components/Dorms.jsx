import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NoPictures from './DormPictures';

const Dorms = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi there! 👋 How can I help you with RPI dorm insights today?', time: '7:20' },
  ]);
  const [input, setInput] = useState('');
  
  // DormSelector states
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedDorm, setSelectedDorm] = useState(null);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [showRoomDetails, setShowRoomDetails] = useState(null);
  const [showModelList, setShowModelList] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleYearClick = (year) => {setSelectedYear(year);};
  const handleDormClick = (dorm) => {
      console.log('Selected dorm:', dorm);
      setSelectedDorm(dorm);
  };
  const handleRoomTypeClick = (roomType) => {
      setSelectedRoomType(roomType);
      setShowRoomDetails(true);
  };
  const handleShowModelList = () => setShowModelList(!showModelList);
  
  const resetVideo = (videoUrl) => {
      setSelectedVideo(null);
      setTimeout(() => setSelectedVideo(videoUrl), 0);
  };
  
  const dormData = {
      Freshman: ['Barton Hall', 'Bray Hall', 'Sharp Hall','Nason Hall'],
      Sophomore: ['North Hall', 'E-Complex', 'Blitman','Quadrangle (Quad)', 'Colvin and Albright (RAHP A)', 'Beman and Brinsmade (RAHP B)'],
      Junior: ['City Station', 'Polytechnic', 'Bryckwyck Apartments', 'Stacwyck Apartments'],
      Senior: ['City Station', 'Polytechnic','Bryckwyck Apartments', 'Stacwyck Apartments']
  };

  const roomTypes = {
      'Barton Hall':['Triple Non-Suite', 'Triple Suite'],
      'Bray Hall': ['Single', 'Double'],
      'Sharp Hall':['Single Suite'],
      'Nason Hall' :['Single', 'Double', 'Triple'],
      'North Hall': ['Single', 'Double'],
      'E-Complex': ['Single', 'Double'],
      'Blitman':['Apartment'],
      'Quadrangle (Quad)':['Single','Double','Quadruple'],
      'Colvin and Albright (RAHP A)':['Apartment'],
      'Beman and Brinsmade (RAHP B)':['Apartment'],
      'City Station':['Apartment'],
      'Polytechnic':['Apartment'],
      'Bryckwyck Apartments':['Single Apartment','Double Apartment'],
      'Stacwyck Apartments':['Apartments']
  };

  const modelData = {
      'Barton Hall': {
          'Triple Non-Suite': [
              //{name: 'North Hall Single1', videoUrl: '/Finalized_Models/North_Hall_Single.mp4'}
          ],
          'Triple Suite': [
              //{name: 'North Hall Single1', videoUrl: '/Finalized_Models/North_Hall_Single.mp4'}
          ]
      },
      'Bray Hall': {
          'Single': [
              //{name: 'North Hall Single1', videoUrl: '/Finalized_Models/North_Hall_Single.mp4'}
          ],
          'Double': [
              //{name: 'North Hall Double', videoUrl: '/Finalized_Models/North_Hall_Double.mp4'}
          ]
      },
      'Sharp Hall': {
          'Single Suite': [
              {name: 'Sharp Hall', videoUrl: '/Finalized_Models/Sharp_Hall.mp4'}
          ]
      },
      'Nason Hall': {
          'Single': [
              {name: 'Nason Hall Single', videoUrl: '/Finalized_Models/Nason_Hall_Single.mp4'}
          ],
          'Double': [
              {name: 'Nason Hall Double', videoUrl:'/Finalized_Models/Nason_Hall_Double.mp4'}
          ],
          'Triple': [
              {name: 'Nason Hall Triple', videoUrl:'/Finalized_Models/Nason_Hall_Triple.mp4'}
          ]
      },
      'North Hall': {
          'Single': [
              {name: 'North Hall Single', videoUrl: '/Finalized_Models/North_Hall_Single.mp4'},
              {name: 'North Hall Single2', videoUrl: '/Finalized_Models/North_Hall_Single2.mp4'}
          ],
          'Double': [
              {name: 'North Hall Double', videoUrl: '/Finalized_Models/North_Hall_Double.mp4'}
          ]
      },
      'E-Complex': {
          'Single': [
              {name: 'E-Complex Single', videoUrl: '/Finalized_Models/Ecomplex_Single.mp4'},
              {name: 'E-Complex Single2', videoUrl: '/Finalized_Models/Ecomplex_Single2.mp4'}
          ],
          'Double': [
              //{name: 'E-Complex_Double1', videoUrl: '/Finalized_Models/Ecomplex_Double.mp4'}
          ]
      },
      'Blitman': {
          'Apartment': [
              {name: 'Blitman Apt', videoUrl: '/Finalized_Models/Blitman.mp4'}
          ]
      },
      'Quadrangle (Quad)': {
          'Single': [
              {name: 'Quad Single Cooper', videoUrl: '/Finalized_Models/Quad_Single_Cooper.mp4'},
              {name: 'Quad Single Hunt', videoUrl: '/Finalized_Models/Quad_Single_Hunt.mp4'}
          ],
          'Double': [
              {name: 'Quad Double Macdonald', videoUrl: '/Finalized_Models/Quad_Double_Macdonald.mp4'}
          ],
          'Quadruple': [
              //{name: 'E-Complex_Double1', videoUrl: '/Finalized_Models/Ecomplex_Double.mp4'}
          ]
      },
      'Colvin and Albright (RAHP A)': {
          'Apartment': [
              {name: 'RAHP A', videoUrl: '/Finalized_Models/Rhaps_A.mp4'}
          ]
      },
      'Beman and Brinsmade (RAHP B)': {
          'Apartment': [
              {name: 'RAHP B ', videoUrl: '/Finalized_Models/Rhaps_B.mp4'}
          ]
      },
      'City Station': {
          'Apartment': [
              //{name: 'Blitman Apt1', videoUrl: '/Finalized_Models/Blitman.mp4'}
          ]
      },
      'Polytechnic': {
          'Apartment': [
              //{name: 'Blitman Apt1', videoUrl: '/Finalized_Models/Blitman.mp4'}
          ]
      },
      'Bryckwyck Apartments': {
          'Single Apartment': [
              {name: 'Bryckwyck Single Apt', videoUrl: '/Finalized_Models/Bryckwyck_Single.mp4'}
          ],
          'Double Apartment':[
              //{name: 'Blitman Apt1', videoUrl: '/Finalized_Models/Blitman.mp4'}
          ]
      },
      'Stacwyck Apartments': {
          'Apartment': [
              //{name: 'Blitman Apt1', videoUrl: '/Finalized_Models/Blitman.mp4'}
          ]
      },
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = { sender: 'user', text: input, time: '7:21' };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: "Thanks for your question! I'll get that info for you shortly.", time: '7:22' },
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Dorms Page</h1>
      <p className="text-lg mb-8">
        Explore different dorms at RPI and ask questions using the chatbot!
      </p>

      {/* DormSelector Component */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10">
        <h2 className="text-2xl font-bold mb-4">RPI Dorm Explorer</h2>
        <div className="flex gap-2 mb-6">
          <button 
            onClick={() => handleYearClick('Freshman')}
            className="px-4 py-2 bg-[#c8102e] text-white rounded-md hover:opacity-90"
          >
            Freshman
          </button>
          <button 
            onClick={() => handleYearClick('Sophomore')}
            className="px-4 py-2 bg-[#c8102e] text-white rounded-md hover:opacity-90"
          >
            Sophomore
          </button>
          <button 
            onClick={() => handleYearClick('Junior')}
            className="px-4 py-2 bg-[#c8102e] text-white rounded-md hover:opacity-90"
          >
            Junior
          </button>
          <button 
            onClick={() => handleYearClick('Senior')}
            className="px-4 py-2 bg-[#c8102e] text-white rounded-md hover:opacity-90"
          >
            Senior
          </button>
        </div>

        {selectedYear && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">{selectedYear} Dorms</h3>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {dormData[selectedYear].map((dorm) => (
                <li key={dorm} className="mb-4">
                  <button 
                    onClick={() => handleDormClick(dorm)}
                    className={`px-3 py-2 border rounded-md w-full text-left hover:bg-gray-100 ${
                      selectedDorm === dorm ? 'border-[#c8102e] bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    {dorm}
                  </button>
                  {selectedDorm === dorm && roomTypes[dorm] && ( 
                    <ul className="mt-2 pl-4">
                      {roomTypes[dorm].map((roomType) => (
                        <li key={roomType}>
                          <button 
                            onClick={() => handleRoomTypeClick(roomType)}
                            className={`px-2 py-1 text-sm rounded-md hover:bg-gray-100 ${
                              selectedRoomType === roomType ? 'text-[#c8102e] font-bold' : ''
                            }`}
                          >
                            {roomType}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {showRoomDetails && selectedDorm && selectedRoomType && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex gap-2 mb-4">
              <Link to="/dorm-pictures" className="bg-[#1e1e1e] text-white px-4 py-2 rounded-md hover:opacity-90">
                Videos
              </Link>
              <button 
                onClick={handleShowModelList}
                className="bg-[#1e1e1e] text-white px-4 py-2 rounded-md hover:opacity-90"
              >
                {showModelList ? 'Hide 3D Models' : 'View 3D Models'}
              </button>
            </div>
            
            {showModelList && modelData[selectedDorm] && modelData[selectedDorm][selectedRoomType] && (
              <div className="flex flex-wrap gap-2 mt-4">
                {modelData[selectedDorm][selectedRoomType].map((model, index) => (
                  <button
                    key={index}
                    onClick={() => resetVideo(model.videoUrl)}
                    className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    {model.name}
                  </button>
                ))}
              </div>
            )}

            {modelData[selectedDorm] && modelData[selectedDorm][selectedRoomType] && 
             modelData[selectedDorm][selectedRoomType].length === 0 && (
              <p className="text-gray-600 italic">No 3D models available for this room type.</p>
            )}
          </div>
        )}

          {selectedVideo && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">3D Model Preview</h3>
              {console.log("Loading video from path:", selectedVideo)}
              <video 
                controls 
                className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
                onError={(e) => {
                  console.error("Video error details:", {
                    errorCode: e.target.error ? e.target.error.code : 'No error code',
                    errorMessage: e.target.error ? e.target.error.message : 'No error message',
                    src: e.target.currentSrc || 'No source'
                  });
                }}
              >
                <source src={selectedVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

            </div>
          )}
      </div>

      {/* Floating Help Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-[#1e1e1e] text-white px-5 py-3 rounded-full shadow-lg hover:opacity-90 transition"
        >
          Assistance
        </button>
      )}

      {/* Chat Popup */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 w-[350px] h-[500px] bg-white rounded-xl shadow-2xl border border-gray-300 flex flex-col overflow-hidden z-50">
          <div className="bg-[#1e1e1e] text-white px-4 py-3 flex justify-between items-center">
            <h2 className="text-sm font-medium">Need Help?</h2>
            <button onClick={() => setIsChatOpen(false)} className="text-white text-lg font-bold">×</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 text-sm text-gray-800">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    msg.sender === 'user'
                      ? 'bg-[#e5e5ea] text-right'
                      : 'bg-[#f1f0f0] text-left'
                  }`}
                >
                  <p>{msg.text}</p>
                  <div className="text-[10px] mt-1 text-gray-400">{msg.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-white border-t flex items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              type="text"
              placeholder="Type your message..."
              className="flex-1 border px-3 py-2 rounded-full text-sm focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="ml-2 text-[#c8102e] font-bold text-lg"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dorms;
