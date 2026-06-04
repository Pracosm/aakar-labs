import Image from "next/image";
import SectionLabel from "./ui/SectionLabel";

const members = [
  {
    photo: "/images/team/shardul.jpg",
    name: "Shardul Nandedkar",
    role: "FOUNDER",
    desc: "Vision, direction, and the relentless pursuit of clarity in every pixel.",
  },
  {
    photo: "/images/team/soumik.png",
    name: "Soumik Halder",
    role: "CO-FOUNDER",
    desc: "Operations, partnerships, and the engine behind every smooth delivery.",
  },
  {
    photo: "/images/team/revathi.jpg",
    name: "Revathi Santosh",
    role: "CHIEF DESIGN OFFICER",
    desc: "Systems thinking, interface craft, and the guardian of design standards.",
  },
  {
    photo: "/images/team/karun.jpg",
    name: "Karun Thapa",
    role: "CHIEF BRANDING OFFICER",
    desc: "Leads Kwirks, our in-house brother studio for branding — partnering with us on identity work end-to-end.",
  },
];

export default function Leadership() {
  return (
    <section className="flex w-full flex-col gap-12 border-t border-border-subtle bg-bg-page px-5 py-12 md:px-10 md:py-16 lg:px-16 lg:py-20">
      {/* Header */}
      <div className="flex w-full flex-col gap-8">
        <SectionLabel code="AKR-006" label="LEADERSHIP" />
        <h2 className="max-w-[600px] font-display text-2xl font-bold leading-[1.15] tracking-[-1px] text-text-primary md:text-3xl lg:text-[40px]">
          The people behind
          <br />
          the pixels.
        </h2>
      </div>

      {/* Team Grid */}
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {members.map((m) => (
          <div key={m.name} className="flex flex-col gap-4">
            <div className="relative h-[240px] w-full overflow-hidden rounded-lg md:h-[280px] lg:h-[340px]">
              <Image
                src={m.photo}
                alt={m.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-display text-xl font-bold tracking-[-0.5px] text-text-primary">
                {m.name}
              </span>
              <span className="font-mono text-[10px] font-medium tracking-[2px] text-accent">
                {m.role}
              </span>
              <p className="text-[13px] leading-[1.5] text-text-secondary">
                {m.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
