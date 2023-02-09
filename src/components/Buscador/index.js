import PropTypes from "prop-types";

export const Buscador = ({
  initialValue,
  onSearch,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch?.({
          value: e.target.searcher[0].value,
        });
      }}
    >
      <div className="input-group mb-3">
        <input
          defaultValue={initialValue}
          name="searcher"
          type="text"
          className="form-control"
          placeholder="Busca el problema que te interese"
          aria-label="Busca el problema que te interese"
          aria-describedby="searcher"
        />
        <button
          className="input-group-text"
          id="searcher"
        >
          Buscar
        </button>
      </div>
    </form>
  );
};

Buscador.propTypes = {
  initialValue: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
};
