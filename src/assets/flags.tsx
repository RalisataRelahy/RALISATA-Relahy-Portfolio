export function FranceFlag() {
    return (
        <svg width="24" height="24" viewBox="0 0 3 2">
            <rect width="1" height="2" x="0" fill="#0055A4" />
            <rect width="1" height="2" x="1" fill="#FFFFFF" />
            <rect width="1" height="2" x="2" fill="#EF4135" />
        </svg>
    );
}

export function EnglandFlag() {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 900 600"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* fond blanc */}
            <rect width="900" height="600" fill="#ffffff" />

            {/* croix de Saint Georges */}
            {/* barre verticale */}
            <rect
                x="375"
                width="150"
                height="600"
                fill="#CE1124"
            />

            {/* barre horizontale */}
            <rect
                y="225"
                width="900"
                height="150"
                fill="#CE1124"
            />
        </svg>
    );
}