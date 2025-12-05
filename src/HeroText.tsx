export function HeroText({text}:{text:string}) {
    

    const words = text.split(' ');

    return (
        <h1 className="bio-text text-4xl leading-[1.1] font-normal tracking-tight text-balance lg:text-5xl">
            {words.map((word, wordIndex) => (
                <span
                    key={`word-${wordIndex}`}
                    className="inline-block">
                    {[...word].map((char, charIndex) => (
                        <span
                            key={`char-${wordIndex}-${charIndex}`}
                            style={{ '--index': wordIndex * 10 + charIndex } as React.CSSProperties}
                            className="inline-block">
                            {char}
                        </span>
                    ))}
                    {wordIndex < words.length - 1 && (
                        <span
                            className="inline-block"
                            style={{ '--index': wordIndex * 10 + word.length } as React.CSSProperties}>
                            &nbsp;
                        </span>
                    )}
                </span>
            ))}
        </h1>
    );
}