import './Reports.css'

import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

import reportsApi from '../../api/reports-api'

export default function Reports() {
    const [reports, setReports] = useState(null);

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

        return  listOfReports;
    }

    const getReportHeaders = (prop) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(prop, "text/html")
        
        const getHeader = doc.getElementsByClassName('accordion-header')

        return getHeader;
    }
    
    const allReports = [...extractReportListFromHtml()].slice(1);
    return (
        <>
            <h1>Task 1 - Report Library</h1>
            <h2>Please, select the report you want to export in the desired format!</h2>
            <div className='accordion'>
                <ul className='accordion-module'>
                    {allReports.map((report) => 
                        <li className='accordion accordion-toggle' key={report.dataset.thumbnail}>
                            <Link className='accordion-toggle' to={`/${report.dataset.thumbnail}/exportFormat`} data-widget="grid">
                                <h2 className='accordion-header'>{getReportHeaders(report.innerHTML)[0].textContent}</h2>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </>
    )
}