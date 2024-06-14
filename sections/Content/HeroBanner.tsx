import { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

interface CTA {
  title?: string;
  content?: string;
  button?: string;
  href?: string;
}

export interface Props {
  imageDesktop?: ImageWidget;
  imageMobile?: ImageWidget;
  lcp?: boolean;
  alt?: string;
  cta?: CTA;
}

export default function HeroBanner(props: Props) {
  return (
    <div>
      <div className="flex justify-center flex-row container">
        <div>
          <Picture preload={props.lcp}>
            <Source
              media="(max-width: 767px)"
              fetchPriority={props.lcp ? "high" : "auto"}
              src={props.imageMobile}
              width={430}
              height={590}
            />
            <Source
              media="(min-width: 768px)"
              fetchPriority={props.lcp ? "high" : "auto"}
              src={props.imageDesktop}
              width={1440}
              height={600}
            />
            <img
              class="object-cover w-full h-full"
              loading={props.lcp ? "eager" : "lazy"}
              src={props.imageDesktop}
              alt={props.alt}
            />
          </Picture>
        </div>
        <div className="bg-black flex text-center flex-col  w-5/12 justify-center">
          {props.cta && (
            <>
              <h3 className="text-[20px] text-white">{props.cta.title}</h3>
              <p className="text-[20px] text-white">{props.cta.content}</p>
              <a
                href={props.cta.href}
                className="text-[20px] text-black bg-white"
              >
                {props.cta.button}
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
