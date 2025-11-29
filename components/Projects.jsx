export default function Projects() {
  const projects = [
    {
      title: "Flowventory – Inventory SaaS",
      desc: "Full SaaS: real-time stock tracking, barcodes, multi-location, rental.",
      link: "#",
    },
    {
      title: "Student AI Chatbot Backend",
      desc: "API-based chatbot for students with credits/ad-based system.",
      link: "#",
    },
    {
      title: "Employee Monitoring System",
      desc: "Activity tracking, productivity insights, logs.",
      link: "#",
    },
  ];

  return (
    <section className="py-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((p) => (
          <div
            key={p.title}
            className="glass p-6 rounded-xl hover:bg-white/20 transition neon-hover"
          >
            <h3 className="text-2xl font-semibold mb-2">{p.title}</h3>
            <p className="text-gray-300 mb-4">{p.desc}</p>
            <a className="text-purple-400" href={p.link}>
              View →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
