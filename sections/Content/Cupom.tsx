interface Props {
    title?: string;
    description?: string;
    cupom?: string;
}

export default function Cupom({
    title = "Exclusive Offer",
    description = "Limited time offer! Get 10% off your next purchase.",
    cupom = "JACKET10",

}: Props,
) {
    return (
        <>
            <div class="w-full bg-black flex">
                <div class="container justify-end max-w-[300px] w-full p-4">
                    <h3 class="text-white">{title}</h3>
                    <p class="text-gray-600">{description}</p>
                    <div
                        id="myInput"
                        class="bg-black text-gray-100 mt-2 p-2 border border-gray-500 cursor-pointer"
                    >
                        {cupom}
                    </div>
                </div>
            </div>
        </>
    );
}


