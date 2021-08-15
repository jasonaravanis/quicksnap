import Desktop from "./Desktop";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "../../App";
import testImage from "../../images/test-images/RightSideBox/david.barrell.png";

jest.mock("./ChatBox", () => {
  const ChatBox = () => <div>ChatBox</div>;
  return ChatBox;
});

describe("Messenger - Mobile", () => {
  const contacts = [
    {
      id: "random ID 1",
      name: "test-contact-name",
      image: testImage,
    },
  ];
  const messages = [
    {
      id: 1,
      authorID: "random ID 1",
      content: "message content 1",
    },
    {
      id: 2,
      authorID: "random ID 2",
      content: "message content 2",
    },
    {
      id: 3,
      authorID: "random ID 1",
      content: "message content 3",
    },
  ];

  const handleClick = jest.fn();
  const setContacts = jest.fn();
  const activeContact = false;
  const setActiveContact = jest.fn();
  const setMessages = jest.fn();
  const newMessage = false;
  const setNewMessage = jest.fn();
  const setCurrentPage = jest.fn();

  let instance;

  beforeEach(() => {
    instance = render(
      <BrowserRouter>
        <UserContext.Provider
          value={{
            id: 1,
            name: "test-user-name",
          }}
        >
          <Desktop
            contacts={contacts}
            messages={messages}
            handleClick={handleClick}
            setContacts={setContacts}
            activeContact={activeContact}
            setActiveContact={setActiveContact}
            setMessages={setMessages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            setCurrentPage={setCurrentPage}
          />
          ;
        </UserContext.Provider>
      </BrowserRouter>
    );
  });

  it("renders with contacts and username", () => {
    const username = screen.getByText("test-user-name");
    expect(username).toBeTruthy();

    const contact = screen.getByText("test-contact-name");
    expect(contact).toBeTruthy();

    const image = screen.getByTestId(`user-image-random ID 1`);
    expect(image).toHaveAttribute("src", testImage);
  });

  it("fires click handler when contact is clicked", () => {
    const contact = screen.getByText("test-contact-name");
    fireEvent.click(contact);

    expect(handleClick.mock.calls.length).toBe(1);
  });

  it("activates new message screen when button is clicked", () => {
    const writeNewMessageButton = screen.getByTestId("test-write-button");
    fireEvent.click(writeNewMessageButton);

    expect(setNewMessage.mock.calls[0][0]).toBe(true);

    instance.rerender(
      <BrowserRouter>
        <UserContext.Provider
          value={{
            id: 1,
            name: "test-user-name",
          }}
        >
          <Desktop
            contacts={contacts}
            messages={messages}
            handleClick={handleClick}
            setContacts={setContacts}
            activeContact={activeContact}
            setActiveContact={setActiveContact}
            setMessages={setMessages}
            newMessage={true}
            setNewMessage={setNewMessage}
            setCurrentPage={setCurrentPage}
          />
          ;
        </UserContext.Provider>
      </BrowserRouter>
    );

    const newMessageTitle = screen.getByText("New Message");
    expect(newMessageTitle).toBeTruthy();
  });

  it("renders contact name when given a contact is active", () => {
    instance.rerender(
      <BrowserRouter>
        <UserContext.Provider
          value={{
            id: 1,
            name: "test-user-name",
          }}
        >
          <Desktop
            contacts={contacts}
            messages={messages}
            handleClick={handleClick}
            setContacts={setContacts}
            activeContact={{
              id: "random ID 1",
              name: "test-contact-name",
              image: testImage,
            }}
            setActiveContact={setActiveContact}
            setMessages={setMessages}
            newMessage={true}
            setNewMessage={setNewMessage}
            setCurrentPage={setCurrentPage}
          />
          ;
        </UserContext.Provider>
      </BrowserRouter>
    );

    // Renders active contact name in header
    const newMessageTitle = screen.getByText("test-contact-name");
    expect(newMessageTitle).toBeTruthy();
  });

  it("renders ChatBox component when given an active contact", () => {
    // rendered with change to activeContact
    instance.rerender(
      <BrowserRouter>
        <UserContext.Provider
          value={{
            id: 1,
            name: "test-user-name",
          }}
        >
          <Desktop
            contacts={contacts}
            handleClick={handleClick}
            setContacts={setContacts}
            setActiveContact={setActiveContact}
            setMessages={setMessages}
            newMessage={true}
            setNewMessage={setNewMessage}
            setCurrentPage={setCurrentPage}
            activeContact={{
              id: "random ID 1",
              name: "test-contact-name",
              image: testImage,
            }}
            messages={[
              {
                id: 1,
                authorID: "random ID 1",
                content: "message content 1",
              },
              {
                id: 2,
                authorID: "random ID 2",
                content: "message content 2",
              },
              {
                id: 3,
                authorID: "random ID 1",
                content: "message content 3",
              },
            ]}
          />
          ;
        </UserContext.Provider>
      </BrowserRouter>
    );

    // Renders ChatBox component, which will display messages
    // ChatBox has been stubbed, to only show a div with "ChatBox" inside
    const ChatBox = screen.getByText("ChatBox");
    expect(ChatBox).toBeTruthy();
  });

  it("renders send message prompt", () => {
    instance.rerender(
      <BrowserRouter>
        <UserContext.Provider
          value={{
            id: 1,
            name: "test-user-name",
          }}
        >
          <Desktop
            contacts={contacts}
            messages={false}
            handleClick={handleClick}
            setContacts={setContacts}
            activeContact={activeContact}
            setActiveContact={setActiveContact}
            setMessages={setMessages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            setCurrentPage={setCurrentPage}
          />
          ;
        </UserContext.Provider>
      </BrowserRouter>
    );
    const prompt = screen.getByText("Send private messages to a friend");

    expect(prompt).toBeVisible();
  });
});
