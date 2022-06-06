// 오브젝트로 바로 푸다. 디스트럭처링 문법 
const MainCard = ({img, onHeartClick,alreadyFavorite}) => {
    const heartIcon = alreadyFavorite ? "💖" : "🤍";
    return(
      <div className="main-card">
        <img src={img} alt="고양이" width="400" />
        <button onClick={onHeartClick}>{heartIcon}</button>
      </div>
    )
  };

  export default MainCard;