import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Booking = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/bookings?email=${loggedInUser.email}`, {
            method: 'GET',
            headers: {
                'content-type' : 'application/json',
                authorization : `bearer ${sessionStorage.getItem('token')}`
            },

        })
        .then(res => res.json())
        .then(data => setBookings(data))
    }, []);


    return (
        <div>
            <h3>You have Booked {bookings.length} Room !</h3>
            {
                bookings.map(book => <div key={book._id}>
                    <h3>Your name : {book.name}</h3>
                    <h5>Your email : {book.email}</h5>
                    <p>Check in date : {(new Date(book.checkIn).toDateString('dd/mm/yyyy'))}</p>
                    <p>Check out date : {(new Date(book.checkOut).toDateString('dd/mm/yyyy'))}</p>
                </div>)
            }
        </div>
    );
};

export default Booking;