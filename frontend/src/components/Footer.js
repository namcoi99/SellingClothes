import React, { Component } from 'react';
import '../Css/home.css';

class Footer extends Component {
    render() {
        return (
            // footer
            <div className="footer">
                <div className="top-footer">
                    <div className="top-footer-left">
                        <div className="top-footer-left-description">
                            <h3>
                                Được thành lập từ năm 2020. StreetWear tự hào là 1 trong 10 website bán hàng online hàng đầu Việt Nam.
                            </h3>
                        </div>
                        <div className="top-footer-left-icon">
                            <a href="https://www.facebook.com/tatuan19" target="__blank"><i className="fab fa-facebook"></i></a>
                            <a href="https://youtube.com" target="__blank"><i className="fab fa-youtube"></i></a>
                            <a href="https://instagram.com" target="__blank"><i className="fab fa-instagram"></i></a>
                            <a href="https://gmail.com" target="__blank"><i className="fas fa-envelope-square"></i></a>
                        </div>
                    </div>
                    <div className="top-footer-right">
                            <div className="top-footer-right-header">
                                <h2>Thông tin liên hệ</h2>
                            </div>
                            <div className="top-footer-right-content">
                                <div className="info location">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <div>
                                        <h3>Địa chỉ</h3>
                                        <p>
                                            D9 508 Đại học Bách khoa Hà Nội
                                        </p>
                                    </div>
                                </div>
                                <div className="info phone">
                                    <i className="fas fa-phone"></i>
                                    <div>
                                        <h3>Điện thoại</h3>
                                        <p>+84-0123-456-789</p>
                                    </div>
                                    
                                </div>
                                <div className="info mail">
                                    <i className="fas fa-envelope-open-text"></i>
                                    <div>
                                        <h3>Email</h3>  
                                        <p>example@gmail.com</p>
                                    </div>
                                    
                                </div>
                            </div>
                    </div>
                </div>
                <div className="bottom-footer"></div>
            </div>
        );
    }
}

export default Footer;