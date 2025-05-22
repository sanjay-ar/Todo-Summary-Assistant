function Header() {
    return (
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Todo Summary Assistant</h1>
          <div className="text-sm">
            <p>Your personal todo organizer with AI summaries</p>
          </div>
        </div>
      </header>
    );
  }
  
  export default Header;