// src/components/withAuth.tsx
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function withAuth(Component: React.FC) {
  return function AuthComponent(props: any) {
    const router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        router.push("/login-signup");
      } else {
        setVerified(true);
      }
    }, [router]);

    return verified ? <Component {...props} /> : null;
  };
}

//usage

// src/app/user-profile/page.tsx
// import withAuth from "@/components/withAuth";

// const ProfilePage = () => {
//   return <div>Welcome to your profile</div>;
// };

// export default withAuth(ProfilePage);

