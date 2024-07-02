import SocialMediaLinks from "./SocialMediaLinks";

export default function Navbar() {
  return (
    <nav className="p-2 bg-white rounded shadow-md">
      <div className="flex justify-between items-center">
        <img
          src="/image/tcod-logo-white.jpg"
          alt="Logo"
          className="h-16 rounded-full object-contain"
        />
        <SocialMediaLinks />
        <h4 className="text-2xl text-sky-500 font-semibold">TCOD</h4>
      </div>
    </nav>
  );
}
