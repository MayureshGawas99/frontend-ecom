import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Error in getting Categories", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    getAllCategories();
    getTotal();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data?.products);
    } catch (error) {
      setLoading(false);

      console.log(error);
      enqueueSnackbar("Error in getting Products", {
        variant: "error",
      });
    }
  };

  const getTotal = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setLoading(false);
      setTotal(data?.total);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);

      setProducts([...products, ...data.products]);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, []);
  // checked.length, radio.length
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Error in Filtering Products", {
        variant: "error",
      });
    }
  };

  return (
    <Layout title={"All Products - Best Offers"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-2 card">
            <div className="m-2 p-2 card">
              <h6 className="text-center">Filter By Price</h6>
              <div className="d-flex flex-column p-3">
                {Prices?.map((p) => (
                  <div className="form-check" key={p._id}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      onChange={(e) => {
                        setRadio(p.array);
                      }}
                      value={p.array}
                      style={{ outline: "1px solid black" }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      {p.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="m-2 p-2 card">
              <h6 className="text-center">Filter By Category</h6>
              <div className="d-flex flex-column p-3">
                {categories?.map((c) => (
                  <div className="form-check" key={c._id}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue
                      id="flexCheckDefault"
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                      style={{ outline: "1px solid black" }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      {c.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="d-flex flex-column p-3">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>
          <div className="col-md-10">
            <div className="card p-3">
              <h1 className="text-center">All Products</h1>
              <div className="d-flex flex-wrap justify-content-around">
                {!products.length && "No products to Show"}
                {products?.map((p) => (
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">
                        {p.description.substring(0, 30)}
                      </p>

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
              {!(checked.length || radio.length) && (
                <div className="m-2 p-3">
                  {products && products.length < total && (
                    <button
                      className="btn btn-warning"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(page + 1);
                      }}
                    >
                      {loading ? "Loading..." : "Loadmore"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
