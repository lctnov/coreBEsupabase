import CastLogoMotion  from "@/components/CastLogoMotion";

export default function HomePage() {

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-300 overflow-hidden px-4">

        {/* Logo */}
        <div className="flex flex-col items-center justify-center min-h-screen">
          <CastLogoMotion />
        </div>

    </div>
  );
}
