
interface CTA {
    title?: string;
    content?: string;
    button?: string;
    href?: string;
}

export interface Props {
    image?: string;
    alt?: string;
    cta?: CTA;
}

export default function HeroBanner(props: Props) {
    return (
        <div className="pb-[100px]">
            <div className="flex justify-center flex-row container">
                <div class="w-7/12">
                    <img src={props.image} alt={props.alt} />
                </div>
                <div className="bg-black flex text-center flex-col  w-5/12 justify-center">
                    {props.cta && (
                        <>
                            <h3 className="text-[20px] text-white">{props.cta.title}</h3>
                            <p className="text-[20px] text-white">{props.cta.content}</p>
                            <a href={props.cta.href} className="text-[20px] text-black bg-white">
                                {props.cta.button}
                            </a>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
