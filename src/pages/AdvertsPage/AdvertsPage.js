import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLatestAdverts, getFilterAdvert } from "../../api/service";
import Layout from "../../layouts";
import Adverts from "../../components/Adverts";
import { Button } from "semantic-ui-react";
import FilterAdverts from "../../components/FilterAdverts/FilterAdverts";

import "./AdvertsPage.scss";

const EmptyList = () => (
  <div style={{ textAlign: "center" }}>
    <p>Sé el primero en crear un anuncio!</p>
    <Link to="/adverts/new">
      <Button>Crear anuncio</Button>
    </Link>
  </div>
);

const NotFoundList = () => (
  <div style={{ textAlign: "center" }}>
    <p>No se han encontrado resultados</p>
    <p>Prueba a realizar otra búsqueda!</p>
    {/* <Link to="/adverts/new">
      <Button>Crear anuncio</Button>
    </Link> */}
  </div>
);

function AdvertsPage(...props) {
  const [adverts, setAdverts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [filteredAdverts, setFilteredAdverts] = useState([]);

  useEffect(() => {
    if (filters.length === 0) {
      getLatestAdverts().then((adverts) => {
        setAdverts(adverts);
        setFilteredAdverts(adverts);
      });
    } else {
      getFilterAdvert(filters).then((adverts) => setFilteredAdverts(adverts));
    }
  }, [filters]);

  const handleSearch = (search) => {
    setFilters(search);
  };

  return (
    <>
      <Layout title="Anuncios" {...props}>
        <div className="products-block">
          {adverts.length !== 0 ? (
            <div className="products">
              <FilterAdverts handleSearch={handleSearch} />
              {filteredAdverts.length !== 0 ? (
                filteredAdverts.map(({ id, ...advert }) => (
                  <div key={id}>
                    <Link to={`/adverts/${id}`}>
                      <Adverts {...advert} />
                    </Link>
                  </div>
                ))
              ) : (
                <NotFoundList />
              )}
            </div>
          ) : (
            <EmptyList />
          )}
        </div>
      </Layout>
    </>
  );
}

export default AdvertsPage;
