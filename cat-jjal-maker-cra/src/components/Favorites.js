import CatItem from "./CatItem";
// 자바스크립트 표현식을 중괄호에[ 넣을수 있다.


function Favorites({favorites})
{
  if (favorites.length === 0) {
    return <div>사진 위 하트를 눌러 고양이 사진을 저장해봐요!</div>
  }

  return(
    <ul className="favorites">
      {favorites.map((cat) => (
        <CatItem img={cat} key={cat} />
      ))}
    </ul> 
  );
}

export default Favorites;