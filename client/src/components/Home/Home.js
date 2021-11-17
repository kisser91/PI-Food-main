import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Card from "../Card/Card.js";
import Search from "../Search/Search.js"

export default function Home() {
  return (
  <div>
    <Search/>
      <div>
        <Card/>
        <Card/>
        <Card/>
        </div>
    <button>Order Ascendent</button>  
    <button>Order Descendent</button>  
    <button>Order by Type of Diet</button>  
  </div>
);
}