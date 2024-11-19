import React from 'react';
import ReactLoading from "react-loading";

const Loading = () => {
    return (
        <div style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
            <div style={{ marginTop: '20%' }}>
                <center>
                <ReactLoading type="spin" color="#0000FF"
                    height={200} width={100}/>
                </center>
            </div>
        </div>
    )
}

export default Loading