import personService from './services/persons'

const PersonForm = ({ persons, setPersons, setNewName, newName, handleName, newNumber, handleNumber, setNewNumber, setMessage}) => {
    const submit = (event) => {
        event.preventDefault()
        const existing = persons.find(person => person.name === newName)

        if (existing) {
            if (window.confirm(`${newName} is already added, replace the old number?`)) {
                const updated = { ...existing, number: newNumber }
                personService
                  .update(existing.id, updated)
                  .then(updatedPerson => {
                    setPersons(prev => prev.map(person => person.id === existing.id ? updatedPerson : person))
                  })
                  .catch(() => {
                    setMessage(`Information of ${newName} has already been removed from server`)
                  })
            }
            setMessage(`Added ${newName}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            return
        }
        const personObject = { name: newName, number: newNumber }
        personService
          .create(personObject)
          .then(newPerson => {
            setPersons(prev => prev.concat(newPerson))
            setNewName('')
            setNewNumber('')
          })
        setMessage(`Added ${newName}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
    }

  return (
      <form onSubmit={submit}>
        <div>
          name: <input value={newName} onChange={handleName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm