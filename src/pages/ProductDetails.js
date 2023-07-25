import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import { enqueueSnackbar } from "notistack";

const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    console.log("useeffect");
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      // console.log(data);
      getSimilarProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid p-3">
        <div className="row ">
          {Object.keys(product).length && (
            <>
              <div className="col-md-4">
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product?._id}`}
                  className="card-img-top"
                  alt={product?.name}
                  height={"300px"}
                  width={"300px"}
                />
              </div>
              <div className="col-md-8">
                <h1 className="text-center">Product Details</h1>
                <h6>Name: {product?.name}</h6>
                <h6>Description: {product?.description}</h6>
                <h6>Price: {product?.price}₹</h6>
                <h6>Quantity: {product?.quantity}</h6>
                <h6>Category: {product?.category?.name}</h6>
                <button
                  className="btn btn-secondary ms-2"
                  onClick={() => {
                    setCart([...cart, product]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, product])
                    );
                    enqueueSnackbar("Item Added to Cart", {
                      variant: "success",
                    });
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </>
          )}
        </div>
        <hr />
        <div className="row ">
          <h4>Similar Products</h4>
          <div className="d-flex flex-wrap justify-content-around">
            {relatedProducts.length < 1 && <h4>No similar Products Found</h4>}
            {relatedProducts.map((p) => (
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
                    href="#"
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

export default ProductDetails;
