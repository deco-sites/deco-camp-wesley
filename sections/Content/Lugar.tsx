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

            <div>
                {props.sections.map((section, index) => (
                    <div class="flex justify-center flex-col" key={index}>
                        <img src={section.src} alt={section.alt} />
                        <h4>{section.cta}</h4>
                        <p class="bg-black text-white"> Confira a temperatura em Florianópolis: {section.temperature?.celsius}</p>
                    </div>
                ))}

            </div>
        </>
    );
}
