"use client";

import { FormEvent, useEffect, useState } from "react";
import { Message, ROLE } from "./types";
import { getCatImage } from "./networkCalls";

export default function Home() {
  const [message, setMessage] = useState("");
  const [userSentMessage, setUserSentMessage] = useState(false);
  const [response, setResponse] = useState<string[]>([]);
  const [conversationList, setConversationList] = useState<Message[]>([]);

  useEffect(() => {
    if (response.length > 0) {
      setConversationList([
        ...conversationList,
        { id: crypto.randomUUID(), content: response, role: ROLE.AI },
      ]);
    }
  }, [response]);

  useEffect(() => {
    if (message.length > 0) {
      setConversationList([
        ...conversationList,
        { id: crypto.randomUUID(), content: [message], role: ROLE.User },
      ]);
      setMessage("");
    }
  }, [userSentMessage]);

  const sendMessage = async (
    e: FormEvent<HTMLFormElement>,
    message: string
  ) => {
    e.preventDefault();
    setUserSentMessage(!userSentMessage);
    getCatImage({ message, setResponse });
  };

  const renderConversation = conversationList.map((message) => {
    return (
      <div
        key={message.id}
        className={`${
          message.role == ROLE.User
            ? "self-start bg-teal-900"
            : "self-end text-right bg-sky-900"
        } whitespace-pre-line p-4 rounded-md w-3/4`}
      >
        <div className="font-bold text-xl">
          {message.role === ROLE.User ? "User" : "AI"}
        </div>
        <div>
          {message.content?.map((entry, idx) => {
            return entry.includes("https://") ? (
              <img key={idx} src={entry}></img>
            ) : (
              entry
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <main className="flex flex-col justify-center items-center w-screen h-screen bg-white">
      <div className="text-black text-3xl mb-10">Welcome to Cat Chatbot!</div>
      <div className="bg-black w-3/4 h-3/4 flex-col p-5 flex gap-5 justify-between">
        <div className="grow bg-slate-400 overflow-y-auto p-3">
          {conversationList.length > 1 && (
            <div className="flex flex-col gap-2">{renderConversation}</div>
          )}
        </div>
        <form
          className="flex gap-4 justify-between"
          onSubmit={(e) => sendMessage(e, message)}
        >
          <div className="grow">
            <input
              className="w-full h-full text-black p-2"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="bg-white text-black p-3 cursor-pointer"
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
}
