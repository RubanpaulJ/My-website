export default function JobCard({ title, company, location, skills, type, salary }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border border-gray-100 flex flex-col gap-3">
      
      {/* Company & Job Type */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
          {type}
        </span>
        <span className="text-xs text-gray-400">{location}</span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>

      {/* Company */}
      <p className="text-sm text-gray-500 font-medium">{company}</p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
            {skill}
          </span>
        ))}
      </div>

      {/* Salary & Apply */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm font-semibold text-green-600">{salary}</span>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition font-medium">
          Apply Now
        </button>
      </div>

    </div>
  );
}