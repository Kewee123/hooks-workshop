import React, {
  useState,
  useContext,
  createContext,
  Children
} from "react"

import LoginForm from "app/LoginForm"
import SignupForm from "app/SignupForm"
import About from "app/About"

const TabsContext = createContext();

function Tabs({ children }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <TabsContext.Provider value={{activeIndex, setActiveIndex}}>
      <div data-reach-tabs>{children}</div>
    </TabsContext.Provider>
  )
}

const TabListContext = createContext();

function TabList({ children }) {
  return <div data-reach-tab-list>{
    children.map((child, index) => (
      <TabListContext.Provider value={{index}}>
        {child}
      </TabListContext.Provider>
    ))
    }</div>
}

function Tab({ isDisabled, children }) {
  const {index} = useContext(TabListContext) // TODO
  const { activeIndex, setActiveIndex } = useContext(TabsContext)
  const isActive = index === activeIndex
  return (
    <button
      data-reach-tab
      className={
        isDisabled ? "disabled" : isActive ? "active" : ""
      }
      onClick={
        isDisabled ? undefined : () => setActiveIndex(index)
      }
    >
      {children}
    </button>
  )
}

function TabPanels({ children }) {
  const { activeIndex } = useContext(TabsContext)
  return (
    <div data-reach-tab-panels>{children[activeIndex]}</div>
  )
}

function TabPanel({ children }) {
  return children
}

export default function LoggedOut() {
  const tabData = [
    {
      label: "Login",
      content: <LoginForm />
    },
    {
      label: "Signup",
      content: <SignupForm />
    },
    {
      label: "Order",
      content: <p>Get a nice breakfast sandwich.</p>
    }
  ]

  return (
    <div className="LoggedOut">
      <About />

      <Tabs>
        <TabList>
          <Tab>Login</Tab>
          <Tab>Signup</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LoginForm />
          </TabPanel>
          <TabPanel>
            <SignupForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}
