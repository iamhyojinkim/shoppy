import { useState } from "react";
import { uploader } from "../api/uploader";
import { addNewProduct } from "../api/firebase";

export default function NewProduct() {
  const [product, setProduct] = useState([]);
  const [file, setFile] = useState();
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, files, value } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      uploader(file).then((url) => {
        addNewProduct(product, url);
      });
      setSuccess("SUCCESS!✅");
      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="w-full text-center">
        <h3 className="text-2xl font=bold my-4 text-gray-500">
          Upload New Items
        </h3>
        <p>{success}</p>
        {file && (
          <img className="w-32 mx-auto mb-2" src={URL.createObjectURL(file)} />
        )}
        <form className="flex flex-col px-12" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <input
              type="file"
              onChange={handleChange}
              accept="image/*"
              name="file"
              required
            />
            <input
              type="text"
              name="title"
              placeholder="title"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="price"
              placeholder="price"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="options"
              placeholder="options"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="description"
              placeholder="description"
              onChange={handleChange}
              required
            />
            <button className="text-brand font-semibold">upload</button>
          </div>
        </form>
      </section>
    </>
  );
}
