import React, { useRef } from "react";
import { connect,useDispatch } from "react-redux";

const EditComponent = (props) => {  
  const getName = useRef(null);
  const getEmail = useRef(null);
  const getPhone = useRef(null);
  const getAddress = useRef(null);
  const getStreetAddress = useRef(null);
  const getCity = useRef(null);
  const getState = useRef(null);
  const getPincode = useRef(null);
  const getCountry = useRef(null);
  const handleEdit = (e) => {
    e.preventDefault();
    console.log(initialValues.name)
    const name = getName.current.value 
    const email = getEmail.current.value 
    const address = getAddress.current.value 
    const streetAddress = getStreetAddress.current.value 
    const phone = getPhone.current.value 
    const city = getCity.current.value 
    const state = getState.current.value 
    const pinCode = getPincode.current.value 
    const country = getCountry.current.value 

    const data = {
      name,
      email,
      phone,
      address,
      streetAddress,
      city,
      country,
      state,
      pinCode,
      editing: false,
    };

    props.dispatch({ type: "UPDATE", id: props.post.id, data });
  };

  return (
    <div>
      <form onSubmit={handleEdit}>
        <input
          ref={getName}
          required
          type="text"
          // value={name}
          placeholder="Name"
        />
        <br />
        <br />
        <input
          ref={getEmail}
          required
          type="email"
          placeholder="Email"
        />
        <br />
        <br />
        <input
          ref={getPhone}
          required
          type="tel"
          placeholder="Phone"
        />
        <br />
        <br />
        <input
          ref={getAddress}
          required
          type="text"
          placeholder="Address"
        />
        <br />
        <br />
        <input
          ref={getStreetAddress}
          required
          type="text"
          placeholder="Street Address"
        />
        <br />
        <br />
        <input
          ref={getCity}
          required
          type="text"
          placeholder="City"
        />
        <br />
        <br />
        <input
          ref={getState}
          required
          type="text"
          placeholder="State"
        />
        <br />
        <br />
        <input
          ref={getPincode}
          required
          type="text"
          placeholder="Pincode"
        />
        <br />
        <br />
        <input
          ref={getCountry}
          required
          type="text"
          placeholder="Country"
        />
        <br />
        <br />
        <button>Update</button>
      </form>
    </div>
  );
};

export default connect()(EditComponent);
