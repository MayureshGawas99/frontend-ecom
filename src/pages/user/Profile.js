import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/auth";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";

const Profile = () => {
  const { auth, setAuth } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, password, phone, address }
      );
      if (data?.error) {
        enqueueSnackbar(data?.error, { variant: "error" });
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        enqueueSnackbar("Profile Updated Succefully", { variant: "success" });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);
  return (
    <Layout title={"Profile - Dashboard"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card p-3">
              <form onSubmit={handleSubmit}>
                <MDBInput
                  wrapperclassName="mb-3"
                  placeholder="Name"
                  id="name"
                  type="text"
                  size="lg"
                  value={name}
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
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ marginBottom: "10px" }}
                  disabled
                />
                <MDBInput
                  wrapperclassName="mb-2"
                  placeholder="Change Password"
                  id="password"
                  type="password"
                  size="lg"
                  value={password}
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
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ marginBottom: "10px" }}
                />

                <MDBBtn className="mb-4 w-100" size="lg" type="submit">
                  Update
                </MDBBtn>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
