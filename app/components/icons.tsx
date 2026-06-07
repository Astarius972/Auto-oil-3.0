import LogoImg from "@/public/auto-2-logo.png";

export function AutoOilLogo({
  className = "h-13 w-auto  flex items-center justify-center",
}: {
  className?: string;
}) {
  return <img src={LogoImg.src} alt="Auto Oil" className={className} />;
}
