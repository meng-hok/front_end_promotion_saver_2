import {useState,useEffect} from "react";
import {CUSTOMER_URL} from "../utils/api-list";
import Popup from 'reactjs-popup';
import {get, post} from "../utils/requestor";

const Customers = () => {

    const [customers,setCustomer] = useState([])

    useEffect(() => {
        // fetch(CUSTOMER_URL.GET)
        //     .then(res => res.json())
        //     .then(json => {
        //
        //
        //
        //     } )
        get(CUSTOMER_URL.GET,(json) =>{
            if(json.status == false) {
                alert(`err occur`)
                console.log(json)
            }else{
                setCustomer(json['customers'])
                console.log(`im working fine`)
                console.log(customers)
            }
        })
    },[])

    const saveCustomer = (_closable) => {
        let requestCustomer = {}
        document.querySelector(`#register_customer_form`).querySelectorAll(`input`).forEach(item => {
               if(item.value!= "")
                    requestCustomer[item.id] = item.value;
        })

        setTimeout(() => {
            post(CUSTOMER_URL.POST,requestCustomer,(json) =>{
                if(json.status == false) {
                    alert(`err occur`)
                    console.log(json)
                }else{
                    setCustomer(state => {
                        return [...state ,json['customer']]
                    })
                    _closable()
                }
            })
            // fetch(CUSTOMER_URL.POST,
            //     {method : `POST`,
            //          body : JSON.stringify(requestCustomer),
            //          headers: {
            //              "Content-Type": "application/json"
            //          }
            //         })
            //     .then(res => res.json())
            //     .then(json => {
            //         if(json.status == false) {
            //             alert(`err occur`)
            //             console.log(json)
            //         }else{
            //             setCustomer(state => {
            //                 return [...state ,json['customer']]
            //             })
            //             _closable()
            //
            //         }
            //     } )
        },0)
    }

    return (

        <div className="container border m-5 p-5 ">
            <div className="d-flex justify-content-around">
                <h3>Customers </h3>
                <Popup modal trigger={<button className="btn btn-outline-primary" > Add Customer</button>} position="right center">

                    {(_close) =>
                         (
                                    <div className="container" id="register_customer_form">
                                    <div>Create Your Customer</div>
                                    <hr/>
                                    <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" aria-describedby="emailHelp" />
                                {/*<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>*/}
                                    </div>
                                    <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Phone Number</label>
                                    <input type="text" className="form-control" id="phone_number"/>
                                    </div>
                                    <div className="text-lg-right">
                                    <button className="btn btn-sm btn-success" onClick={()=> {saveCustomer(_close)}}>Save</button>
                                    </div>
                                {/*<div className="mb-3 form-check">*/}
                                {/*    <input type="checkbox" className="form-check-input" id="exampleCheck1" />*/}
                                {/*    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>*/}
                                {/*</div>*/}
                                    </div>
                                    )
                     }

                </Popup>
            </div>

            <hr/>

            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">PhoneNumber</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    customers?.map((customer,index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{++index}</th>
                                <td>{customer['username']}</td>
                                <td>{customer['phone_number']}</td>
                                <td>
                                    <a className="btn btn-sm btn-outline-primary">Edit</a>
                                </td>
                            </tr>
                        )
                    })
                }
                {/*<tr>*/}
                {/*    <th scope="row">2</th>*/}
                {/*    <td>Jacob</td>*/}
                {/*    <td>Thornton</td>*/}
                {/*    <td>@fat</td>*/}
                {/*</tr>*/}
                {/*<tr>*/}
                {/*    <th scope="row">3</th>*/}
                {/*    <td colSpan="2">Larry the Bird</td>*/}
                {/*    <td>@twitter</td>*/}
                {/*</tr>*/}
                </tbody>
            </table>
            {/*<div className="mb-3">*/}
            {/*    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>*/}
            {/*    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />*/}
            {/*        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>*/}
            {/*</div>*/}
            {/*<div className="mb-3">*/}
            {/*    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>*/}
            {/*    <input type="password" className="form-control" id="exampleInputPassword1"/>*/}
            {/*</div>*/}
            {/*<div className="mb-3 form-check">*/}
            {/*    <input type="checkbox" className="form-check-input" id="exampleCheck1" />*/}
            {/*        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>*/}
            {/*</div>*/}
        </div>
    )
}

export default Customers;