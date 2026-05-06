"use client";

export default function ApplyCard({ service }) {
  const handleApply = () => {
    const message = `Hi! I want to apply for *${service.title}* (₹${service.price.toLocaleString()}). Please guide me on next steps.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/917904203916?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const discount = Math.round(((service.original - service.price) / service.original) * 100);

  return (
    <div className={`bg-gray-900 border ${service.border} rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 flex flex-col`}>
      <div className="p-6 flex-1">
        <div className="flex items-start justify-between mb-5">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl shadow-lg`}>
            {service.icon}
          </div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${service.badgeColor}`}>
            {service.badge}
          </span>
        </div>
        <h3 className="text-lg font-black text-white mb-1">{service.title}</h3>
        <p className="text-gray-500 text-sm mb-5">{service.subtitle}</p>
        <div className="flex items-end gap-2 mb-1">
          <span className="text-3xl font-black text-white">₹{service.price.toLocaleString()}</span>
          <span className="text-gray-600 line-through text-sm mb-1">₹{service.original.toLocaleString()}</span>
        </div>
        <div className="mb-5">
          <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-0.5 rounded-full">{discount}% OFF</span>
        </div>
        <ul className="space-y-2">
          {service.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
              <span className="text-cyan-400 font-bold flex-shrink-0 mt-0.5">✓</span>
              {f}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-5 pt-0">
        <button
          onClick={handleApply}
          className={`w-full py-3.5 rounded-xl font-black text-sm transition-all duration-300 bg-gradient-to-r ${service.color} text-white hover:opacity-90 hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2`}
        >
          💬 Apply Now →
        </button>
        <p className="text-center text-xs text-gray-600 mt-2">Opens WhatsApp — We reply within 2 hours</p>
      </div>
    </div>
  );
}
