function Card(props) {
	function handleClick() {
		props.onCardClick(props.card);
	}  

  return (
		<article className="elements__element">
			<div className="elements__image"
			 style={{ backgroundImage: `url(${props.src})` }} 
			 alt={props.title}
			 onClick={handleClick}></div>
			<button className="elements__delete" type="button"></button>
			<div className="elements__row">
				<h2 className="elements__name">{props.title}</h2>
				<div className="elements__like-and-count">
					<button type="button" className="elements__like"></button>
					<p className="elements__count-of-likes">{props.like.length}</p>
				</div>
			</div>
		</article>
	);
}

export default Card;

