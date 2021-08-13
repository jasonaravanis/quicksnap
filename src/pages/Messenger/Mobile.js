import React from "react";
import { Link } from "react-router-dom";

import Write from "../../images/SVG/Write";
import ChevronDown from "../../images/SVG/ChevronDown";
import ChevronLeft from "../../images/SVG/ChevronLeft";

import ChatBox from "./ChatBox";
import NewMessage from "./NewMessage";

function Mobile({
  user,
  handleClick,
  contacts,
  setContacts,
  activeContact,
  setActiveContact,
  messages,
  setMessages,
  newMessage,
  setNewMessage,
  setCurrentPage,
}) {
  return (
    <div className=" bg-white absolute top-0 w-full h-full ">
      {!activeContact && !newMessage && (
        <div className="h-full flex flex-col">
          <div className="border-b border-gray-300 flex items-center justify-between py-2">
            <Link to="/" onClick={() => setCurrentPage("home")}>
              <div className="mx-2 w-7">
                <ChevronLeft />
              </div>
            </Link>
            <div className="my-1 flex items-center">
              <span className="font-semibold text-sm">iamjasona</span>
              <div className="w-6">
                <ChevronDown />
              </div>
            </div>
            <div className=" mx-2 w-7" onClick={() => setNewMessage(true)}>
              <Write />
            </div>
          </div>
          <div className="flex flex-col">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center m-2"
                onClick={handleClick}
                data-userid={contact.id}
              >
                <img
                  src={contact.image}
                  alt="contact"
                  className="border rounded-full h-12 pointer-events-none"
                  data-testid={`user-image-${contact.id}`}
                />
                <div className="ml-3 flex flex-col pointer-events-none">
                  <span className="font-semibold text-sm">{contact.name}</span>
                  <span className="text-gray-500 text-xs">
                    last message XYZ
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeContact && !newMessage && (
        <div className="h-full flex flex-col">
          <div className="border-b border-gray-300 flex items-center justify-between py-2">
            <div
              className=" mx-2 w-7 md:invisible"
              onClick={() => setActiveContact(null)}
              data-testid="mobile-return-messenger-main"
            >
              <ChevronLeft />
            </div>
            <div
              className="my-1 flex items-center"
              data-testid="activeUserHeading"
            >
              <span className="font-semibold text-sm">
                {activeContact.name}
              </span>
              <div className="w-6">
                <ChevronDown />
              </div>
            </div>
            <div className=" mx-2 w-7">
              <Write />
            </div>
          </div>
          {messages && <ChatBox messages={messages} user={user} />}
        </div>
      )}
      {newMessage && !activeContact && (
        <NewMessage
          setNewMessage={setNewMessage}
          setContacts={setContacts}
          contacts={contacts}
          setActiveContact={setActiveContact}
        />
      )}
    </div>
  );
}

export default Mobile;
