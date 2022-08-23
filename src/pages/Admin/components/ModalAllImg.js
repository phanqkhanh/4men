import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import API from '../../../API';

const ModalAllImg = ({ modal, callback, id, imgMain }) => {
    const [img, setImg] = useState([]);
    const [imgActive, setImgActive] = useState(imgMain);
    useEffect(() => {
        console.log(id);
        var config = {
            method: 'get',
            url: `${API.baseURL}productdetails/${id}`,
            headers: {},
        };
        axios(config)
            .then(function (response) {
                if (response.status == 200) {
                    // console.log(response.data);
                    let arrImg = response.data.img.split(',');
                    const item = arrImg.shift();
                    setImg(arrImg);
                    // setImgActive(arrImg[0]);
                    console.log(arrImg);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    return (
        <div>
            <Modal isOpen={modal} fade={false} toggle={callback} size="md" style={{ marginTop: '50px' }}>
                <ModalHeader>
                    <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Tất cả ảnh</h4>
                </ModalHeader>
                <ModalBody>
                    <div style={{ width: '100%', height: '350px', textAlign: 'center' }}>
                        <img src={imgActive} style={{ width: 'auto', maxWidth: '100%', maxHeight: '100%' }} />
                    </div>
                    <img
                        src={imgMain}
                        style={{
                            width: '50px',
                            maxHeight: '50px',
                            marginLeft: '7px',
                            opacity: imgMain == imgActive ? '0.3' : '1',
                        }}
                        onClick={() => {
                            setImgActive(imgMain);
                            // alert(API.imgURL + item);
                        }}
                    />
                    {img &&
                        img.map((item, index) => (
                            <img
                                key={index}
                                src={item != '' && API.imgURL + item}
                                style={{
                                    width: '50px',
                                    maxHeight: '50px',
                                    marginLeft: '7px',
                                    opacity: API.imgURL + item == imgActive ? '0.3' : '1',
                                }}
                                onClick={() => {
                                    setImgActive(API.imgURL + item);
                                    // alert(API.imgURL + item);
                                }}
                            />
                        ))}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={callback}>
                        Thoát
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default ModalAllImg;
