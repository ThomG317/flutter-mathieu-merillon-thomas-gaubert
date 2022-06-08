import {useState} from 'react';

import {MyTabs} from "./src/MenuPrincipal";


export default function App() {

    const [voyages, setVoyages] = useState([]);

    const addVoyage = (voyage) => {
        console.log(voyage, voyages);
        setVoyages((oldVoyages) => [...oldVoyages, voyage]);
        console.log(voyage, voyages);
    }

    return (
        <MyTabs screenProps={{}} voyages={voyages} onAddVoyage={addVoyage}/>
    );
}
