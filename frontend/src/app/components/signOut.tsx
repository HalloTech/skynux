import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/login-signup" })}
      className="px-4 py-2 bg-red-500 text-white rounded"
    >
      Logout
    </button>
  );
};