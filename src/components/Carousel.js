import React from 'react';

export default function Carousel() {
  return (
    <div>
      <style jsx>{`
        .carousel-inner img {
          max-height: 500px;
          object-fit: cover;
          width: 100%;
        }
      `}</style>

      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
        <div className="carousel-inner" id='carousel'>
        <div className="carousel-caption" style={{zIndex:"10"}}>
        <form className="d-flex">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
    </form>
        </div>
          <div className="carousel-item active">
            <img src="https://media.istockphoto.com/id/1459132270/photo/healthy-food-for-a-well-balanced-diet.jpg?s=2048x2048&w=is&k=20&c=709XDg4HyytbfYwjkHt8m6qQy4_n6gbjy1jUob323FM=" className="d-block w-100 image-brightness" style={{filter:"brightness(30%"}} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100 image-brightness" style={{filter:"brightness(30%"}} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100 image-brightness" style={{filter:"brightness(30%"}} alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  )
}