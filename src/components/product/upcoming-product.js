import React from "react";

export default function UpcomingProduct(props){

    return(
        <>
            <div className="col-3 mb-3">
                <div className="card p-2">
                    <img src={props.product.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{props.product.name}</h5>
                        <p className="card-text text-truncate">{props.product.des}</p>
                    </div>
                </div>
            </div>
        </>
    )
}