import PropTypes from 'prop-types'

export const Card = ({ children, className = "", img = "https://sorianoticias.com/img/icono_comercio.png", title, onClickCard }) => {
    return <div className={`card w-25 p-3 pointer ${className}`} onClick={onClickCard}>
        <img src={img} className="card-img-top img-thumbnail img-rounded" alt={title} />
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            {children}
            
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