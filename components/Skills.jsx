export default function Skills() {
  const skills = [
    "Next.js", "React", "Django", "DRF", "Node.js",
    "PostgreSQL", "MongoDB", "MySQL", "React Native",
  ];

  return (
    <section className="py-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">
        Skills & Tech Stack
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {skills.map((skill) => (
          <div
            key={skill}
            className="glass p-6 rounded-xl text-center text-lg text-white neon-hover"
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}
