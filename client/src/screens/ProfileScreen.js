import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import axios from "axios";
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2';
import { Divider, Space, Tag } from 'antd';

const { TabPane } = Tabs;

const ProfileScreen = () => {

    const user = JSON.parse(localStorage.getItem("currentUser"))

    const fetchData = async () => {

        if (!user) {
            window.location.href = '/login'
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        
        <div className='ml-3 mt-3'>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Profile" key="1">
                    <div style={{fontFamily : "'Montserrat', sans-serif"}}>
                        <h1>My Profile</h1>
                        <br />

                        <h1>Name : {user.name}</h1>
                        <h1>Email : {user.email}</h1>
                        <h1>isAdmin : {user.isAdmin ? 'YES' : 'NO'}</h1>
                    </div>
                </TabPane>
                <TabPane tab="Bookings" key="2">
                    <MyBookings />
                </TabPane>
            </Tabs>
        </div>
        
    );
}

export default ProfileScreen;

export function MyBookings() {

    const user = JSON.parse(localStorage.getItem("currentUser"));

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();

    const[bookings,setbookings] = useState([]);

    const fetchData = async () => {

        try {
            setloading(true)
            const data = (await axios.post('api/bookings/getbookingsbyuserid', { userid: user._id })).data
            console.log(data);
            setbookings(data)
            setloading(false)
        } catch (error) {
            console.log(error)
            setloading(false)
            seterror(error)

        }

    }

    useEffect(() => {
        fetchData();
    }, []);

    async function cancelBooking(bookingid,roomid){

        try {
            setloading(true)
            const result = (await axios.post("/api/bookings/cancelbooking" , {bookingid,roomid})).data
            console.log(result)
            setloading(false)
            Swal.fire('','Your booking has been cancelled','success').then(result => {
                window.location.reload()
            })
        } catch (error) {
            console.log(error)
            setloading(false)
            seterror(error)
            Swal.fire('','Something went wrong','error')
        }
    }

    return (
        <div style={{fontFamily : "'Montserrat', sans-serif"}}>
            <div className='row'>
                <div className='col-md-6'>
                    {loading && (<Loader />)}
                    {bookings && (bookings.map(booking=>{
                        return <div className='bs'>
                            <h1>{booking.room}</h1>
                            <p><b>Booked Id</b> : {booking._id}</p>
                            <p><b>Check In</b> : {booking.fromdate}</p>
                            <p><b>Check Out</b> : {booking.todate}</p>
                            <p><b>Amount</b> : {booking.totalamount}</p>
                            <p><b>Status</b> : {booking.status == 'booked' ? <Tag color="green">CONFIRMED</Tag> : <Tag color="red">CANCELLED</Tag>}</p>

                            {booking.status !== 'cancelled' && (
                                <div className='text-right'>
                                <button className='btn btn-primary' onClick={() => cancelBooking(booking._id, booking.roomid)}>CANCEL BOOKING</button>
                                </div>
                            )}
                        </div>
                    }))}
                </div>
            </div>
        </div>
    )
}

