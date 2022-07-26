import { InputHTMLAttributes, } from "react"

interface InputsProps extends InputHTMLAttributes<HTMLInputElement>{
    description: string,
    wall: string,
    estilo: string,
}

export function BoxWall({wall,description,estilo, ...rest }: InputsProps){
    

    return (
        <div className={estilo}>

            <span className="font-bold text-xl">{description}</span>
            
            <div className="flex flex-wrap justify-center align-middle mt-4 ">
                <div className="flex  flex-col justify-center items-center mr-1">
                    <label htmlFor="">Altura da Parede</label>
                    <input 
                        {...rest}
                        type="number"  
                        data-wall={wall}
                        data-nameinput="height"
                        min="0"
                        step="0.01"
                        className="bg-gray-900 border border-gray-500 rounded px-5 h-12"
                    />
                </div>
                <div className="flex flex-col justify-center items-center mr-1">
                    <label htmlFor="">Largura da Parede</label>
                    <input 
                        {...rest}
                        type="number"  
                        data-wall={wall}
                        data-nameinput="width"
                        min="0"
                        step="0.01"
                        className="bg-gray-900 border border-gray-500 rounded px-5 h-12"
                    />
                </div>                           
            </div>

            <div className="flex flex-wrap justify-center align-middle mt-4 ">
                <div className="flex flex-col justify-center items-center mr-1">
                    <label htmlFor="">Portas</label>
                    <input 
                        {...rest}
                        type="number"  
                        data-wall={wall}
                        data-nameinput="door"
                        min="0"
                        step="1"
                        className="bg-gray-900 border border-gray-500 rounded px-5 h-12"
                    />
                </div>
                <div className="flex flex-col justify-center items-center mr-1">
                    <label htmlFor="">Janelas</label>
                    <input 
                        {...rest}
                        type="number"  
                        data-wall={wall}
                        data-nameinput="window"
                        min="0"
                        step="1"
                        className="bg-gray-900 border border-gray-500 rounded px-5 h-12"
                    />
                </div>        
            </div>
        </div>
    )
}