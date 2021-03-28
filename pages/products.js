import {useState,useEffect} from "react";
import {PRODUCT_URL} from "../utils/api-list";
import Popup from 'reactjs-popup';
import {get, post} from "../utils/requestor";

const Products = ( )=> {

    const [products,setProduct] = useState([])

    useEffect(() => {
        // fetch(CUSTOMER_URL.GET)
        //     .then(res => res.json())
        //     .then(json => {
        //
        //
        //
        //     } )
        get(PRODUCT_URL.GET,(json) =>{
            if(json.status == false) {
                alert(`err occur`)
                console.log(json)
            }else{
                setProduct(json['products'])
                console.log(`im working fine`)
                console.log(products)
            }
        })
    },[])

    const saveProduct = (_closable) => {
        let requestCustomer = {}
        document.querySelector(`#register_product_form`).querySelectorAll(`input`).forEach(item => {
            if(item.value!= "")
                requestCustomer[item.id] = item.value;
        })

        setTimeout(() => {
            post(PRODUCT_URL.POST,requestCustomer,(json) =>{
                if(json.status == false) {
                    alert(`err occur`)
                    console.log(json)
                }else{
                    setProduct(state => {
                        return [...state ,json['product']]
                    })
                    _closable()
                }
            })

        },0)
    }

    return (

        <div className="container border m-5 p-5 ">
            <div className="d-flex justify-content-around">
                <h3>Products </h3>
                <Popup modal trigger={<button className="btn btn-outline-primary" > Add Product</button>} position="right center">

                    {(_close) =>
                        (
                            <div className="container" id="register_product_form">
                                <div>Create Your Product</div>
                                <hr/>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" />
                                    {/*<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>*/}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Price</label>
                                    <input type="number" className="form-control" id="price"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Point</label>
                                    <input type="number" className="form-control" id="point" aria-describedby="emailHelp" />
                                    {/*<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>*/}
                                </div>
                                <div className="text-lg-right">
                                    <button className="btn btn-sm btn-success" onClick={()=> {saveProduct(_close)}}>Save</button>
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
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Point</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    products?.map((product,index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{++index}</th>
                                <td>{product['name']}</td>
                                <td>{product['price']}</td>
                                <td>{product['point']}</td>
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

export default Products;