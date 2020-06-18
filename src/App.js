import React, { useState, useEffect } from 'react';//useEffect para disparar funções quando tiver alguma informação alterada
import './App.css';
import api from './services/api'


function App() {
    const [projects, setProjects] = useState([]);
      useEffect(() => {
        api.get('/repositories').then(response => {
            setProjects(response.data)
        })
    }, []);

    async function handleAddRepository() {
           const response = await api.post('repositories', {
            title: `Personal Manager ${Date.now()}`,
            owner: "Fabricio"
        })

        const project = response.data;

        setProjects([...projects, project]);
    }

    async function handleRemoveRepository(id) {
       
        const response = await api.delete(`repositories/${id}`); //, {
    
        const filter = projects.filter(function(project){
            return project.id != id;
        })

        setProjects(filter);
     }

    return (
        <div>
        <ul data-testid="repository-list">            
                {projects.map(project => <li key={project.id}>{project.title}
                    <button onClick={() => handleRemoveRepository(project.id)}>
                        Remover
                    </button>                
                </li>)}

        </ul>
        <button onClick={handleAddRepository}>Adicionar</button>
        </div>    
    );
}

export default App;
