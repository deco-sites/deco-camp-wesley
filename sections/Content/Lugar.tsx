import type { Temperature } from "apps/weather/loaders/temperature.ts";
import { ImageWidget } from "apps/admin/widgets.ts";


export interface Cultures {
    temperature: Temperature | null;
    src?: ImageWidget;
    alt?: string;
    cta?: string;
}

export interface Props {
    title?: string;
    sections: Cultures[];
}

export default function Lugar(props: Props) {
    return (
        <>

            <div class="pb-[100px]">
                {props.sections.map((section, index) => (
                    <div class="flex justify-center flex-col" key={index}>
                        <img src={section.src} alt={section.alt} />
                        <div class="bg-black flex text-center flex-col" >
                        <h4 class="text-[40px] text-white">{section.cta}</h4>
                        <p class="text-white"> Confira a temperatura {section.temperature?.celsius} ºC</p>
                        </div>
                    </div>
                ))}

            </div>
        </>
    );
}
