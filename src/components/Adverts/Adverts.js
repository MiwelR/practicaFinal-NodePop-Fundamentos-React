import React from "react";
// import T from "prop-types";
import placeholder from "../../assets/placeholder.png";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import "./Adverts.scss";

const Advert = ({ ...adverts }) => {
  return (
    <article className="card">
      {/* <div className="card"> */}
      <div className="card-image">
        <div className="image is-4by3">
          <img
            src={
              adverts.photo
                ? `http://localhost:3001${adverts.photo}`
                : placeholder
            }
            alt={adverts.name}
          />
        </div>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4 price">{adverts.price}€</p>
          </div>
          <div className="media-content">
            <p className="title is-4">{adverts.name}</p>
          </div>
          <div className="media-content">
            <p className="subtitle is-6">
              {adverts.sale ? "En venta" : "Se compra"}
            </p>
            <p>
              <span className="namecolor">
                <time dateTime={adverts.createdAt}>
                  {formatDistanceToNow(new Date(adverts.createdAt))}
                </time>
              </span>
            </p>
          </div>
        </div>

        <div className="content">Categorías: {adverts.tags}</div>
      </div>
      {/* </div> */}
    </article>
  );
};

// export const advertType = {
//   user: T.shape({ name: T.string.isRequired, username: T.string.isRequired })
//     .isRequired,
//   updatedAt: T.string.isRequired,
//   content: T.string,
//   likes: T.array.isRequired,
// };

// Advert.propTypes = advertType;

// Advert.defaultProps = {
//   content: "Nothing here!",
// };

export default Advert;
