import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
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

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone, address, answer }
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
    <Layout title={"Register- Ecom"}>
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
                  wrapperclassName="mb-3"
                  placeholder="Name"
                  id="name"
                  type="text"
                  size="lg"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                  style={{ marginBottom: "10px" }}
                />
                <MDBInput
                  wrapperclassName="mb-2"
                  placeholder="Email address"
                  id="email"
                  type="email"
                  size="lg"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ marginBottom: "10px" }}
                />
                <MDBInput
                  wrapperclassName="mb-2"
                  placeholder="Password"
                  id="password"
                  type="password"
                  size="lg"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ marginBottom: "10px" }}
                />
                <MDBInput
                  wrapperclassName="mb-2"
                  placeholder="Phone No"
                  id="phone"
                  type="text"
                  size="lg"
                  value={phone}
                  required
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ marginBottom: "10px" }}
                />
                <MDBInput
                  wrapperclassName="mb-2"
                  placeholder="Address"
                  id="address"
                  type="text"
                  size="lg"
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ marginBottom: "10px" }}
                />
                <MDBInput
                  wrapperclassName="mb-2"
                  placeholder="Who is Your Best Friend?"
                  id="answer"
                  type="text"
                  size="lg"
                  value={answer}
                  required
                  onChange={(e) => setAnswer(e.target.value)}
                  style={{ marginBottom: "10px" }}
                />

                <MDBBtn className="mb-4 w-100" size="lg" type="submit">
                  Register
                </MDBBtn>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </Layout>
  );
};

export default Register;
