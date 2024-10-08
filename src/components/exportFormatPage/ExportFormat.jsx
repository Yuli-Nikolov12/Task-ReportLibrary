import { useState, useEffect } from 'react'
import reportFormatsApi from '../../api/reportFormats-api'

export default function ExportFormat() {
    const [formats, setFormats] = useState([]);
    

    useEffect(() => {
      ( async () => {
        const formatsApi = await reportFormatsApi.allAvailableFormats();

        setFormats(formatsApi)
      }
      )();
    }, []);

    return (
        <div>
            <select>
            {formats.map((format) => 
                <option key={format.name}>{format.name}</option>
            )}
            </select>
        </div>
    )
}