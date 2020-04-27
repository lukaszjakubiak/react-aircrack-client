import React from 'react'
import DataSender from './DataSender'
import DataReceiver from './DataReceiver'
import DataReceiverByAP from './DataReceiverByAP'

function MainWindow() {
  return (
    <div>
      Welcom to WPA password tracting service based on arcrack-ng
      <div>
          <DataSender />
          <DataReceiver />
          <DataReceiverByAP />
      </div>
    </div>
  )
}

export default MainWindow
