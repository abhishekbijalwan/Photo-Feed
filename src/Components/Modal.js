import React from 'react'
import './Modal.css'

const modal = props => {
    
    return (
        <div className="Modal" style={{
            transform: props.show ? 'translate(-50%, -50%)' : 'translateY(-100vh)',
            display: !props.show && 'none'
        }}>
            <div className="modal-content">
                <img src={props.src} alt="img01" />
                <span className="close" onClick={props.close}>&times;</span>
                <span className="left" onClick={props.previous}>&lt;</span>
                <span className="right" onClick={props.next}>&gt;</span>
            </div>
        </div>
    )
}
export default modal