"use client";

// A deterministic decorative network. Coordinates carry no experimental data.
const nodes = [
  [82, 134],
  [230, 86],
  [355, 178],
  [195, 288],
  [420, 350],
  [72, 448],
  [270, 520],
  [438, 618],
  [135, 752],
  [325, 820],
  [536, 112],
  [678, 230],
  [580, 442],
  [742, 528],
  [600, 748],
  [814, 114],
  [952, 252],
  [858, 398],
  [1040, 510],
  [842, 690],
  [1020, 790],
  [1130, 118],
  [1288, 238],
  [1200, 378],
  [1348, 488],
  [1198, 628],
  [1332, 796],
  [1120, 862],
  [726, 866],
  [1368, 74],
] as const;

const links = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [0, 3],
  [3, 5],
  [5, 6],
  [6, 7],
  [6, 8],
  [8, 9],
  [2, 10],
  [10, 11],
  [4, 12],
  [11, 12],
  [12, 13],
  [7, 14],
  [13, 14],
  [10, 15],
  [15, 16],
  [11, 16],
  [16, 17],
  [17, 18],
  [13, 17],
  [14, 19],
  [18, 19],
  [19, 20],
  [15, 21],
  [21, 22],
  [16, 23],
  [22, 23],
  [23, 24],
  [18, 25],
  [24, 25],
  [25, 26],
  [20, 27],
  [25, 27],
  [14, 28],
  [22, 29],
] as const;

const activeNodes = new Set([2, 6, 11, 16, 18, 23, 25]);
const redNodes = new Set([9, 26]);

export function DigitalNetwork() {
  return (
    <svg
      className="digital-network"
      viewBox="0 0 1400 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      fill="none"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <style>{`@media(max-width:760px){.digital-network .digital-network-secondary{display:none}}`}</style>
      {links.map(([from, to], index) => {
        const [x1, y1] = nodes[from];
        const [x2, y2] = nodes[to];
        return (
          <path
            key={`${from}-${to}`}
            className={`digital-link${index % 3 === 0 ? " digital-network-secondary" : ""}`}
            d={`M${x1} ${y1}L${x2} ${y2}`}
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset="0"
            stroke={index % 4 === 0 ? "#00FF99" : "#0066FF"}
            strokeWidth={index % 4 === 0 ? 1 : 0.7}
            opacity={0.34}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
      {nodes.map(([cx, cy], index) => {
        const color = redNodes.has(index)
          ? "#FF3B30"
          : index % 3 === 0
            ? "#00FF99"
            : "#0066FF";
        const secondary =
          index % 3 === 0 && !activeNodes.has(index) && !redNodes.has(index);
        return (
          <g
            key={`${cx}-${cy}`}
            className={secondary ? "digital-network-secondary" : undefined}
          >
            {activeNodes.has(index) && (
              <circle
                className="digital-node-halo"
                cx={cx}
                cy={cy}
                r={10}
                fill={color}
                opacity={0.22}
              />
            )}
            <circle
              cx={cx}
              cy={cy}
              r={activeNodes.has(index) ? 3.4 : 2}
              fill={color}
              opacity={0.85}
            />
            {redNodes.has(index) && (
              <circle
                cx={cx}
                cy={cy}
                r={6}
                stroke={color}
                strokeWidth={0.6}
                opacity={0.4}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
