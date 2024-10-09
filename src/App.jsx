import './App.css'

import ExportFormat from './components/exportFormatPage/ExportFormat'
import Reports from './components/reportsPage/Reports'
import Result from './components/resultPage/Result'

import { Routes, Route } from 'react-router-dom';

function App() {

    return (
      <Routes>
        <Route path="/" element={<Reports />} />
        <Route path="/:reportThumbnail/exportFormat" element={<ExportFormat />} />
        <Route path="/:reportThumbnail/result" element={<Result />} />
      </Routes>
    )
}

export default App