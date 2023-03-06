import React from "react";

type Props = {
  text: string;
  arc?: number;
  radius?: number;
};

const Record = ({ text, arc = 200, radius = 192 }: Props) => {
  const characters = text.split("");
  const degree = arc / characters.length;
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96">
      <div className="relative rounded-full bg-[#171717] w-full h-full animate-spin-slow">
        {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-4 h-4 text-[#34ebcc] z-50"></div> */}
        <h1 className="text-white text-lg font-bold">
          {characters.map((char, i) => (
            <span
              className="absolute left-1/2 -translate-x-1/2 "
              key={`heading-span-${i}`}
              style={{
                height: `${radius}px`,
                transform: `rotate(${degree * i - arc / 2}deg)`,
                transformOrigin: `0 ${radius}px 0`,
              }}
            >
              {char}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};

export default Record;
