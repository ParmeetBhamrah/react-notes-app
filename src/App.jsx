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

    const newNote = {
      id: Date.now(),
      text: input
    }
    setNotes([...notes, newNote])
    setInput("")
  }

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Notes</h1>

      <div className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <input  
            value={input}
            placeholder="Write a note..."
            onChange={(e) => {setInput(e.target.value)}}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
          />

          <button
            onClick={addNote}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Add
          </button>
        </div>

        {notes.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <ul className="space-y-3">
              {notes.map((note) => (
                <li key={note.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700">
                  <span>{note.text}</span>
                  <button
              onClick={() => deleteNote(note.id)}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Delete
            </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>  
    </div>
  )
}

export default App
