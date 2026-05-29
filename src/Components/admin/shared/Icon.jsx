export const Icon = ({ d, size = 18, stroke = 'currentColor', fill = 'none' }) => (
  <svg width={size} height={size} fill={fill} stroke={stroke} strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);