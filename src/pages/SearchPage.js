import React from "react";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/search";
import { enqueueSnackbar } from "notistack";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [cart, setCart] = useCart();
  const { values, setValues } = useSearch();
  const navigate = useNavigate();
  return (
    <Layout title={"Search Results"}>
      <div className="container mt-2">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap justify-content-around">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>

                  <p className="card-text">Price: {p.price}₹</p>
                  <button
                    className="btn btn-primary ms-2"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-secondary ms-2"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      enqueueSnackbar("Item Added to Cart", {
                        variant: "success",
                      });
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              // </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
