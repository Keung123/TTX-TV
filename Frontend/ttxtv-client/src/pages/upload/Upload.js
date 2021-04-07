/** 
 * @file Uploading Page of the app.
 */

import React from 'react';
import {
    Container,
    Button,
    Form
} from 'react-bootstrap';
import bsCustomFileInput from 'bs-custom-file-input';


class Upload extends React.Component {

    // constructor(props) {
    //     super(props);

    //     this.state = {

    //     };
    // }

    componentDidMount() {
        bsCustomFileInput.init();
        test();
    }


    FileUploadHandler = (image_type, e) => {
        if (e.target.files) {
          console.log(e.target.files);
          let file = e.target.files[0];
          if (file) {
            let current_state = this.state.upload_image;
            current_state[image_type]["label"] = file.name;
            current_state[image_type]["file"] = file;
            this.setState({ upload_image: current_state });
          }
        } else {
          console.log("Nope");
        }
      };

    render() {
        return (
            <React.Fragment>
                {/* <div className="bgdiv">
                    <img
                        alt=""
                        src={bgimg}
                        className="bgimg"
                    />
                </div> */}

                <Container fluid className="TestingConTainer">

                    <Form className="ml-auto mr-3 my-auto">
                        <Form.File id="formcheck-api-custom" custom>
                            <Form.File.Input accept="video/mp4" />
                            <Form.File.Label data-browse="Button text">
                                Choose Your Video
                            </Form.File.Label>
                            {/* <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback> */}
                        </Form.File>
                    </Form>

                    <Button className="mr-auto my-auto" variant="primary">Upload</Button>{' '}
                </Container>

                

            </React.Fragment>
        );
    }
}




function test() {
    console.log(process.env.REACT_APP_CLOUDFLARE_STREAM_TOKEN);
}


export { test };

export default Upload;
