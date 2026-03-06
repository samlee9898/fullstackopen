import { useState, useEffect } from 'react'
import PersonForm from './PersonForm'
import personService from './services/persons'
import Notification from './Notification'

const DeleteButton = ( {name, id, setPersons} ) => {

  const deletePerson = () => {

    if (!window.confirm(`Delete ${name} ?`)) {
      return
    }

    personService
      .deleteContent(id)
      .then(() => {
        return personService.getAll()
      })
      .then(updatedPersons => {
        setPersons(updatedPersons)
      })
      .catch(error => {
        console.log(error)
      })
  }
  return <button type="button" onClick={deletePerson}>delete</button>
}

const Filter = ({searchName, handleSearchName}) => {
  return <div> filter shown with <input value={searchName} onChange={handleSearchName}/> </div>
}

const Persons = ({searchName, persons, setPersons}) => {
  return (
    <div>
      {
        searchName 
          ? persons
              .filter(person => 
                person.name.toLowerCase().includes(searchName.toLowerCase())
              )
              .map(person => (
                <div key={person.name}>
                  {person.name} {person.number}
                  <DeleteButton
                    key={person.name}
                    name={person.name}
                    id={person.id}
                    setPersons={setPersons}
                  />
                </div>
              ))
          : persons.map(person => (
              <div key={person.name}>
                {person.name} {person.number}
                <DeleteButton
                  key={person.name}
                  name={person.name}
                  id={person.id}
                  setPersons={setPersons}
                />
              </div>
            ))
      }
      </div>
    )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons =>{
        setPersons(initialPersons)
      })
  }, [])

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchName = (event) => {
    setSearchName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <Notification message={message} />}
      <Filter searchName={searchName} handleSearchName={handleSearchName}/>
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} setNewName={setNewName} newName={newName} handleName={handleName} newNumber={newNumber} handleNumber={handleNumber} setNewNumber={setNewNumber} setMessage={setMessage}/>
      <h3>Numbers</h3>
      <Persons setPersons={setPersons} searchName={searchName} persons={persons}/>
    </div>
  )
}

export default App