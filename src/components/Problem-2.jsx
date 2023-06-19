import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'


import MyModal from './MyModal';
import { getPageNumberFromParams } from '../lib/utils'

const Problem2 = () => {
    const [showModalA, setShowModalA] = useState(false)
    const [showModalB, setShowModalB] = useState(false)
    const [showModalC, setShowModalC] = useState(false)

    const [contacts, setContacts] = useState([])
    const [contact, setContact] = useState(null)
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)

    const [isEven, setIsEven] = useState(false)
    const [searchText, setSearchText] = useState('')

    const getContacts = async () => {
        try {
            const res = await axios.get(`https://contact.mediusware.com/api/contacts/?page=${page}`)

            const newContacts = res.data.results
            setContacts((prevContacts) => [...prevContacts, ...newContacts])

            if (res.data.next) {
                setPage(getPageNumberFromParams(res.data.next))
                setHasMore(true)
            } else {
                setHasMore(false)
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    useEffect(() => {
        if (showModalA) {
            getContacts()
        }
    }, [showModalA])

    const openModalA = () => {
        setShowModalA(true)
        setShowModalB(false)
        setShowModalC(false)
        window.history.pushState(null, '', '/modal-a')
    };

    const openModalB = () => {
        setHasMore(false)

        const usContact = contacts.filter((contact) => contact?.country?.name === 'United States')
        setContacts(usContact)

        setShowModalA(false)
        setShowModalB(true)
        setShowModalC(false)
        window.history.pushState(null, '', '/modal-b')
    };

    const openModalC = () => {
        setShowModalC(true)
    };

    const closeModal = () => {
        console.log('Closed')
        setShowModalA(false)
        setShowModalB(false)
        setShowModalC(false)
        window.history.pushState(null, '', '/')
    };

    const sortContacts = () => {
        let filtered = contacts

        if (searchText) {
            filtered = contacts.filter(contact => contact.country.name.toLowerCase().startsWith(searchText.toLowerCase()))
        }
        else if (isEven)
            filtered = contacts?.filter((result) => result?.id % 2 === 0)


        return filtered
    }

    const renderButtons = () => (
        <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-lg btn-outline-primary" onClick={openModalA}>
                All Contacts
            </button>
            <button className="btn btn-lg btn-outline-warning" onClick={openModalB}>
                US Contacts
            </button>
        </div>
    )

    const renderSearchBar = () => (
        <div className="w-100 mx-auto p-3 d-flex justify-content-between align-items-center">
            <div className="search-container d-flex gap-2 justify-content-center mb-1">
                <input
                    type="text"
                    value={searchText}
                    onChange={(evt) => setSearchText(evt.currentTarget.value)}
                    placeholder="Search contacts..."
                    style={{ width: '100%' }}
                    className="form-control"
                />
            </div>
            <div className="">
                <label>
                    <input
                        type="checkbox"
                        checked={isEven}
                        onChange={() => setIsEven(!isEven)}
                    />
                    Only even
                </label>
            </div>
        </div>
    );

    const [listItemsContainerRef, setListItemsContainerRef] = useState();

    const onlistItemsContainerRefChange = useCallback((node) => {
        if (node !== null) {
            setListItemsContainerRef(node);
        }
    }, [])

    const renderContactTable = () => (
        <div className='d-flex flex-column' style={{ height: "300px" }} >
            <div ref={onlistItemsContainerRefChange} style={{ overflow: "auto" }}>
                {listItemsContainerRef && (
                    <InfiniteScroll
                        dataLength={sortContacts()?.length}
                        next={getContacts}
                        hasMore={hasMore}
                        loader={<p className='lead text-center'>Loading...</p>}
                        scrollableTarget={listItemsContainerRef}
                    >
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Phone Number</th>
                                    <th scope="col">Country Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortContacts()?.map((contact) => (
                                    <tr
                                        className="contact-item"
                                        key={contact.id}
                                        onClick={() => {
                                            openModalC();
                                            setContact(contact);
                                        }}
                                    >
                                        <th scope="row">{contact.id}</th>
                                        <td>{contact.phone}</td>
                                        <td>{contact.country?.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </InfiniteScroll>
                )}
            </div>
        </div>
    )

    const renderModal = (modalLabel, isOpen) => (
        <MyModal isOpen={isOpen} onClose={closeModal} label={modalLabel}>
            <div className="sticky-top bg-white">
                <div className="d-flex justify-content-center gap-3 p-3">
                    <button
                        className="btn btn-outline-primary"
                        onClick={openModalA}
                        style={{ backgroundColor: '#46139f', color: '#fff' }}
                    >
                        All Contacts
                    </button>
                    <button
                        className="btn btn-outline-warning"
                        onClick={openModalB}
                        style={{ backgroundColor: '#ff7f50', color: '#fff' }}
                    >
                        US Contacts
                    </button>
                    <button className="btn btn-outline-primary" onClick={closeModal}>
                        Close
                    </button>
                </div>

                {renderSearchBar()}
            </div>

            {renderContactTable()}
        </MyModal>
    );

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className="text-center text-uppercase mb-5">Problem-2</h4>
                {renderButtons()}
            </div>
            {/* Modal A */}
            {renderModal('Modal A', showModalA)}

            {/* Modal B */}
            {renderModal('Modal B', showModalB)}

            {/* Modal C */}
            <MyModal isOpen={showModalC} onClose={closeModal} label="Modal C">
                <div className="w-50 h-50 bg-white text-base d-flex justify-content-center align-items-center">
                    {contact?.phone}
                </div>
            </MyModal>
        </div>
    );
};

export default Problem2

