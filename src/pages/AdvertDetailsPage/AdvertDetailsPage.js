import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAdvert } from "../../api/service";
import Layout from "../../layouts";
import AdvertDetails from "../../components/AdvertDetails";
// import { Button } from "semantic-ui-react";

import "./AdvertDetailsPage.scss";

function AdvertDetailsPage(...props) {
  const [data, setData] = useState(null);
  const { advertId } = useParams();

  useEffect(() => {
    getAdvert(advertId).then((details) => setData(details));
  }, [advertId]);

  return (
    <Layout title="Anuncio" {...props}>
      <div className="details">
        <AdvertDetails {...data} />
      </div>
    </Layout>
  );
}

export default AdvertDetailsPage;
