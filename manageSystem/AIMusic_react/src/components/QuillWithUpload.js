/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/6/15 上午11:49
 */
import React from "react";
import PropTypes from "prop-types";
import Quill from "quill";

export default class QuillWithUpload extends React.Component {
    static propTypes = {
        onUpload: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    };

    static defaultProps = {
        value: ''
    };

    getHTML() {
        return this.quill.root.innerHTML;
    }

    componentDidMount() {
        const {onChange} = this.props;
        this.quill = new Quill(this.editorContainer, {
            theme: 'snow',
            debug: true,
            placeholder: 'Please.',
            modules: {
                toolbar: {
                    container: [
                        [{'header': [false, 1, 2, 3, 4, 5]}, {'size': ['small', false, 'large', 'huge']}],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                        ['link', 'image'],
                        ['clean']
                    ],
                    handlers: {
                        image: () => this.fileInput.click()
                    }
                },
            }
        });
        this.quill.on('text-change', () => onChange(this.getHTML()))
    }

    render() {
        const {onUpload, value} = this.props;
        return (
            <div>
                <input type="file" ref={x => this.fileInput = x} style={{display: 'none'}} onChange={e => {
                    onUpload(e.target.files[0], (url) => {
                        const quill = this.quill;
                        const selection = quill.getSelection();
                        quill.deleteText(selection.index, selection.length);
                        quill.insertEmbed(selection.index, 'image', url);
                    });
                }}/>

                <div id="editor" ref={x => this.editorContainer = x}>
                    <p dangerouslySetInnerHTML={{__html: value}}/>
                </div>
            </div>
        )
    }
}
