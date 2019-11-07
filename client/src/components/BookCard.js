import React from "react";

function BookCard(props) {
    return (

        <div className="card">
            <div className="row">


                <div className="col-md-4">
                    <img src={props.thumbnail} className="card-img" alt={props.title} style={{ width: "150px" }} />
                </div>


                <div className="col-md-8">

                    <div className="card-body">
                        <h5 className="card-title">{props.title}</h5>
                        <p className="card-text">Author: {props.author}</p>
                        <p className="card-text">Summary: {props.description}</p>
                    </div>

                    <a href={props.href} rel="noopener noreferrer" target="_blank" className="btn">View</a>

                    {window.location.pathname === "/" ?

                        <span data-index={props.index} className="save btn btn-success" onClick={props.save}>Save Article</span>
                        :
                        <span data-index={props.index} className="delete btn btn-dnager" onClick={props.delete}>Remove from Save</span>
                    }
                </div>


            </div>
        </div>
    );
};


export default BookCard;
