import React, { useRef, useState, useEffect } from 'react';
import { connect, useDispatch } from "react-redux";
import datas from './samples';
const properElements = (props) => {
    const entry = props.post;
    const [ml, setMl] = useState(false)
    const [gender, setGender] = useState(entry.gender);
    const [fm, setFm] = useState(false);
    const [selectedHobbies, setSelectedHobbies] = useState([]);
    function deleteItemFromLocalStorage(key) {
        localStorage.removeItem(key);
    }
    useEffect(() => {

        if (ml) {
            setGender("Male");
        } else if (fm) {
            setGender("Female");
        }
    }, [ml, fm]);

    const [editing, setEditing] = useState(false);
    const dispatch = useDispatch()
    const getName = useRef(entry.name);
    const getEmail = useRef(entry.email);
    const getPhone = useRef(entry.phone);
    const getAddress = useRef(entry.address);
    const getStreetAddress = useRef(entry.streetAddress);
    const getCity = useRef(entry.city);
    const getState = useRef(entry.state);
    const getPincode = useRef(entry.pinCode);
    const getCountry = useRef(entry.country);
    const getGender = useRef(entry.gender);
    const getHobbies = useRef(entry.getHobbies);
    const getHobbyReading = useRef(null);
    const getHobbySports = useRef(null);
    const getHobbyMusic = useRef(null);

    const handleEditClick = () => {
        setEditing(true);
        setMl(entry.gender === "Male");
        setFm(entry.gender === "Female");

    };
    const handleUpdateClick = () => {


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

        console.log(hobbies)
        const postIdToUpdate = entry.id;
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        console.log(posts)
        const updatedData = {
            name: getName.current.value,
            email: getEmail.current.value,
            phone: getPhone.current.value,
            address: getAddress.current.value,
            streetAddress: getStreetAddress.current.value,
            city: getCity.current.value,
            state: getState.current.value,
            pinCode: getPincode.current.value,
            country: getCountry.current.value,
            gender: gender,
            hobbies: hobbies,
        };
        const indexToUpdate = posts.findIndex((post) => post.id === postIdToUpdate);
        console.log(updatedData)
        console.log(indexToUpdate)
        console.log(postIdToUpdate)
        if (entry.id > 0 && entry.id <= 20) {
            console.log(entry);

            entry.name = getName.current.value;
            entry.email = getEmail.current.value;
            entry.phone = getPhone.current.value;
            entry.address = getAddress.current.value;
            entry.streetAddress = getStreetAddress.current.value;
            entry.city = getCity.current.value;
            entry.state = getState.current.value;
            entry.pinCode = getPincode.current.value;
            entry.country = getCountry.current.value;
            entry.gender = gender;
            entry.hobbies = hobbies;


            sessionStorage.setItem(entry.id, JSON.stringify(entry));

            console.log(entry);
            console.log('Data updated and saved in session storage.');
        }
        if (indexToUpdate !== -1) {

            posts[indexToUpdate] = {
                ...posts[indexToUpdate],
                name: getName.current.value,
                email: getEmail.current.value,
                phone: getPhone.current.value,
                address: getAddress.current.value,
                streetAddress: getStreetAddress.current.value,
                city: getCity.current.value,
                state: getState.current.value,
                pinCode: getPincode.current.value,
                country: getCountry.current.value,
                gender: gender,
                hobbies: hobbies

            };
            console.log(posts[indexToUpdate])
            localStorage.setItem('posts', JSON.stringify(posts));



            props.dispatch({ type: 'UPDATE', id: entry.id, data: updatedData });

        }

        setEditing(false);
    };


    return (
        <>
            <tr key={props.key} style={{ backgroundColor: "white" }} >
                <td>{entry.id}</td>
                <td>{entry.createdAt}</td>
                <td>
                    {editing ? (<input
                        ref={getName}
                        type="name"
                        placeholder={entry.name}
                        defaultValue={entry.name}
                    />
                    ) : (
                        entry.name
                    )}
                </td>
                <td>
                    {editing ? (
                        <input
                            ref={getEmail}
                            type="email"
                            defaultValue={entry.email}
                        />
                    ) : (
                        entry.email
                    )}
                </td>
                <td>
                    {editing ? (
                        <input
                            ref={getPhone}
                            type="text"
                            defaultValue={entry.phone}
                        />
                    ) : (
                        entry.phone
                    )}
                </td>
                <td>
                    {editing ? (
                        <input
                            ref={getAddress}
                            type="text"
                            defaultValue={entry.address}
                        />
                    ) : (
                        entry.address
                    )}
                </td>
                <td>
                    {editing ? (
                        <input
                            ref={getStreetAddress}
                            type="text"
                            defaultValue={entry.streetAddress}
                        />
                    ) : (
                        entry.streetAddress
                    )}
                </td>
                <td>
                    {editing ? (
                        <input
                            ref={getCity}
                            type="text"
                            defaultValue={entry.city}
                        />
                    ) : (
                        entry.city
                    )}
                </td>
                <td>
                    {editing ? (
                        <input
                            ref={getState}
                            type="text"
                            defaultValue={entry.state}
                        />
                    ) : (
                        entry.state
                    )}
                </td>
                <td>
                    {editing ? (
                        <input
                            ref={getPincode}
                            type="text"
                            defaultValue={entry.pinCode}
                        />
                    ) : (
                        entry.pinCode
                    )}
                </td>
                <td>
                    {editing ? (
                        <select
                            ref={getCountry}
                            defaultValue={entry.country}

                        >
                            <option value="India">India</option>
                            <option value="USA">United States</option>
                            <option value="SriLanka">Sri Lanka</option>
                            <option value="other">Other</option>
                        </select>
                    ) : (
                        entry.country
                    )}
                </td>
                <td>
                    {
                        editing ? (<>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    id="male"
                                    checked={ml}
                                    onChange={() => {
                                        setMl(true);
                                        setFm(false);
                                        setGender("Male");
                                    }}
                                    className="form-check-input"
                                />
                                <label for="male" className="form-check-label">Male</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    id="female"
                                    checked={fm}
                                    onChange={() => {
                                        setFm(true);
                                        setMl(false);
                                        setGender("Female");
                                    }}
                                    className="form-check-input"
                                />
                                <label for="female" className="form-check-label">Female</label>
                            </div>
                        </>) : (
                            entry.gender
                        )}
                </td>

                <td>
                    {editing ? (
                        <>
                            <fieldset className="form-group">
                                <div className="form-check"><input type="checkbox" name="hobbies" value="swimming" id="swimming" ref={getHobbyReading}
                                    className="form-check-input" /><label for="swimming"
                                        className="form-check-label">Reading</label></div>
                                <div className="form-check"><input type="checkbox" name="hobbies" value="singing" id="singing" ref={getHobbySports}
                                    className="form-check-input" /><label for="singing"
                                        className="form-check-label">Sports</label></div>
                                <div className="form-check"><input type="checkbox" name="hobbies" value="writing" id="writing" ref={getHobbyMusic}
                                    className="form-check-input" /><label for="writing"
                                        className="form-check-label">Music</label></div>
                            </fieldset>
                        </>
                    ) : (
                        <>
                            {Array.isArray(entry.hobbies) ? (

                                entry.hobbies.join(', ')
                            ) : (

                                'Hobbies data is not an array'
                            )}
                        </>



                    )}
                </td>


                <td
                    key={entry.id}
                    style={{ display: "flex", gap: "1px" }}
                >
                    {editing ? (
                        <>
                            <button
                                style={{ borderRadius: '10px', backgroundColor: '#007bff' }}
                                onClick={handleUpdateClick}


                            >
                                Update
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                style={{ borderRadius: '10px', backgroundColor: 'green' }}
                                onClick={handleEditClick}
                            >
                                Edit
                            </button>
                            <button
                                style={{ borderRadius: '10px', backgroundColor: 'red' }}
                                onClick={() => {
                                    dispatch({
                                        type: 'DELETE_POST',
                                        id: entry.id,
                                    });
                                    const posts = JSON.parse(localStorage.getItem('posts')) || [];
                                    const newPosts = posts.filter((post) => post.id !== entry.id);
                                    const updatedPosts = posts.filter((post) => post.id !== entry.id);
                                    localStorage.setItem('posts', JSON.stringify(updatedPosts));

                                    if (entry.id > 0 && entry.id <= 20) {
                                        console.log(entry.id)
                                        console.log(sessionStorage.getItem(entry.id))
                                        sessionStorage.removeItem(entry.id);
                                    }
                                    deleteItemFromLocalStorage(entry.id);
                                }


                                }
                            >
                                Delete
                            </button>
                        </>
                    )}

                </td>
            </tr>
        </>
    )
}

export default connect()(properElements);