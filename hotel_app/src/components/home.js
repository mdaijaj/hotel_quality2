import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import '../App.css'
import images from '../images.jpeg'


const DatePickers = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [hotelList, setHotelList] = useState([])
    const [findhotel, setFindhotel] = useState([])
    const [destination, setDestination]= useState(null)

    const getAllHotel = async () => {
        console.log("dddd")
        const response = await axios.get('/allhotels');
        console.log("response", response)
        setHotelList(...hotelList, response)
        setFindhotel(response.data.data)
        // return response
    }

    const searchHotelInf= async()=>{
        console.log("aijaj", hotelList)
        setFindhotel(hotelList.data.data.filter(e=> e.city==destination))
    }

    useEffect(() => {
        getAllHotel()
    }, [])

    return (
        <>
            <div className="main" style={{ width: "90%", height: "200px", margin: "auto", borderRadius: "25px" }}>
                <form>
                    <div className="container">
                        <div className="row">
                            <div className="col-3">
                                <label /> Destination:
                                <input type="text" className="form-control" onChange={(e)=> setDestination(e.target.value) } placeholder="Enter City...." />
                            </div>

                            <div className="col-2">
                                <label htmlFor="exampleFormControlSelect1">Hotel Type:</label>
                                <select className="form-control" id="exampleFormControlSelect1">
                                    <option>Room Type</option>
                                    <option>Single Bedroom</option>
                                    <option>Double Bedroom</option>
                                    <option>Family Room</option>
                                    <option>Hall Room</option>

                                </select>
                            </div>

                            <div className="col-1">
                                <label htmlFor="exampleFormControlSelect1">Guest:</label>
                                <select className="form-control" id="exampleFormControlSelect1">
                                    <option>Guest</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                </select>
                            </div>

                            <div className="col-2">
                                <label>CheckOut</label>
                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                            </div>

                            <div className="col-2">
                                <label>CheckIn</label>
                                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                            </div>


                            <div className="col-2 pt-4">
                                <button type="button" onClick={searchHotelInf}>Search</button>
                            </div>
                        </div>
                    </div>
                </form>
        </div>
            <center><h1>Recenctly Hotel Search....</h1></center><br />
            <div className="row row-cols-2 row.d-flex row-cols-md-4 g-4">
                {console.log("findhotel", findhotel)}
                {
                    findhotel?.map((hotel => {
                        return (
                            <div className="col-10 d-flex justify-content-center">
                                <div className="card" style={{ width: "35rem", borderRadius: "20px" }}>
                                    <img className="card-img-top" src={images} alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">{hotel.hotel_name}</h5>
                                        <p className="card-text">{`hotelType: ${hotel.hotelType}`}</p>
                                        <p className="card-text">{`description: ${hotel.description}`}</p>
                                        <p className="card-text">{`numOfReviews: ${hotel.numOfReviews}`}</p>
                                        <p className="card-text">{`price: ${hotel.price}`}</p>
                                        <p className="card-text">{`rating: ${hotel.rating}`}</p>
                                        <a href="#" className="btn btn-primary">Hotel</a>
                                    </div>
                                </div>
                            </div>
                        )
                    }))
                }
            </div>
        </>
    );
};

export default DatePickers;