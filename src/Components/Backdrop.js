import React from 'react';
import './Backdrop.css';

const Backdrop = (props) => (
    props.show && <div className="Backdrop" onClick={props.backdropClicked} ></div>
)

export default Backdrop