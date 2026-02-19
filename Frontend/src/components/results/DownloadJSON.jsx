import React from 'react'
import { FaDownload } from 'react-icons/fa'
import { downloadJSON } from '../../utils/formatJSON'

export const DownloadJSON = ({ data, filename = 'pharmacogenomics_result.json' }) => {
  return (
    <button className="btn btn-secondary" type="button" onClick={() => downloadJSON(data, filename)}>
      <FaDownload /> Download JSON
    </button>
  )
}

export default DownloadJSON

