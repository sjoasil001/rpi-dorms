import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import NoPictures from './DormPictures';
import './style.css';

function DormSelector(){
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
    const handleRoomTypeClick = (roomType) => 
        {
            setSelectedRoomType(roomType);
            setShowRoomDetails(true);
        };
    const handleShowModelList = () => setShowModelList(!showModelList);

    
    const resetVideo = (videoUrl) => {
        setSelectedVideo(null);
        setTimeout(() => setSelectedVideo(videoUrl), 0);
    };
    
    
    const dormData = 
    {
        Freshman: ['Barton Hall', 'Bray Hall', 'Sharp Hall','Nason Hall'],
        Sophomore: ['North Hall', 'E-Complex', 'Blitman','Quadrangle (Quad)', 'Colvin and Albright (RAHP A)', 'Beman and Brinsmade (RAHP B)'],
        Junior: ['City Station', 'Polytechnic', 'Bryckwyck Apartments', 'Stacwyck Apartments'],
        Senior: ['City Station', 'Polytechnic','Bryckwyck Apartments', 'Stacwyck Apartments']
    };

    const roomTypes =
    {
        'Barton Hall':['Triple'],
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
    }

    const modelData = {
        'Barton Hall': {
            'Triple': [
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
    

    return(
        <div>
            <h2>RPI Dorm</h2>
            <div>
                <button onClick={() => handleYearClick('Freshman')}>Freshman</button>
                <button onClick={() => handleYearClick('Sophomore')}>Sophomore</button>
                <button onClick={() => handleYearClick('Junior')}>Junior</button>
                <button onClick={() => handleYearClick('Senior')}>Senior</button>
            </div>

            {selectedYear && (
                <div>
                    <h3>{selectedYear} Dorms</h3>
                    <ul>
                        {dormData[selectedYear].map((dorm) => (
                            <li key={dorm}>
                                <button onClick={() => handleDormClick(dorm)}>
                                    {dorm}
                                </button>
                                {selectedDorm === dorm && roomTypes[dorm] && ( 
                                    <ul>
                                        {roomTypes[dorm].map((roomType) => (
                                            <li key={roomType}>
                                                <button onClick={() => handleRoomTypeClick(roomType)}>
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
                <div>
                    <Link to="/dorm-pictures" style={{textDecoration: 'none'}}>
                        <button>Videos</button>
                    </Link>

                    <button onClick={handleShowModelList}>View 3D Model</button>
                    
                    {showModelList && modelData[selectedDorm] && modelData[selectedDorm][selectedRoomType] && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                            {modelData[selectedDorm][selectedRoomType].map((model, index) => {
                                console.log('Model name:', model.name);
                                console.log('Model video URL:', model.videoUrl);

                                return (
                                    <button
                                        key={index}
                                        onClick={() => resetVideo(model.videoUrl)}
                                        style={{
                                            padding: '10px',
                                            border: '1px solid #ccc',
                                            borderRadius: '5px',
                                            backgroundColor: '#f0f0f0',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {model.name}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                </div>
            )}
            {selectedVideo && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Video Preview</h3>
                    <video controls style={{ width: '100%', maxWidth: '600px' }}>
                        <source src={selectedVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
        </div>
    );
}

export default DormSelector
/*original*/