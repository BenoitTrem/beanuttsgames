import TVStatic from "./Tvstatic";

export default function SiteBackground() {
  return (
    <div className="siteBg">
      <div className="bgScanlines" />
      <TVStatic grainOpacity={0.18} fps={20} />
      <div className="bgScanBar" />
      <div className="bgFlicker" />
      {Array.from({ length: 10 }).map((_, i) => (
        <span key={i} className="bgEmber" />
      ))}
    </div>
  );
}
