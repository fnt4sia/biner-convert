import './App.css';
import { useEffect, useState } from 'react';

function App() {
  let max = 8;

  const decToBiner = (num) => {
      let result = '';
      let decimal = num % 1;
      num = Math.floor(num);
      while (num > 0) {
          result = Math.floor(num % 2) + result;
          num = Math.floor(num / 2);
      }
      result += decimal ? '.' : '';
      while (decimal > 0 && result.substring(result.indexOf('.') + 1).length < max) {
          decimal *= 2;
          result += Math.floor(decimal);
          decimal %= 1;
      }
      return result;
  }
  
  const decToOctal = (num) => {
      let result = '';
      let decimal = num % 1;
      num = Math.floor(num);
      while (num > 0) {
          result = (num % 8) + result;
          num = Math.floor(num / 8);
      }
      result += decimal ? '.' : '';
      while (decimal > 0 && result.substring(result.indexOf('.') + 1).length < max) {
          decimal *= 8;
          result += Math.floor(decimal);
          decimal %= 1;
      }
      return result;
  }
  
  const decToHexa = (num) => {
      let hexas = "0123456789ABCDEF";
      let result = '';
      let decimal = num % 1;
      num = Math.floor(num);
      while (num > 0) {
          result = hexas[num % 16] + result;
          num = Math.floor(num / 16);
      }
      result += decimal ? '.' : '';
      while (decimal > 0 && result.substring(result.indexOf('.') + 1).length < max) {
          decimal *= 16;
          result += hexas[Math.floor(decimal)];
          decimal %= 1;
      }
      return result;
  }
  
  const hexaToDec = (num) => {
      let decimal = num.substring(num.indexOf('.') + 1);
      num = num.substring(0, num.indexOf('.'));
      let result = 0;
      let hexas = "0123456789ABCDEF";
      let i = 0;
      while (num.length > 0) {
          result += hexas.indexOf(num[num.length - 1]) * Math.pow(16, i);
          num = num.substring(0, num.length - 1);
          i++;
      }
      i = -1;
      let decimalValue = 0;
      for(let j = 0; j < decimal.length; j++) {
          decimalValue += hexas.indexOf(decimal[j]) * Math.pow(16, i);
          i--;
      }
      result += decimalValue;
      return result;
  }
  
  const octalToDec = (num) => {
      let decimal = num.substring(num.indexOf('.') + 1);
      num = num.substring(0, num.indexOf('.'));
      let result = 0;
      let i = 0;
      while (num.length > 0) {
          result += num[num.length - 1] * Math.pow(8, i);
          num = num.substring(0, num.length - 1);
          i++;
      }
      i = -1;
      let decimalValue = 0;
      for(let j = 0; j < decimal.length; j++) {
          decimalValue += decimal[j] * Math.pow(8, i);
          i--;
      }
      result += decimalValue;
      return result;
  }
  
  const binerToDec = (num) => {
      let decimal = num.substring(num.indexOf('.') + 1);
      num = num.substring(0, num.indexOf('.'));
      let result = 0;
      let i = 0;
      while (num.length > 0) {
          result += num[num.length - 1] * Math.pow(2, i);
          num = num.substring(0, num.length - 1);
          i++;
      }
      i = -1;
      let decimalValue = 0;
      for(let j = 0; j < decimal.length; j++) {
          decimalValue += decimal[j] * Math.pow(2, i);
          i--;
      }
      result += decimalValue;
      return result;
  }

  const[numInput, setNumInput] = useState(null);
  const[numOutput, setNumOutput] = useState(null);
  const[firstSelect, setFirstSelect] = useState("decimal");
  const[secondSelect, setSecondSelect] = useState("biner");

  const changeFirstSelect = (e) => {
    setFirstSelect(e.target.value);
  }
  const changeSecondSelect = (e) => {
    setSecondSelect(e.target.value);
  }

  const changeInput = (e) => {
    setNumInput(e.target.value);
  }

  useEffect(()=>{

    if(firstSelect === "decimal"){
      if(secondSelect === "biner"){
        setNumOutput(decToBiner(numInput))
      }else if(secondSelect === "octa"){
        setNumOutput(decToOctal(numInput))
      }else if(secondSelect === "hexa"){
        setNumOutput(decToHexa(numInput))
      }else{
        setNumOutput(numInput);
      }
    }else if(firstSelect === "biner"){
      if(secondSelect === "decimal"){
        setNumOutput(binerToDec(numInput));
      }else if(secondSelect === "biner"){
        setNumOutput(numInput);
      }else if(secondSelect === "octa"){
        setNumOutput(decToOctal(binerToDec(numInput)));
      }else if(secondSelect === "hexa"){
        setNumOutput(decToHexa(binerToDec(numInput)));
      }
    }else if(firstSelect === "octa"){
      if(secondSelect === "decimal"){
        setNumOutput(octalToDec(numInput));
      }else if(secondSelect === "biner"){
        setNumOutput(decToBiner(octalToDec(numInput)));
      }else if(secondSelect === "octa"){
        setNumOutput(numInput);
      }else if(secondSelect === "hexa"){
        setNumOutput(decToHexa(octalToDec(numInput)));
      }
    }else{
      if(secondSelect === "decimal"){
        setNumOutput(hexaToDec(numInput));
      }else if(secondSelect === "biner"){
        setNumOutput(decToBiner(hexaToDec(numInput)))
      }else if(secondSelect === "octa"){
        setNumOutput(decToOctal(hexaToDec(numInput)))
      }else if(secondSelect === "hexa"){
        setNumOutput(numInput)
      }
    }
  }, [numInput, firstSelect, secondSelect])

  return (
    <>
    <h1>Number Converter</h1>
    <div className='wrapper'>
      <div className='outer-container'>
        <h3>From</h3>
        <div className='inner-container'>
          <select defaultValue={firstSelect} onChange={changeFirstSelect}>
            <option value="decimal">Decimal</option>
            <option value="biner">Biner</option>
            <option value="octa">Octa</option>
            <option value="hexa">Hexa</option>
          </select>
          <input type='text' onChange={changeInput} value={numInput} placeholder='put something here'></input>
        </div>
      </div>
      <div className='outer-container'>
        <h3>To</h3>
        <div className='inner-container'>
          <select defaultValue={secondSelect} onChange={changeSecondSelect}>
            <option value="decimal">Decimal</option>
            <option value="biner">Biner</option>
            <option value="octa">Octa</option>
            <option value="hexa">Hexa</option>
          </select>
          <input type='text' value={numOutput} id='result'></input>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
