import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Confirm } from "semantic-ui-react";
import { delAdvert } from "../../api/service";
import placeholder from "../../assets/placeholder.png";

import "./AdvertDetails.scss";

const AdvertDetails = ({ ...data }) => {
  const history = useHistory();
  const [state, setState] = useState({ open: false });
  const [deleteAds, setDeleteAds] = useState(false);

  const show = () => setState({ open: true });
  const handleConfirm = () => {
    setDeleteAds(true);
  };
  const handleCancel = () => setState({ open: false });

  useEffect(() => {
    if (deleteAds === true) {
      delAdvert(data.id);
      setState({ open: false });
      return history.push("/adverts");
    }
  }, [data.id, deleteAds, history]);

  return (
    <article className="card">
      <h3>Detalles del Producto</h3>
      <div className="card-image">
        <div className="image is-4by3">
          <img
            src={
              data.photo ? `http://localhost:3001${data.photo}` : placeholder
            }
            alt={data.name}
          />
        </div>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4 price">{data.price}€</p>
          </div>
          <div className="media-content">
            <p className="title is-4">{data.name}</p>
          </div>
          <div className="media-content">
            <p className="subtitle is-6">
              {data.sale ? "En venta" : "Se compra"}
            </p>
          </div>
        </div>

        <div className="content">Categorías: {data.tags}</div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-danger is-outlined" onClick={show}>
              Eliminar Anuncio
            </button>
            <Confirm
              open={state.open}
              header="Eliminar Anuncio"
              content="¿Seguro que quieres eliminar el anuncio? Una vez borrado no podrás recuperarlo"
              onCancel={handleCancel}
              onConfirm={handleConfirm}
              size="tiny"
              cancelButton="Cancelar"
              confirmButton="Eliminar"
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default AdvertDetails;
