import React from "react";
import { useHistory } from "react-router-dom";

export default function Product(props){
    const history = useHistory();

    const goDetails = (pId) => {
        history.push(`/product-details/${pId}`);
    }

    return(
        <>
            <div className="col-3 mb-3">
                <div className="card p-2">
                    {
                        (props.product.isHighDemand === 'yes') ?
                        <span className="badge rounded-pill bg-danger position-absolute high">High Demand</span>
                        : null
                    }                    
                    <img src={props.product.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{props.product.name}</h5>
                        <p className="card-text text-truncate mb-0">{props.product.des}</p>
                        <p className="h5 mt-2">{props.product.price}</p>
                        <button className="btn btn-primary" onClick={() => goDetails(props.product.id)}>Details</button>
                    </div>
                </div>
            </div>
        </>
    )
}