import React from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root');

function MyModal({ isOpen, onClose, children, label }) {

    if (!isOpen) {
        return null;
    }

    return (
        <Modal
            className="modal"
            isOpen={isOpen}
            onRequestClose={onClose}
            style={{
                overlay: {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: "9999",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
                content: {
                    position: "absolute",
                    top: "0",
                    left: "0",
                    right: "0",
                    bottom: "0",
                    border: "0",
                    background: "transparent",
                    overflow: "auto",
                    WebkitOverflowScrolling: "touch",
                    borderRadius: "0",
                    outline: "none",
                    padding: "0",
                    maxWidth: '650px',
                    width: "100%",
                    height: "auto",
                    margin: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }
            }}
            contentLabel={label}
        >

            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">{label}</h3>
                </div>
                <div className="modal-body">{children}</div>
                <div className="modal-footer">
                    <button className="btn btn-outline-primary" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default MyModal
