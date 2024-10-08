import './Reports.css'
import { useState, useEffect } from 'react'
import reportsApi from '../../api/reports-api'

export default function Reports() {
    const [reports, setReports] = useState(null);
    const [listWithReports, setListWithReports] = useState({});
    

    useEffect(() => {
      ( async () => {
        const reportsApiResult = await reportsApi.allReports();

        setReports(reportsApiResult)
      }
      )();
    }, []);


    const extractReportListFromHtml = () => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(reports, "text/html")
        
        const listOfReports = doc.getElementsByClassName('accordion-item')
        console.log(listOfReports);

        return  listOfReports;
    }

    const getHeaders = (prop) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(prop, "text/html")
        
        const getHeader = doc.getElementsByClassName('accordion-header')

        return getHeader;
    }
    
    const allReports = [...extractReportListFromHtml()].slice(1);
    return (
        <div className='accordion'>
            <ul className='accordion-module'>
                {allReports.map((report) => 
                    <li className='accordion accordion-toggle' key={report.dataset.thumbnail}>
                        <a className='accordion-toggle' href='#' data-widget="grid">
                            <h2 className='accordion-header'>{getHeaders(report.innerHTML)[0].textContent}</h2>
                        </a>
                    </li>
                )}
            </ul>
        </div>
    )
}