import React from 'react';
// import Breadcrumbs from '../../components/Breadcrumbs/breadcrumbs';

const TutorialSize = () => {
    return (
        <div
            style={{
                paddingLeft: '10px',
                fontSize: '14px',
                borderBottom: '1px solid #ddd',
                paddingBottom: '40px',
                marginTop: '20px',
                marginBottom: '40px',
            }}
        >
            <div className="article-content">
                <span style={{ fontSize: '14px' }}>
                    Nếu bạn băn khoăn không biết chọn size nào cho phù hợp với cân nặng và chiều cao của mình, đừng lo
                    lắng! Hãy xem bảng hướng dẫn chọn size bên dưới mà&nbsp;
                    <span style={{ color: 'rgb(255, 0, 0)' }}>4MEN</span>&nbsp;tư vấn riêng dành cho bạn
                </span>
                <div style={{ textAlign: 'center' }}>&nbsp;</div>
                <div style={{ textAlign: 'center' }}>
                    <img
                        src="https://4menshop.com/images/2021/06/20210616_616a64351e05559313e9f5be86b85544_1623827621.png"
                        alt="Hướng dẫn chọn size - 1"
                        style={{ width: '100%' }}
                    />
                    <img
                        src="https://4menshop.com/images/2021/06/20210616_c8342a1b4357a802bf96a3f7f7cb2f63_1623827635.png"
                        alt="Hướng dẫn chọn size - 2"
                        style={{ width: '100%' }}
                    />
                    <br /> &nbsp;
                </div>
                <div style={{ textAlign: 'center' }}>
                    <img
                        src="https://4menshop.com/images/2016/12/20161226_ac1f530b18a20a327758473fa4930fc7_1482759836.jpg"
                        alt="Hướng dẫn chọn size - 3"
                    />
                </div>
                <span style={{ fontSize: '14px' }}>
                    Bảng hướng dẫn chọn size trên là bảng hướng dẫn dựa trên kinh nghiệm nhiều năm của 4MEN theo khảo
                    sát nhu cầu sở thích của khách hàng, tất nhiên sẽ không tuyệt đối, sẽ có những trường hợp ngoại lệ
                    phụ thuộc theo vóc dáng, sở thích của từng người. Ví dụ có người thích mặc ôm, có người thích mặc
                    rộng...
                    <br /> Nếu bạn vẫn còn có những mắc thắc và băn khoăn cần được giải đáp? Hãy liên hệ ngay với Bộ
                    phận Chăm sóc khách hàng của 4MEN qua&nbsp;Hotline <strong>(08)68 444 644</strong>&nbsp;để được hỗ
                    trợ thêm.
                </span>
            </div>
        </div>
    );
};

export default TutorialSize;
