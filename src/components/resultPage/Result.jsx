import './Result.css'

import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import documentDownloadApi from '../../api/documentDownload-api';

export default function Result() {
    const location = useLocation();
    const navigate = useNavigate();
    const {reportThumbnail} = useParams();
    const [disableButton, setDisableButton] = useState(false);
    const [reportPreview, setReportPreview] = useState('');

    const { clientID, instanceID, selecteFormat } = location.state;

    useEffect(() => {
        (async () => {
            const { documentID } = await documentDownloadApi.getDocumentID(Object.values(clientID), Object.values(instanceID), { format:'HTML5Interactive'});
              
            await documentDownloadApi.getDocuementInfo(Object.values(clientID), Object.values(instanceID), Object.values(documentID));

            const { reportPreview } = await documentDownloadApi.getReportPreview(Object.values(clientID), Object.values(instanceID), Object.values(documentID));
            
            setReportPreview(reportPreview);
            }
        )();
    }, [])

    if(Object.values(selecteFormat)[0] === "" || Object.values(selecteFormat)[0] === '--Select--'){
        if(disableButton === false) {
            setDisableButton(true);
        }
    }

    const handleClick = async () => {
        const { documentID } = await documentDownloadApi.getDocumentID(Object.values(clientID), Object.values(instanceID), Object.values(selecteFormat));
          
        await documentDownloadApi.getDocuementInfo(Object.values(clientID), Object.values(instanceID), Object.values(documentID));
        
        await documentDownloadApi.downloadDocument(Object.values(clientID), Object.values(instanceID), Object.values(documentID));
    }

    return (
        <>
            <h2>Result</h2>
            <p></p>
            <h2>Selected Format: {Object.values(selecteFormat)}</h2>
            {disableButton && 
                <>
                    <p className="disableText">Please, navigate back and select a Format to be able to Download!</p> 
                    <button onClick={() => navigate(`/${reportThumbnail}/exportFormat`)}>Go back and select a format!</button> <p />
                </>
            }
            <button disabled={disableButton} onClick={handleClick}>Downolad</button>
            <h2>Below is a preview of the first page of the report: </h2>
            <div className='reportPreivew' dangerouslySetInnerHTML={{__html: reportPreview.pageContent}} />
        </>
    )
}