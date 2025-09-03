import { Search } from 'lucide-react'

const SearchBar  = () => {
  return (
    <div className="flex items-center space-x-3 w-full md:w-auto">
    <div className="relative flex-1 md:flex-initial">
      <Search className="absolute left-3 top-1/2   transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
      <input
        type="text"
        placeholder="Search tasks, assignments..."
        className="
      w-full md:w-56 pl-10 pr-4 py-2 h-10 bg-zinc-800 border border-zinc-700 rounded-lg
      text-white placeholder-zinc-500
      focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
      transition-all duration-200
    "
      />
    </div>

   

  </div>
  )
}

export default SearchBar 