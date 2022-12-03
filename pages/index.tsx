import CustomerList from "../components/CustomerList";
import PreferenceList from "../components/PreferenceList";
import styles from '../styles/Home.module.css'
import { use, useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

export default function Home() {  
  
  return (
    <div className={styles.container}>
      <CustomerList />
    </div>
  )
}
