import { useState } from "react";
import { Redirect, useHistory } from "react-router";
import { Button, Input, Select } from "semantic-ui-react";
import Layout from "../../layouts";
import { createAdvert } from "../../api/service";

import "./NewAdvertPage.scss";

const saleOptions = [
  { key: "true", value: true, text: "En venta" },
  { key: "false", value: false, text: "Se compra" },
];

const tagsOptions = [
  { key: "lifestyle", value: "lifestyle ", text: "lifestyle" },
  { key: "mobile", value: "mobile ", text: "mobile" },
  { key: "motor", value: "motor ", text: "motor" },
  { key: "work", value: "work ", text: "work" },
];

function NewAdvertPage() {
  const history = useHistory();
  const [createdAdvertId, setCreatedAdvertId] = useState("");
  const [fail, setFail] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    sale: "",
    price: 0,
    tags: [],
    photo: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handlePhoto = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("sale", formData.sale);
    form.append("price", formData.price);
    form.append("tags", formData.tags);
    if (formData.photo !== "") {
      form.append("photo", formData.photo);
    }
    try {
      const newAdvert = await createAdvert(form);
      setCreatedAdvertId(newAdvert.id);
    } catch (error) {
      if (error.status === 401) {
        return history.push("/auth");
      }
      setFail(error);
      console.log(fail);
    }
  };

  if (createdAdvertId) {
    return <Redirect to={`/adverts/${createdAdvertId}`} />;
  }

  return (
    <Layout title="Crea tu anuncio ahora">
      <form onSubmit={handleSubmit}>
        <div>
          <div className="left">
            <Input
              type="text"
              name="name"
              placeholder="Título del anuncio"
              onChange={handleChange}
            />
          </div>
          <div className="right">
            <Input
              name="price"
              placeholder="Precio"
              type="number"
              onChange={handleChange}
              maxLength={6}
            ></Input>
            <Select
              name="sale"
              placeholder="¿Quieres vender o comprar?"
              onChange={(e, { value }) =>
                setFormData({
                  ...formData,
                  [Object.keys(formData)[1]]: value,
                })
              }
              options={saleOptions}
            />
            <Select
              multiple
              name="tags"
              placeholder="Categoría/as"
              onChange={(e, { value }) =>
                setFormData({
                  ...formData,
                  [Object.keys(formData)[3]]: value,
                })
              }
              options={tagsOptions}
            />
            <input name="photo" type="file" onChange={handlePhoto} />
            <div>
              <Button
                type="submit"
                variant="primary"
                disabled={
                  !formData.name ||
                  !formData.price ||
                  formData.sale === "" ||
                  formData.tags.length < 1
                }
              >
                Crear anuncio
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
}

export default NewAdvertPage;
