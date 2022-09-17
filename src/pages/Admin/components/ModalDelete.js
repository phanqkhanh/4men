import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import API, { headers } from '../../../API';
import axios from 'axios';
import { Message } from '../../../Notification';

const ModalDelete = ({ modal, callback, productDelete, setProducts, products }) => {
    console.log(productDelete);
    //xóa
    function handleDeleteProduct() {
        var config = {
            method: 'delete',
            url: `${API.baseURL}products/${productDelete.id}`,
            headers: {},
        };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                if (response.status == 200) {
                    setProducts(() => products.filter((product) => product.id != productDelete.id));
                    callback();
                    Message('Xóa thành công', 'success');
                }
            })
            .catch(function (error) {
                Message('Xóa thất bại', 'error');
                console.log(error);
            });
    }
    return (
        <div>
            <Modal isOpen={modal} fade={false} toggle={callback} size="md" style={{ marginTop: '200px' }}>
                <ModalHeader>
                    <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Xóa</h4>
                </ModalHeader>
                <ModalBody>
                    Bạn có chắc muốn xóa <span style={{ fontWeight: 'bold', color: 'red' }}>{productDelete.title}</span>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleDeleteProduct} size="lg">
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

export default ModalDelete;
