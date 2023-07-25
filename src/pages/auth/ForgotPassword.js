import Layout from "../../components/layout/Layout";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email, newpassword, answer }
      );
      if (res && res.data.success) {
        navigate("/login");
        setTimeout(() => {
          enqueueSnackbar(res.data.message, { variant: "success" });
        }, 500);
      } else {
        enqueueSnackbar(res.data.message, { variant: "error" });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };
  return (
    <Layout title={"Forgot Password- Ecom App"}>
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
                  placeholder="New Password"
                  id="newpassword"
                  type="password"
                  size="lg"
                  value={newpassword}
                  required
                  onChange={(e) => setNewpassword(e.target.value)}
                  style={{ marginBottom: "10px" }}
                />
                <MDBInput
                  wrapperclassName="mb-4"
                  placeholder="Who is Your Best Friend?"
                  id="newpassword"
                  type="password"
                  size="lg"
                  value={answer}
                  required
                  onChange={(e) => setAnswer(e.target.value)}
                  style={{ marginBottom: "10px" }}
                />

                <MDBBtn className="mb-4 w-100" size="lg" type="submit">
                  Reset Password
                </MDBBtn>
              </form>

              <div className="divider d-flex justify-content-center align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">OR</p>
              </div>

              <MDBBtn
                className="mb-4 w-100"
                size="lg"
                style={{ backgroundColor: "#3b5998" }}
                onClick={() => navigate("/login")}
              >
                Login
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
