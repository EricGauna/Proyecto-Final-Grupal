import PropTypes from 'prop-types'

export const Card = ({ children, className = "", img = "https://sorianoticias.com/img/icono_comercio.png", title, description, onClickCard, onClickButton, textButton }) => {
    return <div className={`card w-25 p-3 pointer ${className}`} onClick={onClickCard}>
        <img src={img} className="card-img" alt={title} />
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <h4 className="card-description">{description}</h4>
            {children}
            {onClickButton && <button onClick={(event) => {
                event.stopPropagation()
                onClickButton()
            }} className="btn btn-success">{textButton || 'Ver detalle'}</button>}
        </div>
    </div>
}

Card.propTypes = {
    className: PropTypes.string,
    img: PropTypes.string,
    title: PropTypes.string,
    onClickButton: PropTypes.func,
    onClickCard: PropTypes.func,
    textButton: PropTypes.string
}