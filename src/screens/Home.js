// import React, {useState, useEffect} from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import Card from "../components/Card";
// import Carousel from "../components/Carousel";

// export default function Home() {

//   const [foodCat, setFoodCat] = useState([]);
//   const [foodItem, setFoodItem] = useState([]);

//   const loadData = async()=>{
//     let response = await fetch("http://localhost:5000/api/foodData", {
//       method: "POST",
//       headers:{
//         'Content-Type' : 'application/json'
//       }
//     });

//     response = await response.json();
//     setFoodItem(response[0]);
//     setFoodCat(response[1]);
// }

//          useEffect(()=>{
//          loadData()
//          }, [])

// return (
//     <div>
//       <div><Navbar /></div>
//       <div><Carousel/></div>
//       <div className='container'>
//         {

//           foodCat !== []
//           ? foodCat .map((data)=>{
//             return ( <div className="row mb-3">
//               <div key ={data._id} className="fs-3 m-3">
//                 {data.CategoryName}
//                 </div>
//                 <hr/>
//                 {foodItem !== []
//                 ?
//                  foodItem.filter((item)=> item.CategoryName === data.CategoryName)
//                  .map(filterItems=>{
//                   return(
//                     <div key ={filterItems._id} className="col-12 col-md-6 col-lg-3">
//                       <Card></Card>
//                     </div>
//                   )
//                  })
//                 ) : <div>No such data found</div>}
//                 </div>
//             )
//           })
//           :""

//         }

//         <Card/>

//       </div>
//       <div><Footer /> </div>
//     </div>
//   );
// }





import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";


export default function Home() {
  const [search, setSearch] =useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });



  response = await response.json();
      if (response && response.length > 1) {
        setFoodItem(response[0]);
        setFoodCat(response[1]);
      } else {
        throw new Error("Unexpected API response format");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        {" "}
        <Navbar />{" "}
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value= {search}
                  onChange = {(e)=>{setSearch(e.target.value)}}
                />
                {/* <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="d-block w-100 image-brightness"
                style={{ filter: "brightness(30%" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1530375930097-e957738bc0e6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="d-block w-100 image-brightness"
                style={{ filter: "brightness(30%" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1565686481571-cb25f1086668?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="d-block w-100 image-brightness"
                style={{ filter: "brightness(30%" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : foodCat.length > 0 ? (
          foodCat.map((data) => (
            <div key={data._id} className="row mb-3">
              <div className="fs-3 m-3">{data.CategoryName}</div>
              <hr />
              {foodItem.length > 0 ? (
                foodItem
                  .filter((item) => (item.CategoryName === data.CategoryName)&& (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                  .map((filterItem) => (
                    <div
                      key={filterItem._id}
                      className="col-12 col-md-6 col-lg-3"
                    >
                      <Card foodItem= {filterItem} 
                        options={filterItem.options[0]}
                      >
                      </Card>
                    </div>
                  ))
              ) : (
                <div>No such data found</div>
              )}
            </div>
          ))
        ) : (
          <p>No categories found</p>
        )}
      </div>
      <Footer />
    </div>
  );
}










