import { StructureForm } from "./StructureForm";

export function BoxForm(){


    return (
        <section>

            <div className="leading-[1.5rem] flex flex-col w-full max-w-[800px] justify-center m-auto mt-4 p-5 border rounded border-gray-500 bg-gray-700">
                <h1 className="text-xl text-center mb-5">
                    Calcule a quantidade de tinta para sua Parede
                </h1>
                <p className="mb-2">
                    Para realizar o cálculo de maneira correta, 
                    precisamos que você siga as regras abaixo:
                </p>
                <p>
                    - Paredes: Precisam ser pelo menos 30cm mais alta que possíveis portas,  
                    ter no mínimo 1m² e no máximo 50m²;
                </p>
                <p>
                    - Portas e Janelas: A medida da área não deve ultrapassar 50% da área das paredes;
                </p>
                <p>
                    - Cada janela possui as medidas: 2,00 x 1,20 mtos;
                </p>
                <p>
                    - Cada porta possui as medidas: 0,80 x 1,90 mt;
                </p>
                <p>
                    - Cada litro de nossa tinta consegue pintar 5 metros quadrados de parede;
                </p>
                <p className="mt-2">
                    As variações de tamanho das latas de tinta são:
                </p>
                <ul className="pl-10 list-disc">
                    <li> 0,5L</li>
                    <li> 2,5L</li>
                    <li> 3,6L</li>
                    <li> 18L</li>
                </ul>
               <StructureForm />
            </div>
        </section>
    )
}