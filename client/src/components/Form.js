import React from "react";

// This file exports the Input, TextArea, and FormBtn components

export function Form(props) {
  return (
    <div className="container">
      <div className="card">

        <h2 className="card-header">Book Search</h2>


        <div className="card-body">
          <form onSubmit={props.onClick}>


            <div className="form-group">
              <h6>Book</h6>
              <input type="text" className="form-control" value={props.value} onChange={props.onChange} placeholder="Harry Potter" required />
            </div>


            <button className="float-right" type="submit" >Search</button>


          </form>
        </div>

      </div>
    </div>
  );
}