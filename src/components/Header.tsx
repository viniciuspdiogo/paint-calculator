import {PaintRoller} from 'phosphor-react'

export function Header(){
    return (
        <header 
            className="flex flex-1  content-center  py-5 w-full items-center justify-center bg-gray-500 text-gray-100"
        >
            <PaintRoller weight="fill" size={45} className="mr-5"/>
            <span className="flex text-2xl font-bold mt-[0.6rem]">
                PAINT CALCULATOR
            </span>
            <PaintRoller weight="fill" size={45} className="ml-5"/>
        </header>
    )
}