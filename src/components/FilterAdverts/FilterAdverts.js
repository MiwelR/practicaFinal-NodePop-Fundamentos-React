import { useState } from "react";
import { Button, Input, Select } from "semantic-ui-react";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";

import "./FilterAdverts.scss";

const saleOptions = [
  { key: "true", value: true, text: "En venta" },
  { key: "false", value: false, text: "Se compra" },
  { key: "all", value: "all", text: "Ambos" },
];

const tagsOptions = [
  { key: "lifestyle", value: "lifestyle ", text: "lifestyle" },
  { key: "mobile", value: "mobile ", text: "mobile" },
  { key: "motor", value: "motor ", text: "motor" },
  { key: "work", value: "work ", text: "work" },
];

const initialStateForm = {
  name: "",
  sale: "",
  price: [],
  tags: [],
};

export default function FilterAdverts(props) {
  const { handleSearch } = props;
  const [state, setState] = useState(initialStateForm);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeRange = (range) => {
    setState({
      ...state,
      // eslint-disable-next-line no-useless-computed-key
      ["price"]: range,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  const handleClean = () => {
    setState(initialStateForm);
    handleSearch(initialStateForm);
  };

  return (
    <form className="search-filters" onSubmit={handleSubmit}>
      <h3>Búsqueda de Anuncios</h3>
      <div>
        <div className="left">
          <p>Título del anuncio</p>
          <Input
            type="text"
            name="name"
            placeholder="Título del anuncio"
            value={state.name}
            onChange={handleChange}
          />
        </div>
        <div className="right">
          <p>Rango de Precios</p>
          <Input
            placeholder="Precio Mínimo"
            type="text"
            disabled
            value={state.price[0] || ""}
          ></Input>
          <Input
            placeholder="Precio Máximo"
            type="text"
            disabled
            value={state.price[1] || ""}
          ></Input>
          <Range
            allowCross={false}
            defaultValue={[0, 100]}
            min={0}
            max={3000}
            draggableTrack
            onChange={handleChangeRange}
          />
          <p>Tipo de Anuncio</p>
          <Select
            name="sale"
            placeholder="¿De venta, compra o ambos?"
            value={state.sale}
            onChange={(e, { value }) =>
              setState({
                ...state,
                [Object.keys(state)[1]]: value,
              })
            }
            options={saleOptions}
          />
          <p>Tags</p>
          <Select
            multiple
            name="tags"
            placeholder="Categoría/as"
            value={state.tags}
            onChange={(e, { value }) =>
              setState({
                ...state,
                [Object.keys(state)[3]]: value,
              })
            }
            options={tagsOptions}
          />
          <div>
            <span></span>
            <Button
              type="submit"
              variant="primary"
              onClick={() => handleSearch(state)}
            >
              Buscar
            </Button>
            <Button variant="primary" onClick={handleClean}>
              Limpiar
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
