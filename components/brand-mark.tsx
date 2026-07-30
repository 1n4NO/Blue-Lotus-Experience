type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Blue Lotus Experience"
    >
      <rect width="256" height="256" rx="128" fill="#090909" />
      <circle cx="128" cy="128" r="98" stroke="#B9975B" strokeWidth="3" />
      <path
        d="M128 68C113 86 97 106 97 128C97 152 112 169 128 188C144 169 159 152 159 128C159 106 143 86 128 68Z"
        fill="#556B2F"
        fillOpacity="0.16"
        stroke="#F7F6F2"
        strokeOpacity="0.14"
      />
      <path
        d="M128 80C115 95 104 111 104 128C104 146 115 162 128 176C141 162 152 146 152 128C152 111 141 95 128 80Z"
        fill="#F7F6F2"
        fillOpacity="0.08"
      />
      <path
        d="M128 88C120 99 114 111 114 128C114 141 119 151 128 164C137 151 142 141 142 128C142 111 136 99 128 88Z"
        fill="#B9975B"
        fillOpacity="0.3"
      />
      <path
        d="M95 140C112 136 115 148 128 164C141 148 144 136 161 140"
        stroke="#F7F6F2"
        strokeOpacity="0.15"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M80 108C96 111 102 123 106 137"
        stroke="#F7F6F2"
        strokeOpacity="0.12"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M176 108C160 111 154 123 150 137"
        stroke="#F7F6F2"
        strokeOpacity="0.12"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
