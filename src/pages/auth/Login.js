import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res && res.data.success) {
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
        setTimeout(() => {
          enqueueSnackbar(res.data.message, { variant: "success" });
        }, 500);
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
      } else {
        enqueueSnackbar(res.data.message, { variant: "error" });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };
  return (
    <Layout title={"Login- Ecom"}>
      <div className="container">
        <MDBContainer fluid className="p-3 my-5">
          <MDBRow className="justify-content-center align-items-center">
            <MDBCol col="10" md="6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
            </MDBCol>
            <MDBCol col="4" md="4">
              <form onSubmit={handleSubmit}>
                <MDBInput
                  wrapperclassName="mb-5"
                  placeholder="Email "
                  id="email"
                  type="email"
                  size="lg"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ marginBottom: "10px" }}
                />
                <MDBInput
                  wrapperclassName="mb-4"
                  placeholder="Password"
                  id="password"
                  type="password"
                  size="lg"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ marginBottom: "10px" }}
                />

                <div className=" mb-4">
                  <Link to="/forgot-password">Forgot password?</Link>
                </div>

                <MDBBtn className="mb-4 w-100" size="lg" type="submit">
                  Login
                </MDBBtn>
              </form>

              <div className="divider d-flex justify-content-center align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">OR</p>
              </div>

              <MDBBtn
                className="mb-4 w-100"
                size="lg"
                style={{ backgroundColor: "#3b5998" }}
                onClick={() => navigate("/register")}
              >
                Register
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </Layout>
  );
};

export default Login;
