"use client";
import React from "react";

import { useSession } from "next-auth/react";

function DashboardPage() {
  const { data: session, status } = useSession();
  console.log(session, status);

  return (
    <>
      <div>DashboardPage</div>
      <div>Profile</div>
      <pre>{JSON.stringify({ session, status }, null, 2)}</pre>
    </>
  );
}

export default DashboardPage;
