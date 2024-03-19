import React, { } from 'react'
import Content1 from './Content1/Content1.js'
import Content3 from './Content3/Content3.js'
import Content6 from './Content6/Content6.js'
import Content2 from './Content2/Content2.js'
import './Home.css'

export default function Home(props) {
  return (
    <div className='subHome'>
      <Content1 className="homeCon1"></Content1>
      <Content2 className="homeCon2"></Content2>
      <Content3 className="homeCon3"></Content3>
      <Content6 className="homeCon6"></Content6>
    </div>
  )
}
