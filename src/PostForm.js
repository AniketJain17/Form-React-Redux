import React, { useRef, useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
// import "./styles/main.module.css";
import "./styles/bootstrap.module.css"
import "./styles/hello.module.css"
const PostForm = (props) => {
  const [ml, setMl] = useState(false)
  const [genderi, setGender] = useState('Male');
  const [fm, setFm] = useState(false);
  const genderInput = () => {
    if (ml) {
      setGender("Male")
    }
    else if (fm) {
      getGender("Female")
    }
  }
  const dispatch = useDispatch()
  const [posts, setPosts] = useState([]);
  const getName = useRef(null);
  const getEmail = useRef(null);
  const getAddress = useRef(null);
  const getStreetAddress = useRef(null);
  const getPhone = useRef(null);
  const getCity = useRef(null);
  const getState = useRef(null);
  const getPincode = useRef(null);
  const getCountry = useRef(null);
  const getGender = useRef(null);
  const getHobbyReading = useRef(null);
  const getHobbySports = useRef(null);
  const getHobbyMusic = useRef(null);

  useEffect(() => {
    // Retrieve data from local storage and initialize the state
    const savedData = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(savedData);
  }, []);

  const handleReset = () => {
    getName.current.value = "";
    getEmail.current.value = "";
    getAddress.current.value = "";
    getStreetAddress.current.value = "";
    getPhone.current.value = "";
    getCity.current.value = "";
    getState.current.value = "";
    getPincode.current.value = "";
    getCountry.current.value = "";
    setGender("");
    getHobbyReading.current.checked = false;
    getHobbySports.current.checked = false;
    getHobbyMusic.current.checked = false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hobbies = [];
    if (getHobbyReading.current.checked) {
      hobbies.push("Reading");
    }
    if (getHobbySports.current.checked) {
      hobbies.push("Sports");
    }
    if (getHobbyMusic.current.checked) {
      hobbies.push("Music");
    }

    const name = getName.current.value;
    const email = getEmail.current.value;
    const address = getAddress.current.value;
    const streetAddress = getStreetAddress.current.value;
    const phone = getPhone.current.value;
    const city = getCity.current.value;
    const state = getState.current.value;
    const pinCode = getPincode.current.value;
    const country = getCountry.current.value;
    const gender = genderi;

    const data = {
      id: uuidv4(),
      createdAt: new Date().toDateString(),
      name,
      email,
      phone,
      address,
      streetAddress,
      city,
      country,
      state,
      pinCode,
      gender,
      hobbies,
      editing: false
    };
    console.log(data)
    setPosts((prevPosts) => [...prevPosts, data]);

    // Save the updated data to local storage
    localStorage.setItem("posts", JSON.stringify([...posts, data]));

    props.dispatch({
      type: "ADD_POST",
      data
    });

    handleReset();
  };

  return (
    <>
      <h1 style={{ color: "white" }} className="page-title">Form</h1>
      <section >
        <div
          className="container"
          style={{ backgroundColor: "white", maxWidth: "600px", border: "1px solid black", borderRadius: "20px", margin: "30px auto" }}
        >
          <form
            onSubmit={handleSubmit}
            id="employeeForm"
            className="needs-validation"
            style={{ textAlign: "left", margin: "25px" }}

          >
            <label style={{ textAlign: "left" }}>Name</label>
            <div className="form-group">

              <input
                ref={getName}
                required
                type="text"
                placeholder="Enter Name"
                className="form-control"
              />

            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                ref={getEmail}
                required
                type="email"
                placeholder="Enter Email"
                className="form-control"
              /></div>
            <div className="form-group">
              <label>Phone</label>
              <input
                ref={getPhone}
                required
                type="tel"
                placeholder="Enter Phone Number"
                className="form-control"
              /></div>
            <div className="form-group">
              <label>Address</label>
              <textarea
                ref={getAddress}
                style={{ width: "100%", marginBottom: "10px" }}
                required
                type="text"
                placeholder="Enter Address"
                className="form-control"
              /></div>
            <div className="form-group">
              <label>Street Address</label>
              <input
                ref={getStreetAddress}
                required
                type="text"
                placeholder="Enter Street Address"
                className="form-control"
              /></div>
            <div className="form-group">
              <label>City</label>
              <input
                ref={getCity}
                required
                type="text"
                placeholder="Enter City"
                className="form-control"
              /></div>
            <div className="form-group">
              <label>State</label>
              <input
                ref={getState}
                required
                type="text"
                placeholder="Enter State"
                className="form-control"
              /></div>
            <div className="form-group">
              <label>Pincode</label>
              <input
                ref={getPincode}
                required
                type="text"
                placeholder="Enter Pincode"
                className="form-control"
              /></div>
            <label>Country</label>


            <div className="form-group">
              <select ref={getCountry} required className="form-control" id="country">
                <option value="" >Select Country</option>
                <option value="India">India</option>
                <option value="USA">United States</option>
                <option value="SriLanka">Sri Lanka</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <fieldset className="form-group">
                <h6 className="form-legend">Gender</h6>
                <div className="form-check">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    id="male"
                    checked={genderi === "Male"}
                    onChange={() => setGender("Male")}
                    className="form-check-input"
                  />
                  <label htmlFor="male" className="form-check-label">
                    Male
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    id="female"
                    checked={genderi === "Female"}
                    onChange={() => setGender("Female")}
                    className="form-check-input"
                  />
                  <label htmlFor="female" className="form-check-label">
                    Female
                  </label>
                </div>
              </fieldset>

            </div>
            <div className="form-group">
              <fieldset className="form-group">
                <h6 className="form-legend">Hobbies</h6>
                <div className="form-check"><input type="checkbox" name="hobbies" value="swimming" id="swimming" ref={getHobbyReading}
                  className="form-check-input" /><label htmlFor="swimming"
                    className="form-check-label">Swimming</label></div>
                <div className="form-check"><input type="checkbox" name="hobbies" value="singing" id="singing" ref={getHobbySports}
                  className="form-check-input" /><label htmlFor="singing"
                    className="form-check-label">Singing</label></div>
                <div className="form-check"><input type="checkbox" name="hobbies" value="writing" id="writing" ref={getHobbyMusic}
                  className="form-check-input" /><label htmlFor="writing"
                    className="form-check-label">Writing</label></div>
              </fieldset>
            </div>



            <div className="form-group">
              <button onClick={handleReset} className="form-control btn btn-warning bg-primary text-white" >Reset</button>  </div>
            <div className="form-group">  <button type="submit" className="form-control btn btn-danger" >Submit</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default connect()(PostForm);