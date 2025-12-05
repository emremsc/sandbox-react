export default function ParallaxCard() {
    return (
        <div className="relative w-xs aspect-3/4 h-auto rounded-4xl overflow-hidden">
            <div className="absolute inset-0 bg-black/80 rounded-2xl overflow-hidden">
                <video autoPlay muted loop src={'/IMG_7474.MOV'} className="object-cover w-full h-auto" />
            </div>
            <div className="absolute inset-6 bg-black/40 rounded-2xl overflow-hidden">
                <video autoPlay muted loop src={'/IMG_7474.MOV'} className="object-cover w-full h-auto" />
            </div>
            <div className="absolute inset-12 bg-black/20 rounded-2xl overflow-hidden">
                <video autoPlay muted loop src={'/IMG_7474.MOV'} className="object-cover w-full h-auto" />
            </div>
        </div>
    )
}
