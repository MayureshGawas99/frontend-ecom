import React from "react";
import Layout from "../components/layout/Layout";

const About = () => {
  return (
    <Layout title={"About Us"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/about.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">ABOUT US</h1>
          <p className="text-justify mt-2">
            We are a trusted and user-friendly e-commerce website offering a
            wide range of high-quality products across different categories. Our
            focus is on providing excellent customer service, ensuring secure
            transactions, and delivering a seamless shopping experience. Shop
            with us for the latest trends, reliable products, and great deals.
            Thank you for choosing us as your preferred online shopping
            destination. Happy shopping!
          </p>
        </div>
      </div>
    </Layout>
  );
};

Layout.defaultProps = {
  title: "Ecommerce app",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Narayan Gawas",
};
export default About;
