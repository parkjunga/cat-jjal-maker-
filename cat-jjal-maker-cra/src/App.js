import logo from './logo.svg';
import React from 'react';
import './App.css';
import Title from './components/Title';
import Favorites from './components/Favorites';
import MainCard from './components/MainCard';
import Form from './components/Form';


const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};

// 리액트 컨벤션 이벤트 핸들러 이름 지을경우 handle로 시작하고 prop으로 넘길경우 On을 붙인다.

// 인라인 스타일 


const FOO = "hello world";

// 컴포넌트화
const App = () => {
  const CAT1 = "https://cataas.com/cat/60b73094e04e18001194a309/says/react";
  const CAT2 = "https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn";
  const CAT3 = "https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript";

  // 로컬스토리지값은 string이라 number로 바꿔야됨
  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem('counter');
  });
  const [mainCat, setMainCat] = React.useState("https://cataas.com/cat/60b73094e04e18001194a309/says/reacts");
  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem('favorites') || []
  });

  const alreadyFavorite = favorites.includes(mainCat); // includes 자바스크립트 배열 API 

  React.useEffect(() => {
    setInitialCat();
  },[]);

  async function setInitialCat() {
    const newCat = await fetchCat("First Cat"); // 처음 진입시 
    setMainCat(newCat);
  }

  // 상태끌어올리기
  async function updateMainCat(value) {
    //event.preventDefault();// 이벤트의 기본동작이막아짐
    const newCat = await fetchCat(value);
    
    setMainCat(newCat);
    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem("counter",nextCounter);
      return nextCounter;
    });
  }

  function handleHeartClick() {
    console.log('하트눌렀음');
    const nextFavorites = [...favorites, mainCat];
    setFavorites(nextFavorites); // 기존 배열에 CAT3를 추가한다는 의미
    jsonLocalStorage.setItem('favorites',nextFavorites);
  }

  const counterTitle = counter === null ? "" : counter + " 번째";

  return (
    <div>
      <Title>{counterTitle} 고양이 가라사대</Title>
      <Form updateMainCat={updateMainCat}/>
      <MainCard img={mainCat} onHeartClick={handleHeartClick} alreadyFavorite={alreadyFavorite} />
      <Favorites favorites={favorites} />
    </div>
  )
};

export default App;
