
# User Data Form JavaScript Project
# react-redux-localstorage-crud
## Overview

This React project creates a user data form with various fields, including Name, Email, Phone, Address, Street Address, City, Country, Gender, and Hobbies. Users can edit and delete their information. The project integrates with a JSON API to fetch demo data, stores data in `localStorage and session storage(loaded api data)`, and optimizes data loading.Also used react-redux for smart state management.


## Features

- User input fields with validation.
- Integration with a JSON API to fetch demo data.
- Data storage in `localStorage` to retain user input.
- Edit option for each field.
- Delete option to remove user data.

## Implementation Steps

1. **Data Loading Logic:**

   - On the first page load, check if session data is stored. If not, make an API call to fetch demo data and store it in `sessionStorage`.

2. **Data Storage:**

   - Combine session data with local storage values named "datas" to create a complete dataset.
   - Store user data in `localStorage` after editing.

3. **Edit and Delete Functionality:**

   - Implement an edit option for each field, allowing users to update their information.
   - Implement a delete option to remove user data.

## Dependencies
## My Views

- **Project Complexity:** This project may appear deceptively simple but is, in fact, quite challenging due to various intricacies.

- **Objectives:**
  - Handle user input and save it to local storage.
  - Manage demo data retrieved from a JSON API.
  - Minimize unnecessary API calls.
  - Enhance user experience with a loader.

- **Form Fields:**
  - Name
  - Email (with validation)
  - Phone (with validation)
  - Address (including street, city, country dropdown)
  - Gender (radio buttons)
  - Hobbies (checkboxes storing multiple values in an array)

- **Implementation Steps:**
  1. Check for session data on initial page load.
  2. Make an API call and store data in session storage if absent.
  3. Implement logic to avoid redundant API calls when session data exists.
  4. Merge session and local storage data.
  5. Enable editing for all fields, including radio buttons.
  6. Add a delete option for individual data entries.

- **Project Challenge:** Despite its seemingly simple nature, this project poses challenges that require careful consideration.
 ### Redux - React-Redux
 ``` json{
 {
  "import": "datas from \"../samples\"",
  "postReducer": {
    "state": [],
    "action": {
      "type": "ADD_POST",
      "type": "DELETE_POST",
      "type": "EDIT_POST",
      "type": "UPDATE",
      "type": "LOAD_POSTS"
    }
  }
}
}
```
**Deleting Data Logic**

```javascript
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
    console.log(entry.id);
    console.log(sessionStorage.getItem(entry.id));
    sessionStorage.removeItem(entry.id);
  }
  deleteItemFromLocalStorage(entry.id);
}}
```
**Editing Data Logic**
```javascript
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

```
**Redux Logic**
   ```javascript
import datas from "../samples";
const postReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_POST":
      return state.concat([action.data]);
    case "DELETE_POST":
      return state.filter((post) => post.id !== action.id);
    case "EDIT_POST":
      return state.map((post) =>
        post.id === action.id ? { ...post, editing: !post.editing } : post
      );
      case "UPDATE":
        return state.map((post) => {
          if (post.id === action.id) {
            return {
              ...post,
              name: action.data.name,
              email: action.data.email,
              phone: action.data.phone,
              address: action.data.address,
              streetAddress: action.data.streetAddress,
              city: action.data.city,
              state: action.data.state,
              country: action.data.country,
              pinCode: action.data.pinCode,
              gender:action.data.gender,
              hobbies:action.data.hobbies,
              editing: !post.editing
            };
          } else return post;
        });
    case "LOAD_POSTS":
      return action.posts; 
    default:
      return state;
  }
};

export default postReducer;

```
**Data Fetching and saving**

```javascript
  useEffect(() => {
    const fetchData = async () => {
      const check = sessionStorage.getItem("posts");
      const parsedCheck = check ? JSON.parse(check) : [];
      if (parsedCheck.length === 0) {
        try {
          const response = await axios.get("https://my-json-server.typicode.com/shubham21155102/demo/datas");
          console.log(response.data);
          response.data.map((e) => {
            sessionStorage.setItem(e.id, JSON.stringify(e));
          })
          const check = sessionStorage.getItem("posts");
          const parsedCheck = check ? JSON.parse(check) : [];
          if (parsedCheck.length === 0)
            // sessionStorage.setItem("posts", JSON.stringify(response.data));
          console.log("d")
          else
            console.log("already data in it");

          const savedPosts = localStorage.getItem("posts");
          const parsedPosts = savedPosts ? JSON.parse(savedPosts) : [];

          for (let i = 0; i < 20; i++) {
            if (sessionStorage.getItem(i + 1)) {
              const data = JSON.parse(sessionStorage.getItem(i + 1));
              parsedPosts.push(data);
            }

          }
          // const temporary = JSON.parse(sessionStorage.getItem("posts"));
          // const combinedPosts = [...temporary, ...parsedPosts];

          props.dispatch({
            type: "LOAD_POSTS",
            posts: parsedPosts,
          });

          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      }
      else {
        setLoading(false);
        const savedPosts = localStorage.getItem("posts");
        const parsedPosts = savedPosts ? JSON.parse(savedPosts) : [];
        const temporary = JSON.parse(sessionStorage.getItem("posts"));
        for (let i = 0; i < 20; i++) {
          if (sessionStorage.getItem(i + 1)) {
            const data = JSON.parse(sessionStorage.getItem(i + 1));
            parsedPosts.push(data);
          }
        }
        // const combinedPosts = [...temporary, ...parsedPosts];

        props.dispatch({
          type: "LOAD_POSTS",
          posts: parsedPosts,
        });
      }
    };

    fetchData();
  }, []);
```
**Sample JSON**
```json{
[
    {
      "id": 1,
      "createdAt": "2023-09-21",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "phone": "123-456-7890",
      "address": "123 Main Street",
      "streetAddress": "Apt 4B",
      "city": "New York",
      "state": "NY",
      "pinCode": "10001",
      "country": "USA",
      "gender": "Male",
      "hobbies": ["Reading", "Hiking"]
    },
    {
      "id": 2,
      "createdAt": "2023-09-20",
      "name": "Jane Smith",
      "email": "janesmith@example.com",
      "phone": "987-654-3210",
      "address": "456 Elm Street",
      "streetAddress": "Suite 301",
      "city": "Los Angeles",
      "state": "CA",
      "pinCode": "90001",
      "country": "USA",
      "gender": "Female",
      "hobbies": ["Swimming", "Painting"]
    },
    {
      "id": 3,
      "createdAt": "2023-09-19",
      "name": "Bob Johnson",
      "email": "bob@example.com",
      "phone": "555-123-4567",
      "address": "789 Oak Avenue",
      "streetAddress": "Unit 10",
      "city": "Chicago",
      "state": "IL",
      "pinCode": "60601",
      "country": "USA",
      "gender": "Male",
      "hobbies": ["Cooking", "Photography"]
    },
    {
      "id": 4,
      "createdAt": "2023-09-18",
      "name": "Alice Davis",
      "email": "alice@example.com",
      "phone": "888-777-5555",
      "address": "321 Pine Street",
      "streetAddress": "Apt 2C",
      "city": "San Francisco",
      "state": "CA",
      "pinCode": "94101",
      "country": "USA",
      "gender": "Female",
      "hobbies": ["Running", "Chess"]
    },
    {
      "id": 5,
      "createdAt": "2023-09-17",
      "name": "Michael Wilson",
      "email": "michael@example.com",
      "phone": "777-888-9999",
      "address": "555 Elm Street",
      "streetAddress": "Suite 5",
      "city": "Miami",
      "state": "FL",
      "pinCode": "33101",
      "country": "USA",
      "gender": "Male",
      "hobbies": ["Painting", "Traveling"]
    },
    {
      "id": 6,
      "createdAt": "2023-09-16",
      "name": "Sarah Johnson",
      "email": "sarah@example.com",
      "phone": "444-555-6666",
      "address": "999 Oak Avenue",
      "streetAddress": "Unit 8",
      "city": "Austin",
      "state": "TX",
      "pinCode": "73301",
      "country": "USA",
      "gender": "Female",
      "hobbies": ["Reading", "Cycling"]
    },
    {
      "id": 7,
      "createdAt": "2023-09-15",
      "name": "David Lee",
      "email": "david@example.com",
      "phone": "666-777-8888",
      "address": "111 Pine Street",
      "streetAddress": "Apt 3D",
      "city": "Seattle",
      "state": "WA",
      "pinCode": "98101",
      "country": "USA",
      "gender": "Male",
      "hobbies": ["Hiking", "Gaming"]
    },
    {
      "id": 8,
      "createdAt": "2023-09-14",
      "name": "Maria Garcia",
      "email": "maria@example.com",
      "phone": "222-333-4444",
      "address": "222 Oak Avenue",
      "streetAddress": "Suite 12",
      "city": "Denver",
      "state": "CO",
      "pinCode": "80201",
      "country": "USA",
      "gender": "Female",
      "hobbies": ["Dancing", "Music"]
    },
    {
      "id": 9,
      "createdAt": "2023-09-13",
      "name": "Robert Brown",
      "email": "robert@example.com",
      "phone": "999-888-7777",
      "address": "777 Main Street",
      "streetAddress": "Apt 1A",
      "city": "Philadelphia",
      "state": "PA",
      "pinCode": "19101",
      "country": "USA",
      "gender": "Male",
      "hobbies": ["Soccer", "Cooking"]
    },
    {
      "id": 10,
      "createdAt": "2023-09-12",
      "name": "Jennifer White",
      "email": "jennifer@example.com",
      "phone": "111-222-3333",
      "address": "666 Elm Street",
      "streetAddress": "Suite 7",
      "city": "Boston",
      "state": "MA",
      "pinCode": "02201",
      "country": "USA",
      "gender": "Female",
      "hobbies": ["Swimming", "Reading"]
    },
    {
      "id": 11,
      "createdAt": "2023-09-11",
      "name": "William Green",
      "email": "william@example.com",
      "phone": "555-444-3333",
      "address": "888 Oak Avenue",
      "streetAddress": "Unit 15",
      "city": "Atlanta",
      "state": "GA",
      "pinCode": "30301",
      "country": "USA",
      "gender": "Male",
      "hobbies": ["Golf", "Painting"]
    },
    {
      "id": 12,
      "createdAt": "2023-09-10",
      "name": "Linda Wilson",
      "email": "linda@example.com",
      "phone": "777-666-5555",
      "address": "444 Main Street",
      "streetAddress": "Apt 2B",
      "city": "Phoenix",
      "state": "AZ",
      "pinCode": "85001",
      "country": "USA",
      "gender": "Female",
      "hobbies": ["Hiking", "Cooking"]
    },
    {
      "id": 13,
      "createdAt": "2023-09-09",
      "name": "James Anderson",
      "email": "james@example.com",
      "phone": "333-222-1111",
      "address": "555 Pine Street",
      "streetAddress": "Suite 6",
      "city": "Dallas",
      "state": "TX",
      "pinCode": "75201",
      "country": "USA",
      "gender": "Male",
      "hobbies": ["Reading", "Photography"]
    },
    {
      "id": 14,
      "createdAt": "2023-09-08",
      "name": "Susan Miller",
      "email": "susan@example.com",
      "phone": "111-222-3333",
      "address": "777 Elm Street",
      "streetAddress": "Suite 4",
      "city": "Houston",
      "state": "TX",
      "pinCode": "77001",
      "country": "USA",
      "gender": "Female",
      "hobbies": ["Swimming", "Traveling"]
    },
    {
      "id": 15,
      "createdAt": "2023-09-07",
      "name": "Richard Moore",
      "email": "richard@example.com",
      "phone": "444-555-6666",
      "address": "333 Oak Avenue",
      "streetAddress": "Unit 9",
      "city": "Miami",
      "state": "FL",
      "pinCode": "33101",
      "country": "USA",
      "gender": "Male",
      "hobbies": ["Running", "Chess"]
    },
    {
      "id": 16,
      "createdAt": "2023-09-06",
      "name": "Karen Davis",
      "email": "karen@example.com",
      "phone": "666-777-8888",
      "address": "222 Main Street",
      "streetAddress": "Apt 3D",
      "city": "Orlando",
      "state": "FL",
      "pinCode": "32801",
      "country": "USA",
      "gender": "Female",
      "hobbies": ["Cooking", "Gaming"]
    },
    {
      "id": 17,
      "createdAt": "2023-09-05",
      "name": "Daniel Johnson",
      "email": "daniel@example.com",
      "phone": "222-333-4444",
      "address": "111 Pine Street",
      "streetAddress": "Suite 11",
      "city": "Las Vegas",
      "state": "NV",
      "pinCode": "89101",
      "country": "USA",
      "gender": "Male",
      "hobbies": ["Dancing", "Music"]
    },
    {
      "id": 18,
      "createdAt": "2023-09-04",
      "name": "Patricia Smith",
      "email": "patricia@example.com",
      "phone": "999-888-7777",
      "address": "999 Oak Avenue",
      "streetAddress": "Unit 5",
      "city": "San Diego",
      "state": "CA",
      "pinCode": "92101",
      "country": "USA",
      "gender": "Female",
      "hobbies": ["Soccer", "Traveling"]
    },
    {
      "id": 19,
      "createdAt": "2023-09-03",
      "name": "Joseph Brown",
      "email": "joseph@example.com",
      "phone": "111-222-3333",
      "address": "666 Elm Street",
      "streetAddress": "Apt 7A",
      "city": "Portland",
      "state": "OR",
      "pinCode": "97201",
      "country": "USA",
      "gender": "Male",
      "hobbies": ["Swimming", "Cycling"]
    },
    {
      "id": 20,
      "createdAt": "2023-09-02",
      "name": "Laura White",
      "email": "laura@example.com",
      "phone": "555-444-3333",
      "address": "888 Pine Street",
      "streetAddress": "Suite 10",
      "city": "Denver",
      "state": "CO",
      "pinCode": "80201",
      "country": "USA",
      "gender": "Female",
      "hobbies": ["Reading", "Hiking"]
    }
  ];
}
```
#   F o r m - R e a c t - R e d u x  
 