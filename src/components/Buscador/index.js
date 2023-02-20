import PropTypes from 'prop-types'

export const Buscador = ({ defaultValue, onSearch }) => {
  return <form onSubmit={e => {
    e.preventDefault()
    onSearch?.({ value: e.target.searcher[0].value})
    // e.target.searcher[0].value = ""
    // e.target.reset()
  }}>
    <div className="input-group mb-3">
      <input defaultValue={defaultValue} name="searcher" type="text" className="form-control" placeholder="Busca aquí el problema que quieres" />
      <button className="searcher" id="searcher">Buscar</button>
    </div>
  </form>
}

Buscador.propTypes = {
  initialValue: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired
}


