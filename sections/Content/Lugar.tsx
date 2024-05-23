import type { Temperature } from "apps/weather/loaders/temperature.ts";
import { ImageWidget } from "apps/admin/widgets.ts";


export interface Cultures {
    temperature: Temperature | null;
    src?: ImageWidget;
    title?: string;
    subtitle?: string;
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
                    <div key={index}>
                        <img src={section.src} alt={section.title} />
                        <p>{section.temperature?.celsius}</p>
                        <h1>{section.title}</h1>
                        <p>{section.subtitle}</p>
                    </div>
                ))}

            </div>
        </>
    );
}
