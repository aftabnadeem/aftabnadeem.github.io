const skills = [
  "Next.js", "React", "Django", "DRF", "Node.js",
  "PostgreSQL", "MongoDB", "MySQL", "React Native",
  "Expo", "Git", "Docker"
];

export default function Skills() {
  return (
    <section className="min-h-screen px-6 max-w-4xl mx-auto py-20">
      <h1 className="text-5xl font-bold text-[#6C63FF] mb-10 text-center">
        My Tech Stack
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {skills.map((skill) => (
          <div
            key={skill}
            className="bg-white/10 p-6 rounded-xl text-center text-lg text-white
                       border border-white/10 hover:border-[#6C63FF] transition"
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}
