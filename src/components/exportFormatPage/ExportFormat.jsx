import './ExportFormat.css'

import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

import reportFormatsApi from '../../api/reportFormats-api'
import clientAndInstanceApi from '../../api/clientAndInstance-api';

export default function ExportFormat() {
    const dict = {
      'crypto-dashboard': "Crypto Report.trdx",
      'conference-report': "Conference Report.trdx",
      'dashboard': "Dashboard.trdx",
      'crypto-currency-info': "",
      'invoice': "Invoice.trdx",
      'swiss-qr-bill-report': "SwissQRBill.trdx",
      'barcodes-report': "Barcodes Report.trdx",
      'product-sales': "Product Sales.trdx",
      'employee-sales':"Employee Sales Summary.trdx",
      'product-line-sales':"Product Line Sales.trdx",
      'sales-dashboard':"SalesByRegionDashboard.trdx",
      'report-book':"ReportBook.trbp",
      'crypto-currencies':"CryptoCurrencies.trdx",
      'list-bound-report':"ListBoundReport.trdx",
      'product-catalog':"Product Catalog.trdx",
      'product-tag-report':"Product Tag Report.trdx",
      'olympic-medals-map':"OlympicMedalsByNationalTeams.trdx",
      'population-density':"PopulationDensity.trdx",
    };

    const [formats, setFormats] = useState([]);
    const [clinetValue, setClientValue] = useState('');
    const [instanceValue, setInstanceValue] = useState('');
    const [selectedOption, setselectedOption] = useState('');

    const navigate = useNavigate();
    const {reportThumbnail} = useParams();

    useEffect(() => {
      ( async () => {
        const formatsApi = await reportFormatsApi.allAvailableFormats();

        const {clientID, instnaceID} = await clientAndInstanceApi.clientIDAndInstanceID(dict[reportThumbnail]);

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