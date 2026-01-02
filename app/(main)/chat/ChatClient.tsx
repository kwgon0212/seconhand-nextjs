"use client";

import { User } from "@prisma/client";
import clsx from "clsx";
import { useState } from "react";

interface ChatClientProps {
  currentUser: User | null;
}

const ChatClient = ({ currentUser }: ChatClientProps) => {
  const [receiver, setReceiver] = useState({
    receiverId: "",
    receiverName: "",
    receiverImage: "",
  });
  const [layout, setLayout] = useState(false);

  console.log(layout);

  return (
    <main>
      <div className="grid grid-cols-[1fr] md:grid-cols-[300px_1fr]">
        <section className={clsx("md:flex", layout && "hidden")}>
          contact component
        </section>
        <section className={clsx("md:flex", !layout && "hidden")}>
          chat component
        </section>
      </div>
    </main>
  );
};

export default ChatClient;
