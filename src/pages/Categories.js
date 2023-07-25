import React from "react";
import Layout from "../components/layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Allcategories.css";

const Categories = () => {
  const categories = useCategory();
  const navigate = useNavigate();
  return (
    <Layout title={"All Categories"}>
      <div className="container ">
        <div className="row cat-container">
          {categories.map((c) => (
            <div className="col-md-3 mt-5 mb-3 gx-3 gy-3 ">
              <button
                className="btn  category-card"
                onClick={() => navigate(`/category/${c.slug}`)}
              >
                {c.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
