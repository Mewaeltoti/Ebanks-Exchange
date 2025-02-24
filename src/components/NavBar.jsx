import { SignedIn, SignedOut, SignInButton, UserButton, SignUpButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const { user } = useUser(); // To access user data from Clerk

  const handleOpenModal = () => {
    document.getElementById("currency_modal").openModal();
  };

  // Determine online status (you can replace this with actual logic based on your requirements)
  const isOnline = true; // Replace this with actual logic

  return (
    <div className="navbar fixed top-0 left-0 w-full bg-base-100 bg-opacity-50 backdrop-blur-lg shadow-lg z-10 rounded-lg p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
        {/* Left-aligned Brand */}
        <div className="flex items-center space-x-2">
          <a
            className="btn btn-ghost text-xl text-white"
            onClick={handleOpenModal}
          >
            <span className="text-accent">EBanks</span> Exchange
          </a>
        </div>

        {/* Right-aligned Authentication Section */}
        <div className="flex items-center space-x-6 ml-auto">
          <SignedOut>
            <div className="flex space-x-6">
              {/* Sign In Button */}
              <SignInButton>
                <button className="btn btn-ghost text-sm text-blue-600 hover:text-blue-700 transition-all duration-200 ease-in-out px-4 py-2">
                  Sign In
                </button>
              </SignInButton>

              {/* Sign Up Button */}
              <SignUpButton>
                <button className="btn btn-ghost text-sm text-green-600 hover:text-green-700 transition-all duration-200 ease-in-out px-4 py-2">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center space-x-4">
              {/* User Avatar */}
              <div className={`avatar ${isOnline ? "online" : "offline"}`}>
                <UserButton 
                  className="w-16 h-16 rounded-full overflow-hidden border-2 border-white"
                />
              </div>
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
