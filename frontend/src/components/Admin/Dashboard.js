import React, { useEffect } from 'react';
import Sidebar from './Sidebar.js';
import './Dashboard.css';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {Doughnut,Line} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from 'chart.js';
import { clearError, getAdminProduct } from '../../actions/productAction.js';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { getAllOrders } from '../../actions/orderAction.js';
import { getAllUsers } from '../../actions/userAction.js';



 
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement, 
    Tooltip, 
    Legend 
);




const Dashboard = () => {
    const {error,products} = useSelector((state)=>state.products);
    const {orders} = useSelector((state)=>state.allOrders);
    const {users} = useSelector((state)=>state.allUsers);
    


    const dispatch = useDispatch();
    const alert = useAlert();
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearError());
        }
        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    },[dispatch,error,alert])
   let outofStock = 0;

   products && products.forEach((item)=>{
    if(item.stock === 0){
        outofStock +=1
    }
   })

    const lineState = {
        labels:["Initial Amount", "Earned Amount"],
        datasets:[
            {
                label:"TOTAL AMOUNT",
                backgroundColor:["tomato"],
                hoverBackgroundColor:["rgb(197,72,49)"],
                data:[0,4000],
            },
        ],
    };
    const doughuntState = {
        labels:["Out of stock","InStock"],
        datasets:[
            {
                backgroundColor:["#00A684","#6800B4"],
                hoverBackgroundColor:["#485000","#35014F"],
                data:[outofStock,(products.length - outofStock)],
            },
        ],
    }
  return (
    <div className='dashboard' >
        <Sidebar/>
        <div className='dashboardContainer'>
            <Typography component="h1">Dashboard</Typography>
            <div className='dashboardSummary'>
                <div>
                    <p>
                        Total Amount <br/> $200
                    </p>
                </div>
                <div className='dashboardSummaryBox2'>
                    <Link to='/admin/products'>
                        <p>Product</p>
                        <p>{products && products.length}</p>
                    </Link>
                    <Link to='/admin/orders'>
                        <p>Orders</p>
                        <p>{orders && orders.length}</p>
                    </Link>
                    <Link to='/admin/users'>
                        <p>Users</p>
                        <p>{users && users.length}</p>
                    </Link>
                </div>
            </div>
            <div className='lineChart'>
                <Line  data={lineState}  />
            </div>
            <div className='doughnutChart'>
                <Doughnut data={doughuntState} />
            </div>
        </div>
    </div>
  )
}

export default Dashboard