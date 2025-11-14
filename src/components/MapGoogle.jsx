import React, { useMemo, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';


const DORMS = [
    
    // freshmen
 
    {
      id: 'barton',
      name: 'Barton Hall',
      position: { lat: 42.72920, lng: -73.67408 },
      yearLevels: ['Freshman'],
      style: 'Traditional',
    },
    {
      id: 'bray',
      name: 'Bray Hall',
      position: { lat: 42.72882, lng: -73.67401 },
      yearLevels: ['Freshman'],
      style: 'Traditional',
    },
    {
      id: 'barh',
      name: 'Burdett Avenue Residence Hall (BARH)',
      position: { lat: 42.73109, lng: -73.67116 },
      yearLevels: ['Freshman'],
      style: 'Suite',
    },
    {
      id: 'cary',
      name: 'Cary Hall',
      position: { lat: 42.72945, lng: -73.67439 },
      yearLevels: ['Freshman'],
      style: 'Traditional',
    },
    {
      id: 'crockett',
      name: 'Crockett Hall',
      position: { lat: 42.72838, lng: -73.67374 },
      yearLevels: ['Freshman'],
      style: 'Traditional',
    },
    {
      id: 'nugent',
      name: 'Nugent Hall',
      position: { lat: 42.72746, lng: -73.67503 },
      yearLevels: ['Freshman', 'The Arch'],
      style: 'Suite',
    },
    {
        id: 'davidson',
        name: "Davidson Hall",
        position: {lat : 42.72734, lng: -73.67411},
        yearLevels: ['Freshman', 'The Arch'],
        style: 'Suite',

    },
    {
      id: 'hall',
      name: 'Hall Hall',
      position: { lat: 42.72865, lng: -73.67526 },
      yearLevels: ['Freshman'],
      style: 'Traditional',
    },
    {
      id: 'nason',
      name: 'Nason Hall',
      position: { lat: 42.72771, lng: -73.67350},
      yearLevels: ['Freshman'],
      style: 'Traditional',
    },
    {
      id: 'sharp',
      name: 'Sharp Hall',
      position: { lat: 42.72705, lng: -73.67460 },
      yearLevels: ['Freshman', 'The Arch'],
      style: 'Suite',
    },
    {
      id: 'warren',
      name: 'Warren Hall',
      position: { lat: 42.72793, lng: -73.67542 },
      yearLevels: ['Freshman'],
      style: 'Traditional',
    },
  
   
    // sophmore
  
    {
      id: 'rahp_b',
      name: 'Beman and Brinsmade (RAHP B)',
      position: { lat: 42.73492, lng: -73.66480 },
      yearLevels: ['Sophomore'],
      style: 'Apartment',
    },
    {
      id: 'blitman',
      name: 'Blitman Residence Commons',
      position: { lat: 42.73148, lng: -73.68602 },
      yearLevels: ['Sophomore'],
      style: 'Suite',
    },
    {
      id: 'rahp_a',
      name: 'Colvin and Albright (RAHP A)',
      position: { lat: 42.73107, lng: -73.66942 },
      yearLevels: ['Sophomore'],
      style: 'Apartment',
    },
    {
      id: 'ecomplex',
      name: 'E-Complex',
      position: { lat: 42.73149, lng: -73.67925 },
      yearLevels: ['Sophomore'],
      style: 'Traditional',
    },
    {
      id: 'north',
      name: 'North Hall',
      position: { lat: 42.73136, lng: -73.67982 },
      yearLevels: ['Sophomore'],
      style: 'Traditional',
    },
    {
      id: 'quad',
      name: 'Quadrangle (Quad)',
      position: { lat: 42.73055, lng: -73.67746 },
      yearLevels: ['Sophomore', 'The Arch'],
      style: 'Apartment',
    },
  
    
    //junior/senior/grads

    {
      id: 'city_station',
      name: 'City Station West',
      position: { lat: 42.7343, lng: -73.6790 },
      yearLevels: ['Junior/Senior/Co-term'],
      style: 'Apartment',
    },
    {
        id: 'city_station',
        name: 'City Station East',
        position: { lat: 42.72774, lng: -73.68697 },
        yearLevels: ['Junior/Senior/Co-term'],
        style: 'Apartment',
      },
    {
      id: 'poly_apts',
      name: 'Polytechnic Apartments',
      position: { lat: 42.72211, lng: -73.67950 },
      yearLevels: ['Junior/Senior/Co-term'],
      style: 'Apartment',
    },
    {
      id: 'stacwyck',
      name: 'Stacwyck Apartments',
      position: { lat: 42.73362, lng: -73.66492 },
      yearLevels: ['Junior/Senior/Co-term'],
      style: 'Apartment',
    },
  ];
  