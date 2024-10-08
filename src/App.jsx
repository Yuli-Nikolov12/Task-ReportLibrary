import './App.css'
import ExportFormat from './components/exportFormatPage/ExportFormat'
import Reports from './components/reportsPage/Reports'

function App() {

    return (
      <>
        <h1>Task 1 - Report Library</h1>
        <h2>Please, select the report you want to export in the desired format!</h2>
        <ExportFormat />
        <Reports />
      </>
    )
}

export default App