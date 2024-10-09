import './ExportFormat.css'

import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

import reportFormatsApi from '../../api/reportFormats-api'
import clientAndInstanceApi from '../../api/clientAndInstance-api';

export default function ExportFormat() {
    const [formats, setFormats] = useState([]);
    const [report, setReport] = useState('Dashboard.trdx');
    const [clinetValue, setClientValue] = useState('');
    const [instanceValue, setInstanceValue] = useState('');
    const [selectedOption, setselectedOption] = useState('');

    const navigate = useNavigate();
    const {reportThumbnail} = useParams();

    useEffect(() => {
      ( async () => {
        const formatsApi = await reportFormatsApi.allAvailableFormats();

        const {clientID, instnaceID} = await clientAndInstanceApi.clientIDAndInstanceID(report);

        setFormats(formatsApi)
        setClientValue(Object.values(clientID))
        setInstanceValue(Object.values(instnaceID))
      }
      )();
    }, []);

    const handleChange = (e) => {

      setselectedOption(e.target.value);
    }

    return (
      <>
        <div className='dropdown'>
            <select className='dropdown-content' onChange={handleChange}>
              <option>--Select--</option>
              {formats.map((format) => 
                  <option key={format.name}>{format.name}</option>
              )}
            </select>
        </div>
        <div className='divButtons'>
          <span />
          <Link to={`/${reportThumbnail}/result`} state={{ clientID: {clinetValue}, instanceID: {instanceValue}, selecteValue: {selectedOption} }} >
            <button >Next to The Result</button>
          </Link>
          <span />
          <button onClick={()=> navigate(`/`)}>Go Back to the Reports</button>
        </div>
      </>
    )
}