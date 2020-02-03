import {Component} from "react";
import {Modal, Thumbnail} from "react-bootstrap";
import React from "react";

export default class ImageShow extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: true, img_url: '', data: {}}
    }

    componentWillReceiveProps(props) {
        console.log(props.data);
        this.setState({img_url: props.data});
    }

    render() {
        const { img_url } = this.state;
        return (
            <Modal {...this.props} aria-labelledby="contained-modal-title-lg">
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-lg">{img_url}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Thumbnail src={img_url} alt="">
              </Thumbnail>
            </Modal.Body>
          </Modal>
        )
    }
}