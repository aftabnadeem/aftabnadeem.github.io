const projects = [
  {
    title: "Flowventory – Inventory SaaS",
    desc: "Real-time stock tracking, barcodes, financial analytics.",
  },
  {
    title: "Student AI Chatbot Backend",
    desc: "Chatbot with image input, credit system, multi-subject support.",
  },
  {
    title: "Employee Monitoring System",
    desc: "Activity logs, productivity tracking, screenshots.",
  },
];

export default function Projects() {
  return (
    <section className="min-h-screen px-6 max-w-6xl mx-auto py-20">
      <h1 className="text-5xl font-bold text-[#6C63FF] mb-12 text-center">
        Projects
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((p) => (
          <div
            key={p.title}
            className="bg-white/10 p-6 rounded-xl hover:bg-white/20 border border-white/10 transition"
          >
            <h2 className="text-2xl font-semibold mb-2">{p.title}</h2>
            <p className="text-gray-300 mb-4">{p.desc}</p>
            <button className="text-[#00E5FF] hover:underline">View More →</button>
          </div>
        ))}
      </div>
    </section>
  );
}
