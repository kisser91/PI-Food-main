import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAll, getTypes } from '../../actions/index.js';
import Cards from "../Cards/Cards.js";



export default function Home() {
const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAll());
    dispatch(getTypes())
},[dispatch]);

const dietTypes = useSelector((state) => state.dietTypes);
const [order, setOrder] = useState("");
const [type, setType] = useState("");
const [diets, setDiets] = useState("");

const orderChange = (e) => {
  e.preventDefault();
  setOrder(e.target.value);
}
const typeChange = (e) => {
  e.preventDefault();
  setType(e.target.value);
}
const dietsChange = (e) => {
  e.preventDefault();
  setDiets(e.target.value);
}

  return (
  <div>
    <div>
          <select  name="order" onChange={e => orderChange(e)}>
             <option value="Increasing">Increasing</option>
             <option value="Decreasing">Decreasing</option>
          </select>
          <select  name="type" onChange={e => typeChange(e)}>
             <option value="Alphabetical">Alphabetical</option>
             <option value="Score">Score</option>
          </select>
          <select  name="diets" onChange={e => dietsChange(e)}>{
            dietTypes.map(el => {return <option value={el.title}>{el.title}</option>})
          }
          </select>


    </div>
       <div>
        <Cards/>
        </div>
    
  </div>
);
}