import React, { SetStateAction } from 'react'

interface Switcher {
    category:string;
    setCategory:React.Dispatch<SetStateAction<string>>
}

const Switcher = ({category, setCategory}:Switcher) => {
    const tabs = ["All","Personal","Groups"]

    const renderTabSwitcher = (label:string)=> <button key={label} onClick={()=>setCategory(label.toLowerCase())} className={`flex items-center justify-center rounded-full transition-colors duration-300 py-2 px-7 ${category === label.toLowerCase() ? "bg-white" : "bg-background-plain"} text-xl`}>{label}</button>
 
  return (
    <div className='flex p-3 items-center justify-between rounded-full bg-background-plain'>
        {tabs.map(tab=> renderTabSwitcher(tab))}
    </div>
  )
}

export default Switcher
