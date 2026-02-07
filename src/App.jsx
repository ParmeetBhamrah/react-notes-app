import { useEffect, useState } from "react"

function App() {
  const [notes, setNotes] = useState([])
  const [input, setInput] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes")

    if (storedNotes) {
      setNotes(JSON.parse(storedNotes))
    }

    setIsLoaded(true)
  }, [])

  useEffect(() => {
  if (!isLoaded) return

    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes, isLoaded])

  const addNote = () => {
    if (input.trim() === "") return
    setNotes([...notes, input])
    setInput("")
  }

  return (
    <div>
      <h1>Notes</h1>

      <input  
        value={input}
        placeholder="Write a note..."
        onChange= {(e) =>  {setInput(e.target.value)}}
      />

      <button
        onClick={addNote}
      >
        Add
      </button>

      <ul>
        {notes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
