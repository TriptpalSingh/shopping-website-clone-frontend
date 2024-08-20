import React, { useRef, useState, useEffect } from 'react'

import './search.css'
import Predictions from '../predictions/Predictions';

function Search(props) {

  


  const [filteredList, setFilteredList] = useState(null);
  const [togglePredictions, setTogglePredictions] = useState(false);
  const [predictionList, setPredictionList] = useState([]);
  const searchRef = useRef();
  const fromRef = useRef();
  const toRef = useRef();
  const [value, setValue] = useState("");


  useEffect(() => {
    console.log(props.list);
    document.addEventListener('mousedown', handleMouseDown, true);

  }, []);

  const handleMouseDown = (e)=>{
    if(searchRef.current != null && searchRef.current.value && searchRef.current.contains(e.target)){
      setTogglePredictions(true);
    }
    else{
      setTogglePredictions(false);
    }
    // console.log("down");
  }


  const handleSearchClick = (e)=>{
    // fromRef.current.value = 0;
    // toRef.current.value = 0;
    setValue(searchRef.current.value);
    const tempList = props.list.filter((item)=>{
      if(item.title.toLowerCase().includes(searchRef.current.value.toLowerCase())){
        return true;
      }
      else{
        return false;
      }
    })
    
    setFilteredList(tempList);
    props.setNewList(tempList);
  }

  const handleChange = (e)=>{
    const value = searchRef.current.value;

    const tempList = props.list.filter((item)=>{
      if(item.title.toLowerCase().includes(value.toLowerCase())){
        return true;
      }
      else{
        return false;
      }
    })

    setPredictionList(tempList);
    // console.log(tempList);


    if(value && tempList.length > 0){
      setTogglePredictions(true);
    }
    else{
      setTogglePredictions(false);
    }
  }

  const handleCross = (e)=>{
    e.preventDefault();
    if(searchRef.current != null){
      searchRef.current.value = "";
      handleSearchClick(e);
    }
  }

  // const handlePriceFilter = (e)=>{
  //   let fromValue = fromRef.current.value;
  //   let toValue = toRef.current.value;

  //   if(fromValue == ""){
  //     fromValue = 0
  //   }

  //   if(toValue == "" || toValue == 0){
  //     toValue = Number.MAX_SAFE_INTEGER;
  //   }

  //   console.log(fromValue + " " + toValue)

  //   let tempList = [];

  //   if(filteredList == null){
  //     tempList = props.list.filter((item)=>{
  //       if(item.price >= fromValue && item.price <= toValue){
  //         return true;
  //       }
  //       else{
  //         return false;
  //       }
  //     })
  //   }
  //   else{
  //     tempList = filteredList.filter((item)=>{
  //       if(item.price >= fromValue && item.price <= toValue){
  //         return true;
  //       }
  //       else{
  //         return false;
  //       }
  //     })
  //   }

  //   props.setNewList(tempList);
  // }

  return (
    <div className='search--outer'>
        <div className='search--inner'>
            <input ref={searchRef} onChange={handleChange} type='text' className='search--input'  placeholder='Search'  name='search'></input>
            {/* <button className='search--crossBtn' onClick={handleCross}>x</button> */}
            <button className=' search--btn' onClick={handleSearchClick}><img src='/assets/magnifying-glass.png' alt='icon' className='searchIcon'></img></button>
        </div>
        {/* price filter part */}
        {/* <div className='search--filter-outer'>
          Price From:<input ref={fromRef} className='filter--input' type='number' step={50} min={0} placeholder='0'></input> to:<input ref={toRef} className='filter--input' type='number' step={50} min={0} placeholder='0'></input>
          <button className='btn' onClick={handlePriceFilter}>Apply</button>
        </div> */}
        {
          togglePredictions ? <Predictions list={predictionList}/> : null
        }
    </div>
  )
}

export default Search
