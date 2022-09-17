import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import API, { headers } from '../../../API';
import axios from 'axios';
import { Message } from '../../../Notification';
import { useNavigate } from 'react-router-dom';

const ModalLogOut = ({ modal, callback }) => {
    // function handleDeleteProduct() {
    //     var config = {
    //         method: 'delete',
    //         url: `${API.baseURL}products/${productDelete.id}`,
    //         headers: {},
    //     };
    //     axios(config)
    //         .then(function (response) {
    //             console.log(JSON.stringify(response.data));
    //             if (response.status == 200) {
    //                 setProducts(() => products.filter((product) => product.id != productDelete.id));
    //                 callback();
    //                 Message('Xóa thành công', 'success');
    //             }
    //         })
    //         .catch(function (error) {
    //             Message('Xóa thất bại', 'error');
    //             console.log(error);
    //         });
    // }
    const navigate = useNavigate();
    function handleLogOut() {
        Message('Đăng xuất thành công', 'success');
        localStorage.removeItem('name');
        setTimeout(() => {
            navigate('/');
        }, 1000);
    }
    return (
        <div>
            <Modal isOpen={modal} fade={false} toggle={callback} size="sm" style={{ marginTop: '200px' }}>
                <ModalHeader>
                    <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Đăng xuất</h4>
                </ModalHeader>
                <ModalBody style={{ textAlign: 'center', color: 'red' }}>
                    <span style={{ fontSize: '17px' }}>Bạn có chắc muốn đăng xuất</span>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleLogOut} size="lg">
                        Xác nhận
                    </Button>{' '}
                    <Button color="secondary" onClick={callback}>
                        Thoát
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default ModalLogOut;
