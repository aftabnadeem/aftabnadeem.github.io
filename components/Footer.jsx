export default function Footer() {
  return (
    <footer className="glass mt-20 py-8 text-center">
      <h3 className="text-xl font-semibold text-[#6C63FF]">
        Aftab Nadeem
      </h3>
      <p className="text-gray-400 mt-2">Full Stack Developer • Bengaluru</p>
      <p className="text-gray-500 text-sm mt-4">
        © {new Date().getFullYear()} Aftab.dev — All Rights Reserved.
      </p>
    </footer>
  );
}
