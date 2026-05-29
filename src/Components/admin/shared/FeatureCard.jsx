export const FeatureCard = ({ emoji, title, points, accentColor }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
    <div className="flex items-center gap-3 mb-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${accentColor}`}>{emoji}</div>
      <h4 className="font-bold text-gray-800 text-sm leading-tight">{title}</h4>
    </div>
    <ul className="space-y-2">
      {points.map((pt, i) => (
        <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
          <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></span>
          <span>{pt}</span>
        </li>
      ))}
    </ul>
  </div>
);